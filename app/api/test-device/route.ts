import { NextRequest, NextResponse } from "next/server";

// Endpoint untuk simulasi device (testing dari browser)
const globalStore = globalThis as any;
if (!globalStore.__nexa_devices) globalStore.__nexa_devices = new Map();
if (!globalStore.__nexa_commands) globalStore.__nexa_commands = new Map();

const devices: Map<string, any> = globalStore.__nexa_devices;
const commands: Map<string, any[]> = globalStore.__nexa_commands;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const deviceId = body.deviceId || "test-device-001";

  const updated = {
    id: deviceId,
    name: body.name || "Test Device (Browser)",
    model: body.model || "Simulator",
    battery: body.battery ?? 85,
    ip: body.ip || "127.0.0.1",
    lastSeenAt: Date.now(),
    lastSeen: "Baru saja",
  };
  devices.set(deviceId, updated);

  const pending = commands.get(deviceId) || [];
  commands.set(deviceId, []);

  return NextResponse.json({ ok: true, device: updated, commands: pending });
}
