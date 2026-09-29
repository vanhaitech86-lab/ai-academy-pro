// app/api/admin/bot-config/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { BotBrainConfig, DEFAULT_BOT_CONFIG } from '@/lib/bot-brain';

// In-memory runtime storage for serverless execution
let serverBotConfig: BotBrainConfig = { ...DEFAULT_BOT_CONFIG };

export async function GET() {
  return NextResponse.json({
    success: true,
    config: serverBotConfig
  });
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    serverBotConfig = {
      ...serverBotConfig,
      ...data,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: 'Cập nhật cấu hình bộ não Bot AI thành công!',
      config: serverBotConfig
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Lỗi lưu cấu hình' },
      { status: 500 }
    );
  }
}

export function getServerBotConfig(): BotBrainConfig {
  return serverBotConfig;
}
