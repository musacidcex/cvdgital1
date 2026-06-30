import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ملاحظة: في هذه النسخة الأولية نعرض أول ملف عام (is_public) في قاعدة البيانات
// لاحقاً عند إضافة صفحات متعددة المستخدمين يمكن التصفية حسب username في الرابط

export async function getPublicProfile() {
  const { data: privacy } = await supabase
    .from("privacy_settings")
    .select("id")
    .eq("is_public", true)
    .eq("password_protected", false)
    .limit(1)
    .maybeSingle();

  if (!privacy) return null;

  const userId = privacy.id;

  const [
    profile,
    qualifications,
    certificates,
    quranLicenses,
    experiences,
    skills,
    projects,
    libraryItems,
    cvVersions
  ] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
    supabase.from("qualifications").select("*").eq("user_id", userId).order("graduation_year", { ascending: false }),
    supabase.from("certificates").select("*").eq("user_id", userId).order("issue_date", { ascending: false }),
    supabase.from("quran_licenses").select("*").eq("user_id", userId).order("issue_date", { ascending: false }),
    supabase
      .from("experiences")
      .select("*, experience_achievements(*)")
      .eq("user_id", userId)
      .order("start_date", { ascending: false }),
    supabase.from("skills").select("*").eq("user_id", userId),
    supabase.from("projects").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
    supabase.from("library_items").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
    supabase.from("cv_versions").select("*").eq("user_id", userId)
  ]);

  return {
    userId,
    profile: profile.data,
    qualifications: qualifications.data || [],
    certificates: certificates.data || [],
    quranLicenses: quranLicenses.data || [],
    experiences: experiences.data || [],
    skills: skills.data || [],
    projects: projects.data || [],
    libraryItems: libraryItems.data || [],
    cvVersions: cvVersions.data || []
  };
}
