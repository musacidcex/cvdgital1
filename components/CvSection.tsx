const STYLE_LABELS: Record<string, string> = {
  academic: "أكاديمية",
  government: "حكومية",
  professional: "مهنية",
  executive: "تنفيذية"
};

export default function CvSection({ cvVersions }: { cvVersions: any[] }) {
  return (
    <section id="cv" className="py-16 px-4 md:px-6 max-w-6xl mx-auto scroll-mt-16">
      <p className="section-subtitle">الملخص الشامل</p>
      <h2 className="section-title">السيرة الذاتية الذكية</h2>
      <div className="gold-line mb-10" />

      {cvVersions.length === 0 ? (
        <p className="text-sm text-ink/40 py-6 text-center border border-dashed border-ink/10 rounded-xl">
          لم يتم توليد نسخ من السيرة الذاتية بعد — يمكن إنشاؤها من لوحة التحكم
        </p>
      ) : (
        <div className="grid md:grid-cols-4 gap-4">
          {cvVersions.map((cv: any) => (
            <div key={cv.id} className="card p-5 text-center">
              <p className="font-bold mb-1">{STYLE_LABELS[cv.style] || cv.style}</p>
              <p className="text-xs text-ink/50 mb-4">{cv.title}</p>
              <div className="flex flex-col gap-2 no-print">
                <a
                  href={cv.generated_pdf_url || "#"}
                  className="text-xs px-4 py-2 rounded-lg bg-ink text-paper hover:bg-slate transition-colors"
                >
                  عرض / تحميل
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
