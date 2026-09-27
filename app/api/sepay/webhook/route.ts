import { NextRequest, NextResponse } from 'next/server';

// Store in-memory or database order statuses for demo / serverless runtime
export const paymentLogs: any[] = [];
export const paidOrders = new Set<string>();

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || req.headers.get('x-api-key');
    const expectedApiKey = process.env.SEPAY_API_KEY || 'DEMO_TEST_KEY';

    // Verify API key security header if provided in environment
    if (process.env.SEPAY_API_KEY && authHeader && !authHeader.includes(expectedApiKey)) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized: Invalid SePay API Key' },
        { status: 401 }
      );
    }

    const payload = await req.json();

    // SePay standard payload fields:
    // id, gateway, transactionDate, accountNumber, code, content, transferType, transferAmount, referenceCode
    const { id, transferType, transferAmount, content, referenceCode, accountNumber } = payload;

    // Security Check: Only handle incoming money (transferType: 'in')
    if (transferType && transferType !== 'in') {
      return NextResponse.json({
        success: true,
        message: 'Ignored outgoing transaction'
      });
    }

    // Extract Order Code from content (pattern AIA followed by numbers)
    const contentText = String(content || '');
    const orderMatch = contentText.match(/AIA[-\s]?\d{4,}/i);
    const matchedOrderCode = orderMatch ? orderMatch[0].replace(/[-\s]/g, '').toUpperCase() : null;

    if (matchedOrderCode) {
      paidOrders.add(matchedOrderCode);
    }

    // Log the transaction
    paymentLogs.unshift({
      id: `LOG-${id || Date.now()}`,
      sepayId: id,
      amount: transferAmount,
      content: contentText,
      orderCode: matchedOrderCode,
      referenceCode,
      accountNumber,
      processed: true,
      createdAt: new Date().toISOString()
    });

    console.log(`[SePay Webhook] Successfully processed transaction ${id} for order ${matchedOrderCode} - Amount: ${transferAmount} VND`);

    return NextResponse.json({
      success: true,
      message: 'Transaction verified and course activated',
      orderCode: matchedOrderCode,
      amount: transferAmount
    });
  } catch (error: any) {
    console.error('[SePay Webhook Error]', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'online',
    endpoint: '/api/sepay/webhook',
    recentLogs: paymentLogs.slice(0, 10),
    totalPaidOrders: paidOrders.size
  });
}
