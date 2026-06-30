"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../supabaseClient";

export default function DashboardPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>({});
  const [privacy, setPrivacy] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/login");
        return;
      }
      setUserId(data.user.id);

      const [p, ps] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", data.user.id).maybeSingle(),
        supabase.from("privacy_settings").select("*").eq("id", data.user.id).maybeSingle()
      ]);
      setProfile(p.data || {});
      setPrivacy(ps.data || {});
    })();
  }, [router]);

  async function saveProfile() {
    if (!userId) return;
    setSaving(true);
    setSavedMsg("");

    await supabase
      .from("profiles")
      .update({ ...profile, last_updated_at: new Date().toISOString() })
      .eq("id", userId);

    await supabase
      .from("privacy_settings")
      .upsert({ id: userId, ...privacy });

    setSaving(false);
    setSavedMsg("تم الحفظ بنجاح");
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (!userId) return null;

  return (
    <main className="min-h-screen px-4 py-10 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold font-display">لوحة التحكم</h1>
        <button onClick={logout} className="text-xs text-ink/50 hover:text-gold">
          تسجيل الخروج
        </button>
      </div>

      <section className="card p-6 mb-6">
        <h2 className="font-bold mb-4">الملف الشخصي</h2>
        <div className="space-y-3">
          <input
            placeholder="الاسم الكامل"
            value={profile.full_name || ""}
            onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-ink/10 text-sm"
          />
          <input
            placeholder="المسمى المهني"
            value={profile.professional_title || ""}
            onChange={(e) => setProfile({ ...profile, professional_title: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-ink/10 text-sm"
          />
          <textarea
            placeholder="النبذة التنفيذية"
            value={profile.bio || ""}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl border border-ink/10 text-sm"
          />
          <input
            placeholder="رقم الهاتف"
            value={profile.phone || ""}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-ink/10 text-sm"
          />
          <input
            placeholder="واتساب"
            value={profile.whatsapp || ""}
            onChange={(e) => setProfile({ ...profile, whatsapp: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-ink/10 text-sm"
          />
          <input
            placeholder="الموقع الجغرافي"
            value={profile.location || ""}
            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-ink/10 text-sm"
          />
        </div>
      </section>

      <section className="card p-6 mb-6">
        <h2 className="font-bold mb-4">الخصوصية</h2>
        <label className="flex items-center justify-between mb-3 text-sm">
          <span>إظهار الملف للعامة (نشر)</span>
          <input
            type="checkbox"
            checked={!!privacy.is_public}
            onChange={(e) => setPrivacy({ ...privacy, is_public: e.target.checked })}
          />
        </label>
        <label className="flex items-center justify-between mb-3 text-sm">
          <span>السماح بتحميل الملفات</span>
          <input
            type="checkbox"
            checked={privacy.allow_downloads !== false}
            onChange={(e) => setPrivacy({ ...privacy, allow_downloads: e.target.checked })}
          />
        </label>
        <label className="flex items-center justify-between text-sm">
          <span>عدم الفهرسة في محركات البحث (No Index)</span>
          <input
            type="checkbox"
            checked={privacy.no_index !== false}
            onChange={(e) => setPrivacy({ ...privacy, no_index: e.target.checked })}
          />
        </label>
      </section>

      <button
        onClick={saveProfile}
        disabled={saving}
        className="w-full py-3 rounded-xl bg-ink text-paper text-sm hover:bg-slate transition-colors disabled:opacity-50"
      >
        {saving ? "جارٍ الحفظ..." : "حفظ التغييرات"}
      </button>
      {savedMsg && <p className="text-xs text-gold text-center mt-3">{savedMsg}</p>}

      <p className="text-xs text-ink/40 text-center mt-8">
        لإضافة المؤهلات والخبرات والمشاريع وباقي الأقسام التفصيلية، سنوسّع لوحة التحكم في الخطوة القادمة.
      </p>
    </main>
  );
}
