function EmptyState({ text }: { text: string }) {
  return <p className="text-sm text-ink/40 py-6 text-center border border-dashed border-ink/10 rounded-xl">{text}</p>;
}

export default function QualificationsSection({ data }: { data: any }) {
  const { qualifications, certificates, quranLicenses } = data;

  return (
    <section id="qualifications" className="py-16 px-4 md:px-6 max-w-6xl mx-auto scroll-mt-16">
      <p className="section-subtitle">الأساس العلمي</p>
      <h2 className="section-title">المؤهلات العلمية</h2>
      <div className="gold-line mb-10" />

      <h3 className="text-xl font-bold font-display mb-4">المؤهلات الأكاديمية</h3>
      {qualifications.length === 0 ? (
        <EmptyState text="لم تتم إضافة مؤهلات أكاديمية بعد" />
      ) : (
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {qualifications.map((q: any) => (
            <div key={q.id} className="card p-5">
              <p className="text-xs text-gold mb-1">{q.degree_level}</p>
              <h4 className="font-bold text-lg">{q.major}</h4>
              <p className="text-sm text-ink/60 mb-2">{q.institution} {q.graduation_year ? `· ${q.graduation_year}` : ""}</p>
              {q.gpa && <p className="text-xs text-ink/50 mb-2">المعدل: {q.gpa}</p>}
              {q.description && <p className="text-sm text-ink/70 leading-relaxed">{q.description}</p>}
            </div>
          ))}
        </div>
      )}

      <h3 className="text-xl font-bold font-display mb-4">الدورات والشهادات</h3>
      {certificates.length === 0 ? (
        <EmptyState text="لم تتم إضافة دورات أو شهادات بعد" />
      ) : (
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {certificates.map((c: any) => (
            <div key={c.id} className="card p-5">
              <h4 className="font-bold mb-1">{c.name}</h4>
              <p className="text-sm text-ink/60 mb-1">{c.issuer}</p>
              <p className="text-xs text-ink/40">
                {c.issue_date ? new Date(c.issue_date).getFullYear() : ""} {c.hours ? `· ${c.hours} ساعة` : ""}
              </p>
            </div>
          ))}
        </div>
      )}

      <h3 className="text-xl font-bold font-display mb-4">إجازات القرآن الكريم</h3>
      {quranLicenses.length === 0 ? (
        <EmptyState text="لم تتم إضافة إجازات قرآنية بعد" />
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {quranLicenses.map((q: any) => (
            <div key={q.id} className="card p-5">
              <h4 className="font-bold mb-1">{q.license_type}</h4>
              {q.narration && <p className="text-sm text-ink/60">رواية: {q.narration}</p>}
              {q.sheikh_name && <p className="text-sm text-ink/60">الشيخ: {q.sheikh_name}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
