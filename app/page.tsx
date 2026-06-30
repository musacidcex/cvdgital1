import { getPublicProfile } from "./supabaseClient";
import NavBar from "@/components/NavBar";
import ProfileHeader from "@/components/ProfileHeader";
import StatsSection from "@/components/StatsSection";
import QualificationsSection from "@/components/QualificationsSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import LibrarySection from "@/components/LibrarySection";
import CvSection from "@/components/CvSection";

export const revalidate = 0;

export default async function HomePage() {
  const data = await getPublicProfile();

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 text-center">
        <div>
          <h1 className="text-2xl font-bold font-display mb-3">لا يوجد ملف منشور بعد</h1>
          <p className="text-ink/60 max-w-md mx-auto">
            بمجرد إنشاء حساب وإضافة بياناتك وتفعيل الظهور العام من إعدادات الخصوصية، سيظهر ملفك هنا.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <NavBar name={data.profile?.full_name || ""} />
      <ProfileHeader profile={data.profile} />
      <StatsSection data={data} />
      <QualificationsSection data={data} />
      <ExperienceSection experiences={data.experiences} />
      <SkillsSection skills={data.skills} />
      <ProjectsSection projects={data.projects} />
      <LibrarySection items={data.libraryItems} />
      <CvSection cvVersions={data.cvVersions} />

      <footer className="py-10 text-center text-xs text-ink/30 border-t border-ink/5 mt-10">
        تم آخر تحديث للملف: {data.profile?.last_updated_at ? new Date(data.profile.last_updated_at).toLocaleDateString("ar-SA") : "—"}
      </footer>
    </main>
  );
}
