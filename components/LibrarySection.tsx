"use client";
import { useState } from "react";

export default function LibrarySection({ items }: { items: any[] }) {
  const [query, setQuery] = useState("");
  const filtered = items.filter((i) =>
    `${i.title} ${i.description || ""}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section id="library" className="py-16 px-4 md:px-6 max-w-6xl mx-auto scroll-mt-16">
      <p className="section-subtitle">المعرفة الموثقة</p>
      <h2 className="section-title">المكتبة الشخصية</h2>
      <div className="gold-line mb-6" />

      <input
        type="text"
        placeholder="ابحث في المكتبة..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full md:w-80 mb-8 px-4 py-2.5 rounded-xl border border-ink/10 text-sm focus:outline-none focus:border-gold"
      />

      {filtered.length === 0 ? (
        <p className="text-sm text-ink/40 py-6 text-center border border-dashed border-ink/10 rounded-xl">
          لا توجد عناصر مطابقة
        </p>
      ) : (
        <div className="grid md:grid-cols-4 gap-4">
          {filtered.map((item: any) => (
            <a
              key={item.id}
              href={item.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="card overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-28 bg-ink/5 flex items-center justify-center text-ink/20 text-xs">
                {item.cover_image_url ? (
                  <img src={item.cover_image_url} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  "ملف"
                )}
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold line-clamp-2">{item.title}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
