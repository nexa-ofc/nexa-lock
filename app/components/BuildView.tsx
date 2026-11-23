"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function BuildView() {
  const [appName, setAppName] = useState("NexaClient");
  const [packageName, setPackageName] = useState("com.nexa.client");
  const [webviewUrl, setWebviewUrl] = useState("https://example.com");
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [building, setBuilding] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleIcon(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setIconPreview(url);
    }
  }

  async function startBuild() {
    if (building) return;
    setBuilding(true);
    setDone(false);
    setLogs([]);

    const steps = [
      "→ Initializing build environment...",
      "→ Cloning Android template...",
      "→ Setting applicationId: " + packageName,
      "→ Setting app name: " + appName,
      "→ Injecting WebView URL...",
      "→ Processing icon...",
      "→ Running Gradle assembleRelease...",
      "→ Signing APK...",
      "→ Build successful!",
      "→ APK ready for download",
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((r) => setTimeout(r, 700 + Math.random() * 400));
      setLogs((prev) => [...prev, steps[i]]);
    }

    setBuilding(false);
    setDone(true);
  }

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-black">Build APK</h2>

      <div className="space-y-4">
        {/* App Name */}
        <div>
          <label className="text-xs font-bold text-zinc-400 mb-1 block">
            Nama APK
          </label>
          <input
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            className="w-full bg-black border-2 border-zinc-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-nexa-neon"
          />
        </div>

        {/* Package */}
        <div>
          <label className="text-xs font-bold text-zinc-400 mb-1 block">
            Package Name
          </label>
          <input
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            className="w-full bg-black border-2 border-zinc-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-nexa-neon"
          />
        </div>

        {/* Icon */}
        <div>
          <label className="text-xs font-bold text-zinc-400 mb-1 block">
            Icon APK
          </label>
          <div
            onClick={() => fileRef.current?.click()}
            className="neobrutal p-4 flex items-center gap-4 cursor-pointer active:scale-[0.98] transition-transform"
          >
            {iconPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={iconPreview}
                alt="icon"
                className="w-14 h-14 rounded-xl border-2 border-black object-cover"
              />
            ) : (
              <div className="w-14 h-14 rounded-xl border-2 border-dashed border-zinc-600 flex items-center justify-center text-zinc-500 text-xs">
                Icon
              </div>
            )}
            <div className="text-sm text-zinc-400">
              Ketuk untuk upload foto icon
            </div>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleIcon}
          />
        </div>

        {/* WebView URL */}
        <div>
          <label className="text-xs font-bold text-zinc-400 mb-1 block">
            URL WebView (tampilan di dalam APK)
          </label>
          <input
            value={webviewUrl}
            onChange={(e) => setWebviewUrl(e.target.value)}
            className="w-full bg-black border-2 border-zinc-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-nexa-neon"
          />
        </div>

        {/* Build button */}
        <button
          onClick={startBuild}
          disabled={building}
          className="w-full py-4 rounded-xl bg-nexa-neon text-black font-black text-base border-2 border-black shadow-neo active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-60"
        >
          {building ? "Building..." : "Build APK"}
        </button>

        {/* Terminal */}
        {(logs.length > 0 || building) && (
          <div className="neobrutal bg-black p-4 font-mono text-xs text-nexa-neon max-h-60 overflow-y-auto">
            {logs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {log}
              </motion.div>
            ))}
            {building && <div className="animate-pulse">_</div>}
          </div>
        )}

        {/* Download / Share */}
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3"
          >
            <button className="flex-1 py-3 rounded-xl bg-nexa-neon text-black font-bold border-2 border-black shadow-neo">
              Download APK
            </button>
            <button className="flex-1 py-3 rounded-xl bg-nexa-pink text-white font-bold border-2 border-black shadow-neo-pink">
              Share
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
