import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY as
  | string
  | undefined;

let cachedAdminClient: SupabaseClient | null = null;

export function getServiceSupabase(): SupabaseClient | null {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return null;
  if (!cachedAdminClient) {
    cachedAdminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }
  return cachedAdminClient;
}

export function getAllowedAdminEmail(): string | undefined {
  return process.env.NEXT_PUBLIC_ADMIN_EMAIL;
}

export function isAutoSeedEnabled(): boolean {
  return process.env.ADMIN_AUTO_SEED === "true";
}
