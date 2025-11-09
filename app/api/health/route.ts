import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase-client";
import { getServiceSupabase } from "@/lib/supabase-server";

export async function GET() {
  const urlPresent = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const anonPresent = Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const servicePresent = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

  // Try a lightweight admin ping if possible (won't throw if missing)
  let adminOk: boolean | undefined = undefined;
  try {
    const admin = getServiceSupabase();
    if (admin) {
      // call a cheap method that doesn't mutate; listUsers requires service key and network
      await admin.auth.admin.listUsers({ page: 1, perPage: 1 });
      adminOk = true;
    }
  } catch (_e) {
    adminOk = false;
  }

  return NextResponse.json({
    status: "ok",
    supabaseConfigured: isSupabaseConfigured(),
    env: {
      urlPresent,
      anonPresent,
      servicePresent,
    },
    adminOk,
  });
}
