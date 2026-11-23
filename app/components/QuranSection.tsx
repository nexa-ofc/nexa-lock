"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Surat = {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
};

type Ayat = {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
};

export default function QuranSection() {
  const [suratList, setSuratList] = useState<Surat[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [ayat, setAyat] = useState<Ayat[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingAyat, setLoadingAyat] = useState(false);

  useEffect(() => {
    fetch("https://equran.id/api/v2/surat")
      .then((r) => r.json())
      .then((data) => {
        setSuratList(data.data || []);
      })
      .catch(() => setSuratList([]))
      .finally(() => setLoading(false));
  }, []);

  async function loadAyat(nomor: number) {
    setSelected(nomor);
    setLoadingAyat(true);
    try {
      const res = await fetch(`https://equran.id/api/v2/surat/${nomor}`);
      const data = await res.json();
      setAyat(data.data?.ayat || []);
    } catch {
      setAyat([]);
    } finally {
      setLoadingAyat(false);
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-black">Al-Qur&apos;an</h2>

      {loading && (
        <div className="text-center text-zinc-500 py-6">Memuat daftar surat...</div>
      )}

      {!selected && !loading && (
        <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto pr-1">
          {suratList.map((s) => (
            <button
              key={s.nomor}
              onClick={() => loadAyat(s.nomor)}
              className="neobrutal p-3 flex items-center gap-3 text-left active:scale-[0.98] transition-transform"
            >
              <div className="w-10 h-10 rounded-lg bg-nexa-neon/20 border border-nexa-neon flex items-center justify-center font-bold text-nexa-neon text-sm">
                {s.nomor}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm">{s.namaLatin}</div>
                <div className="text-xs text-zinc-400">
                  {s.arti} · {s.jumlahAyat} ayat
                </div>
              </div>
              <div className="text-lg font-arabic text-zinc-300">{s.nama}</div>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div className="space-y-3">
          <button
            onClick={() => {
              setSelected(null);
              setAyat([]);
            }}
            className="text-sm text-nexa-neon font-bold"
          >
            ← Kembali ke daftar surat
          </button>

          {loadingAyat && (
            <div className="text-center text-zinc-500 py-8">Memuat ayat...</div>
          )}

          {!loadingAyat &&
            ayat.map((a) => (
              <motion.div
                key={a.nomorAyat}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="neobrutal p-4 space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-nexa-neon">
                    Ayat {a.nomorAyat}
                  </span>
                </div>
                <div className="text-right text-xl leading-loose font-arabic">
                  {a.teksArab}
                </div>
                <div className="text-sm text-zinc-400 italic">{a.teksLatin}</div>
                <div className="text-sm">{a.teksIndonesia}</div>
              </motion.div>
            ))}
        </div>
      )}
    </div>
  );
}
