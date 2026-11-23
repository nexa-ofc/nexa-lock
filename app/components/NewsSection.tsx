"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Article = {
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  source: { name: string };
  publishedAt: string;
};

export default function NewsSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function loadNews() {
      try {
        // Menggunakan GNews free (tanpa key untuk demo) + fallback
        // Untuk production ganti dengan API key gratis dari gnews.io
        const res = await fetch(
          `https://gnews.io/api/v4/top-headlines?category=technology&lang=id&max=10&apikey=demo`
        ).catch(() => null);

        if (res && res.ok) {
          const data = await res.json();
          setArticles(data.articles || []);
        } else {
          // Fallback data biar tetap ada isi
          setArticles([
            {
              title: "Teknologi AI Terbaru 2026",
              description: "Perkembangan kecerdasan buatan semakin pesat di tahun ini.",
              url: "#",
              urlToImage: null,
              source: { name: "Tech ID" },
              publishedAt: new Date().toISOString(),
            },
            {
              title: "Update Keamanan Digital",
              description: "Pentingnya menjaga privasi di era digital.",
              url: "#",
              urlToImage: null,
              source: { name: "Cyber News" },
              publishedAt: new Date().toISOString(),
            },
            {
              title: "Smartphone Flagship Baru",
              description: "Perangkat terbaru dengan fitur canggih dirilis.",
              url: "#",
              urlToImage: null,
              source: { name: "Gadget" },
              publishedAt: new Date().toISOString(),
            },
          ]);
        }
      } catch {
        setArticles([]);
      } finally {
        setLoading(false);
      }
    }
    loadNews();
  }, []);

  const filtered = query
    ? articles.filter((a) =>
        a.title.toLowerCase().includes(query.toLowerCase())
      )
    : articles;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black">Berita</h2>
      </div>

      {/* Search horizontal */}
      <div className="overflow-x-auto pb-2 -mx-1 px-1">
        <div className="flex gap-2 min-w-max">
          <input
            type="text"
            placeholder="Cari berita..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-black border-2 border-zinc-700 rounded-full px-4 py-2 text-sm w-48 focus:border-nexa-neon outline-none"
          />
          {["Teknologi", "Indonesia", "Dunia", "Gadget"].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-4 py-2 rounded-full border-2 border-zinc-700 text-sm font-medium whitespace-nowrap active:bg-nexa-neon active:text-black"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* List vertikal */}
      <div className="space-y-3">
        {loading && (
          <div className="text-center text-zinc-500 py-8">Memuat berita...</div>
        )}
        {!loading && filtered.length === 0 && (
          <div className="text-center text-zinc-500 py-8">Tidak ada berita</div>
        )}
        {filtered.map((item, i) => (
          <motion.a
            key={i}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="neobrutal p-3 flex gap-3 active:scale-[0.98] transition-transform"
          >
            <div className="w-20 h-20 rounded-lg bg-zinc-800 flex-shrink-0 overflow-hidden border border-zinc-700">
              {item.urlToImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.urlToImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">
                  No Img
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm line-clamp-2 leading-snug">
                {item.title}
              </div>
              <div className="text-xs text-zinc-400 mt-1 line-clamp-2">
                {item.description}
              </div>
              <div className="text-[10px] text-zinc-500 mt-1">
                {item.source.name} ·{" "}
                {new Date(item.publishedAt).toLocaleDateString("id-ID")}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
