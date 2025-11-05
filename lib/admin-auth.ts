import { getSupabase, isSupabaseConfigured } from "@/lib/supabase-client";

export interface AdminUser {
  email: string;
  isAuthenticated: boolean;
}

// Optional: restrict which email(s) are allowed as admins
const ALLOWED_ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export async function signInAdmin(
  email: string,
  password: string
): Promise<{ ok: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      error:
        "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    };
  }
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: "Supabase not configured" };
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) return { ok: false, error: error.message };

  // Optional email allowlist check
  if (ALLOWED_ADMIN_EMAIL && data.user?.email !== ALLOWED_ADMIN_EMAIL) {
    await supabase.auth.signOut();
    return {
      ok: false,
      error: "This account is not permitted to access admin.",
    };
  }
  return { ok: true };
}

export async function getAdminSession(): Promise<AdminUser | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  const session = data.session;
  if (session?.user?.email) {
    if (ALLOWED_ADMIN_EMAIL && session.user.email !== ALLOWED_ADMIN_EMAIL) {
      await supabase.auth.signOut();
      return null;
    }
    return { email: session.user.email, isAuthenticated: true };
  }
  return null;
}

export async function clearAdminSession() {
  const supabase = getSupabase();
  if (!supabase) return;
  await supabase.auth.signOut();
}

export async function sendPasswordReset(
  email: string,
  redirectTo: string
): Promise<{ ok: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Supabase is not configured." };
  }
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: "Supabase is not configured." };
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function updatePassword(
  newPassword: string
): Promise<{ ok: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Supabase is not configured." };
  }
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: "Supabase is not configured." };
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
