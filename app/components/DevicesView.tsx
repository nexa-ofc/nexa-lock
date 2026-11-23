"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const mockDevices: Device[] = [
  {
    id: "dev-001",
    name: "Samsung Galaxy",
    model: "SM-A525F",
    online: true,
    lastSeen: "Baru saja",
    battery: 78,
    ip: "192.168.1.42",
  },
  {
    id: "dev-002",
    name: "Xiaomi Redmi",
    model: "2201116SG",
    online: false,
    lastSeen: "12 menit lalu",
    battery: 34,
    ip: "192.168.1.55",
  },
];

export default function DevicesView() {
  const [selected, setSelected] = useState<Device | null>(null);

  if (selected) {
    return (
      <ControlPanel device={selected} onBack={() => setSelected(null)} />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black">Devices</h2>
        <span className="text-xs text-zinc-400">
          {mockDevices.filter((d) => d.online).length} online
        </span>
      </div>

      <div className="space-y-3">
        {mockDevices.map((device, i) => (
          <motion.button
            key={device.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
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
                <div className="text-[10px] text-zinc-500">{device.lastSeen}</div>
              </div>
            </div>
            <div className="mt-2 text-[11px] text-zinc-500">IP: {device.ip}</div>
          </motion.button>
        ))}
      </div>

      {mockDevices.length === 0 && (
        <div className="text-center text-zinc-500 py-16">
          Belum ada device terhubung
        </div>
      )}
    </div>
  );
}
