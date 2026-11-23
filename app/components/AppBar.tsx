"use client";
import { motion } from "framer-motion";
import MenuIcon from "./icons/MenuIcon";
import VirusIcon from "./icons/VirusIcon";

const colors = ["#00ff9d", "#ff2d95", "#00e5ff", "#ffee00", "#ff6b00"];

export default function AppBar({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-nexa-bg/95 backdrop-blur-md border-b-2 border-black">
      <button
        onClick={onMenu}
        className="p-2.5 rounded-neo border-2 border-black bg-nexa-card shadow-neo active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
      >
        <MenuIcon />
      </button>

      <motion.h1
        className="text-xl font-black tracking-wider"
        animate={{ color: colors }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        NEXA LOCK
      </motion.h1>

      <div className="p-2.5 rounded-neo border-2 border-black bg-nexa-card text-nexa-neon shadow-neo">
        <VirusIcon />
      </div>
    </header>
  );
}
