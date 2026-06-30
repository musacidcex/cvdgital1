import Image from "next/image";
import QrCode from "./QrCode";

const SOCIAL_LABELS: Record<string, string> = {
  linkedin: "LinkedIn",
  x: "X",
  youtube: "YouTube",
  telegram: "Telegram",
  github: "GitHub",
  researchgate: "ResearchGate",
  google_scholar: "Google Scholar"
};

export default function ProfileHeader({ profile }: { profile: any }) {
  const social = profile?.social_links || {};
  const socialEntries = Object.entries(social).filter(([, v]) => v);

  return (
    <section id="profile" className="pt-28 pb-16 px-4 md:px-6 max-w-6xl mx-auto scroll-mt-16">
      <div className="grid md:grid-cols-[200px_1fr_160px] gap-8 items-start">
        <div className="flex justify-center md:justify-start">
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-gold/30 shadow-xl bg-slate/5 relative">
            {profile?.avatar_url ? (
              <Image src={profile.avatar_url} alt={profile.full_name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-5xl text-gold/40 font-display">
                {profile?.full_name?.charAt(0) || "؟"}
              </div>
            )}
          </div>
        </div>

        <div>
          <p className="section-subtitle">الملف المهني والأكاديمي الرقمي</p>
          <h1 className="text-4xl md:text-5xl font-bold font-display text-ink mb-2">
            {profile?.full_name || "لم تتم إضافة الاسم بعد"}
          </h1>
          <p className="text-lg md:text-xl text-gold font-medium mb-4">
            {profile?.professional_title || ""}
          </p>
          {profile?.bio && <p className="text-slate/80 leading-loose max-w-2xl mb-6">{profile.bio}</p>}

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink/70 mb-4">
            {profile?.email && <span>✉️ {profile.email}</span>}
            {profile?.phone && <span>📞 {profile.phone}</span>}
            {profile?.whatsapp && <span>💬 واتساب: {profile.whatsapp}</span>}
            {profile?.location && <span>📍 {profile.location}</span>}
          </div>

          {profile?.languages?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.languages.map((lang: string) => (
                <span key={lang} className="text-xs px-3 py-1 rounded-full bg-ink/5 text-ink/70">
                  {lang}
                </span>
              ))}
            </div>
          )}

          {socialEntries.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-6">
              {socialEntries.map(([key, url]) => (
                <a
                  key={key}
                  href={url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-4 py-2 rounded-full border border-gold/40 text-ink hover:bg-gold hover:text-white transition-colors"
                >
                  {SOCIAL_LABELS[key] || key}
                </a>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-3 no-print">
            <a href="#cv" className="px-5 py-2.5 rounded-xl bg-ink text-paper text-sm hover:bg-slate transition-colors">
              عرض السيرة الذاتية
            </a>
            <button className="px-5 py-2.5 rounded-xl border border-ink/20 text-sm hover:bg-ink/5 transition-colors">
              تحميل PDF
            </button>
            <button className="px-5 py-2.5 rounded-xl border border-ink/20 text-sm hover:bg-ink/5 transition-colors">
              مشاركة الملف
            </button>
          </div>
        </div>

        <div className="hidden md:flex flex-col items-center gap-2 no-print">
          <div className="w-32 h-32 bg-white card flex items-center justify-center p-3">
            <QrCode value={profile?.share_url || "https://example.com"} size={104} />
          </div>
          <p className="text-[11px] text-ink/40">امسح لمشاركة الملف</p>
        </div>
      </div>
    </section>
  );
}
