import { NextRequest, NextResponse } from 'next/server';
import { paidOrders } from '../sepay/webhook/route';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Order code is required' }, { status: 400 });
  }

  const cleanCode = code.replace(/[-\s]/g, '').toUpperCase();
  const isPaid = paidOrders.has(cleanCode);

  return NextResponse.json({
    code: cleanCode,
    status: isPaid ? 'paid' : 'pending',
    updatedAt: new Date().toISOString()
  });
}
