export default function ProjectsSection({ projects }: { projects: any[] }) {
  return (
    <section id="projects" className="py-16 px-4 md:px-6 max-w-6xl mx-auto scroll-mt-16">
      <p className="section-subtitle">معرض الأعمال</p>
      <h2 className="section-title">المشاريع والأعمال</h2>
      <div className="gold-line mb-10" />

      {projects.length === 0 ? (
        <p className="text-sm text-ink/40 py-6 text-center border border-dashed border-ink/10 rounded-xl">
          لم تتم إضافة مشاريع بعد
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-5">
          {projects.map((p: any) => (
            <div key={p.id} className="card overflow-hidden">
              <div className="h-36 bg-ink/5 flex items-center justify-center text-ink/20 text-xs">
                {p.images?.[0] ? (
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                ) : (
                  "لا توجد صورة"
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-1">{p.name}</h3>
                {p.description && <p className="text-xs text-ink/60 leading-relaxed line-clamp-3">{p.description}</p>}
                {p.results && <p className="text-xs text-gold mt-2">{p.results}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
