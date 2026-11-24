import { NextRequest, NextResponse } from "next/server";

// Temporary in-memory store (akan diganti Supabase)
// Untuk demo real-time tanpa setup dulu
const globalStore = globalThis as any;
if (!globalStore.__nexa_devices) {
  globalStore.__nexa_devices = new Map();
}
if (!globalStore.__nexa_commands) {
  globalStore.__nexa_commands = new Map();
}

const devices: Map<string, any> = globalStore.__nexa_devices;
const commands: Map<string, any[]> = globalStore.__nexa_commands;

export async function GET() {
  const list = Array.from(devices.values()).map((d) => ({
    ...d,
    online: Date.now() - (d.lastSeenAt || 0) < 45000, // 45 detik
  }));
  return NextResponse.json({ devices: list });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { deviceId, name, model, battery, ip } = body;

    if (!deviceId) {
      return NextResponse.json({ error: "deviceId required" }, { status: 400 });
    }

    const existing = devices.get(deviceId) || {};
    const updated = {
      id: deviceId,
      name: name || existing.name || "Unknown Device",
      model: model || existing.model || "Android",
      battery: battery ?? existing.battery ?? 0,
      ip: ip || existing.ip || "-",
      lastSeenAt: Date.now(),
      lastSeen: "Baru saja",
    };

    devices.set(deviceId, updated);

    // Ambil perintah yang belum dijalankan
    const pending = commands.get(deviceId) || [];
    commands.set(deviceId, []); // clear setelah diambil

    return NextResponse.json({
      ok: true,
      device: updated,
      commands: pending,
    });
  } catch (e) {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
}
