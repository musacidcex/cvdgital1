function formatDate(d: string | null) {
  if (!d) return "حتى الآن";
  return new Date(d).toLocaleDateString("ar-SA", { year: "numeric", month: "long" });
}

export default function ExperienceSection({ experiences }: { experiences: any[] }) {
  return (
    <section id="experience" className="py-16 px-4 md:px-6 max-w-6xl mx-auto scroll-mt-16">
      <p className="section-subtitle">المسيرة المهنية</p>
      <h2 className="section-title">الخبرات العملية</h2>
      <div className="gold-line mb-10" />

      {experiences.length === 0 ? (
        <p className="text-sm text-ink/40 py-6 text-center border border-dashed border-ink/10 rounded-xl">
          لم تتم إضافة خبرات عملية بعد
        </p>
      ) : (
        <div className="relative border-r-2 border-gold/20 pr-8 space-y-10">
          {experiences.map((exp: any) => (
            <div key={exp.id} className="relative">
              <span className="absolute -right-[39px] top-1 w-3 h-3 rounded-full bg-gold" />
              <h3 className="text-lg font-bold">{exp.job_title}</h3>
              <p className="text-gold text-sm mb-1">{exp.company}</p>
              <p className="text-xs text-ink/50 mb-3">
                {formatDate(exp.start_date)} — {exp.is_current ? "حتى الآن" : formatDate(exp.end_date)}
              </p>
              {exp.description && <p className="text-sm text-ink/70 leading-relaxed mb-4">{exp.description}</p>}

              {exp.experience_achievements?.length > 0 && (
                <div className="grid md:grid-cols-2 gap-3">
                  {exp.experience_achievements.map((a: any) => (
                    <div key={a.id} className="card p-4">
                      <p className="font-semibold text-sm mb-1">{a.title}</p>
                      {a.description && <p className="text-xs text-ink/60 leading-relaxed">{a.description}</p>}
                      {a.results && <p className="text-xs text-gold mt-2">النتائج: {a.results}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
