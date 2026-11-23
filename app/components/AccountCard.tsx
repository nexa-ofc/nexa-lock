"use client";

export default function AccountCard() {
  return (
    <div className="neobrutal p-4 space-y-4">
      {/* Header akun */}
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 border-2 border-black flex items-center justify-center text-black font-black text-xl shadow-neo">
          N
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-base truncate">Hey There</div>
          <div className="text-sm text-zinc-400 truncate">icatishere@g...</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold">28°C</div>
          <div className="text-[10px] text-zinc-500">PT</div>
        </div>
      </div>

      {/* 4 kartu kecil */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-black/50 border border-zinc-700 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] text-zinc-400 font-medium">DATA BATASAN</span>
          </div>
          <div className="font-bold text-lg">455</div>
          <div className="text-[11px] text-zinc-500">Sisa Nomor</div>
        </div>

        <div className="bg-black/50 border border-zinc-700 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span className="text-[10px] text-zinc-400 font-medium">JARINGAN</span>
          </div>
          <div className="font-bold text-lg">WiFi</div>
          <div className="text-[11px] text-zinc-500">Status: Online</div>
        </div>

        <div className="bg-black/50 border border-zinc-700 rounded-xl p-3">
          <div className="text-[10px] text-zinc-400 font-medium mb-1">ULANG JARING</div>
          <div className="font-bold text-lg">10</div>
        </div>

        <div className="bg-black/50 border border-zinc-700 rounded-xl p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-zinc-400 font-medium">Permanent</span>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="font-bold text-lg">1</div>
          <div className="text-[11px] text-emerald-400">Aktif</div>
        </div>
      </div>
    </div>
  );
}
