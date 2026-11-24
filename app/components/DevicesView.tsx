"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ControlPanel from "./ControlPanel";

type Device = {
  id: string;
  name: string;
  model: string;
  online: boolean;
  lastSeen: string;
  battery: number;
  ip: string;
};

export default function DevicesView() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selected, setSelected] = useState<Device | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadDevices() {
    try {
      const res = await fetch("/api/devices");
      const data = await res.json();
      setDevices(data.devices || []);
    } catch {
      setDevices([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDevices();
    const interval = setInterval(loadDevices, 8000);
    return () => clearInterval(interval);
  }, []);

  if (selected) {
    return <ControlPanel device={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black">Devices</h2>
        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-400">
            {devices.filter((d) => d.online).length} online
          </span>
          <button onClick={loadDevices} className="text-xs text-nexa-neon font-bold">
            Refresh
          </button>
        </div>
      </div>

      {loading && <div className="text-center text-zinc-500 py-12">Memuat devices...</div>}

      {!loading && devices.length === 0 && (
        <div className="text-center text-zinc-500 py-16 space-y-2">
          <div className="text-4xl">📱</div>
          <div>Belum ada device terhubung</div>
          <div className="text-xs">
            Build APK lalu install di HP target.
            <br />
            Device akan muncul otomatis di sini.
          </div>
        </div>
      )}

      <div className="space-y-3">
        {devices.map((device, i) => (
          <motion.button
            key={device.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelected(device)}
            className="w-full neobrutal p-4 text-left active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  device.online ? "bg-nexa-neon animate-pulse" : "bg-zinc-600"
                }`}
              />
              <div className="flex-1 min-w-0">
                <div className="font-bold truncate">{device.name}</div>
                <div className="text-xs text-zinc-400">{device.model}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold">{device.battery}%</div>
                <div className="text-[10px] text-zinc-500">
                  {device.online ? "Online" : device.lastSeen}
                </div>
              </div>
            </div>
            <div className="mt-2 text-[11px] text-zinc-500">IP: {device.ip}</div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
