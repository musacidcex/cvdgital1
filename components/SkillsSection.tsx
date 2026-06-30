export default function SkillsSection({ skills }: { skills: any[] }) {
  return (
    <section id="skills" className="py-16 px-4 md:px-6 max-w-6xl mx-auto scroll-mt-16">
      <p className="section-subtitle">القدرات</p>
      <h2 className="section-title">المهارات</h2>
      <div className="gold-line mb-10" />

      {skills.length === 0 ? (
        <p className="text-sm text-ink/40 py-6 text-center border border-dashed border-ink/10 rounded-xl">
          لم تتم إضافة مهارات بعد
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {skills.map((s: any) => (
            <div key={s.id} className="card p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-sm">{s.name}</span>
                <span className="text-xs text-gold">{s.proficiency_level || 0}/5</span>
              </div>
              <div className="w-full h-1.5 bg-ink/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold rounded-full"
                  style={{ width: `${((s.proficiency_level || 0) / 5) * 100}%` }}
                />
              </div>
              {s.description && <p className="text-xs text-ink/50 mt-2">{s.description}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
