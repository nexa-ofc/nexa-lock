"use client";
import { motion } from "framer-motion";
import HomeIcon from "./icons/HomeIcon";
import DeviceIcon from "./icons/DeviceIcon";
import BuildIcon from "./icons/BuildIcon";

const tabs = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "devices", label: "Devices", icon: DeviceIcon },
  { id: "build", label: "Build", icon: BuildIcon },
];

export default function BottomNav({
  active,
  setActive,
}: {
  active: string;
  setActive: (id: string) => void;
}) {
  return (
    <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md">
      <div className="flex items-center justify-between p-1.5 bg-black border-2 border-white rounded-full shadow-neo-hard">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className="relative flex-1 py-2.5 rounded-full"
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-nexa-neon rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}
              <span
                className={`relative z-10 flex flex-col items-center gap-0.5 font-bold text-[11px] ${
                  isActive ? "text-black" : "text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
