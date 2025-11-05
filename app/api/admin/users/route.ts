import { NextResponse } from "next/server";
import {
  getServiceSupabase,
  getAllowedAdminEmail,
} from "@/lib/supabase-server";

async function verifyAdmin(request: Request) {
  const supabase = getServiceSupabase();
  if (!supabase)
    return { ok: false, status: 500, error: "Server not configured" };

  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return { ok: false, status: 401, error: "Missing token" };

  const { data: userData, error } = await supabase.auth.getUser(token);
  if (error || !userData?.user)
    return { ok: false, status: 401, error: "Invalid token" };

  const allowed = getAllowedAdminEmail();
  if (allowed && userData.user.email !== allowed) {
    return { ok: false, status: 403, error: "Forbidden" };
  }
  return { ok: true, user: userData.user } as const;
}

export async function GET(request: Request) {
  const auth = await verifyAdmin(request);
  if (!auth.ok)
    return NextResponse.json({ error: auth.error }, { status: auth.status });

  const supabase = getServiceSupabase();
  if (!supabase)
    return NextResponse.json(
      { error: "Server not configured" },
      { status: 500 }
    );

  const page = Number(new URL(request.url).searchParams.get("page") || 1);
  const perPage = Number(
    new URL(request.url).searchParams.get("perPage") || 10
  );

  const { data, error } = await supabase.auth.admin.listUsers({
    page,
    perPage,
  });
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({
    users: data.users,
    page,
    perPage,
    total: data.total,
  });
}

export async function POST(request: Request) {
  const auth = await verifyAdmin(request);
  if (!auth.ok)
    return NextResponse.json({ error: auth.error }, { status: auth.status });

  const supabase = getServiceSupabase();
  if (!supabase)
    return NextResponse.json(
      { error: "Server not configured" },
      { status: 500 }
    );

  const body = await request.json();
  const { email, password } = body || {};
  if (!email || !password)
    return NextResponse.json(
      { error: "email and password required" },
      { status: 400 }
    );

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ user: data.user });
}
