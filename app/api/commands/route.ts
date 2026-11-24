import { NextRequest, NextResponse } from "next/server";

const globalStore = globalThis as any;
if (!globalStore.__nexa_devices) {
  globalStore.__nexa_devices = new Map();
}
if (!globalStore.__nexa_commands) {
  globalStore.__nexa_commands = new Map();
}

const commands: Map<string, any[]> = globalStore.__nexa_commands;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { deviceId, type, payload } = body;

    if (!deviceId || !type) {
      return NextResponse.json({ error: "deviceId and type required" }, { status: 400 });
    }

    const list = commands.get(deviceId) || [];
    list.push({
      id: Date.now().toString(),
      type,
      payload: payload || {},
      createdAt: Date.now(),
    });
    commands.set(deviceId, list);

    return NextResponse.json({ ok: true, queued: list.length });
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const deviceId = req.nextUrl.searchParams.get("deviceId");
  if (!deviceId) {
    return NextResponse.json({ error: "deviceId required" }, { status: 400 });
  }
  const list = commands.get(deviceId) || [];
  return NextResponse.json({ commands: list });
}
