import { NextResponse } from "next/server";
import {
  getServiceSupabase,
  getAllowedAdminEmail,
  isAutoSeedEnabled,
} from "@/lib/supabase-server";

export async function GET() {
  if (!isAutoSeedEnabled())
    return NextResponse.json({ ok: false }, { status: 403 });

  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ ok: false }, { status: 500 });

  const email = getAllowedAdminEmail() || "sarathykalpana17@gmail.com";
  const password = process.env.DEFAULT_ADMIN_PASSWORD || "test";

  // Try to find existing user by email
  const { data: list, error: listErr } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });
  if (listErr)
    return NextResponse.json(
      { ok: false, error: listErr.message },
      { status: 500 }
    );
  const exists = list.users.find((u) => u.email === email);
  if (exists) return NextResponse.json({ ok: true, seeded: false });

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (error)
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  return NextResponse.json({ ok: true, seeded: true, userId: data.user?.id });
}
