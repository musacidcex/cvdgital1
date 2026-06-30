"use client";

const links = [
  { id: "profile", label: "الملف الشخصي" },
  { id: "stats", label: "الإنجازات" },
  { id: "qualifications", label: "المؤهلات" },
  { id: "experience", label: "الخبرات" },
  { id: "skills", label: "المهارات" },
  { id: "projects", label: "المشاريع" },
  { id: "library", label: "المكتبة" },
  { id: "cv", label: "السيرة الذاتية" }
];

export default function NavBar({ name }: { name: string }) {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-ink/95 backdrop-blur text-paper border-b border-gold/20 no-print">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between gap-4 overflow-x-auto">
        <span className="font-display text-sm md:text-base text-gold whitespace-nowrap">{name}</span>
        <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm whitespace-nowrap">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="px-2 md:px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
