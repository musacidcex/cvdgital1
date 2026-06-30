"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    setLoading(false);

    if (result.error) {
      setError(result.error.message);
      return;
    }

    if (mode === "signup" && result.data.user) {
      // إنشاء صفوف أولية للمستخدم الجديد
      await supabase.from("profiles").insert({
        id: result.data.user.id,
        full_name: "اسمك الكامل",
        email
      });
      await supabase.from("privacy_settings").insert({
        id: result.data.user.id,
        is_public: false
      });
    }

    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="card p-8 w-full max-w-sm">
        <h1 className="text-xl font-bold font-display mb-1 text-center">
          {mode === "login" ? "تسجيل الدخول" : "إنشاء حساب"}
        </h1>
        <p className="text-xs text-ink/40 text-center mb-6">لوحة تحكم الملف المهني والأكاديمي</p>

        <input
          type="email"
          required
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 px-4 py-2.5 rounded-xl border border-ink/10 text-sm focus:outline-none focus:border-gold"
        />
        <input
          type="password"
          required
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2.5 rounded-xl border border-ink/10 text-sm focus:outline-none focus:border-gold"
        />

        {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-xl bg-ink text-paper text-sm hover:bg-slate transition-colors disabled:opacity-50"
        >
          {loading ? "جارٍ التحميل..." : mode === "login" ? "دخول" : "إنشاء الحساب"}
        </button>

        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="w-full mt-3 text-xs text-ink/50 hover:text-gold transition-colors"
        >
          {mode === "login" ? "ليس لديك حساب؟ أنشئ واحداً" : "لديك حساب بالفعل؟ سجّل الدخول"}
        </button>
      </form>
    </main>
  );
}
