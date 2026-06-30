function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="card px-4 py-6 text-center">
      <p className="text-3xl md:text-4xl font-bold text-gold font-display">{value}</p>
      <p className="text-xs md:text-sm text-ink/60 mt-1">{label}</p>
    </div>
  );
}

export default function StatsSection({ data }: { data: any }) {
  const stats = [
    { label: "المؤهلات الأكاديمية", value: data.qualifications.length },
    { label: "الدورات والشهادات", value: data.certificates.length },
    { label: "إجازات القرآن", value: data.quranLicenses.length },
    { label: "الخبرات", value: data.experiences.length },
    { label: "المشاريع", value: data.projects.length },
    { label: "عناصر المكتبة", value: data.libraryItems.length },
    { label: "المهارات", value: data.skills.length },
    { label: "اللغات", value: data.profile?.languages?.length || 0 }
  ];

  return (
    <section id="stats" className="py-16 px-4 md:px-6 max-w-6xl mx-auto scroll-mt-16">
      <p className="section-subtitle">نظرة سريعة</p>
      <h2 className="section-title">ملخص الإنجازات</h2>
      <div className="gold-line mb-10" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
