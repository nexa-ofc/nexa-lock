"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AppBar from "./components/AppBar";
import BottomNav from "./components/BottomNav";
import HeroVideo from "./components/HeroVideo";
import AccountCard from "./components/AccountCard";
import NewsSection from "./components/NewsSection";
import QuranSection from "./components/QuranSection";
import DevicesView from "./components/DevicesView";
import BuildView from "./components/BuildView";

export default function Home() {
  const [active, setActive] = useState("home");
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="min-h-screen bg-nexa-bg pb-28">
      <AppBar onMenu={() => setShowSettings(true)} />

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.22 }}
          className="px-4 pt-4"
        >
          {active === "home" && (
            <div className="space-y-6">
              <HeroVideo />
              <AccountCard />
              <NewsSection />
              <QuranSection />
            </div>
          )}

          {active === "devices" && <DevicesView />}

          {active === "build" && <BuildView />}
        </motion.div>
      </AnimatePresence>

      <BottomNav active={active} setActive={setActive} />

      {/* Simple Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full max-w-md neobrutal p-5 m-4 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-black text-lg">Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-zinc-400 font-bold"
              >
                Tutup
              </button>
            </div>
            <div className="text-sm text-zinc-400 space-y-2">
              <p>NEXA LOCK v1.0</p>
              <p>Dashboard siap digunakan.</p>
              <p>Untuk build APK nyata nanti dihubungkan ke GitHub Actions.</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
