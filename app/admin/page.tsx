"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAdminSession } from "@/lib/admin-auth";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const session = await getAdminSession();
      if (session) {
        router.push("/admin/dashboard");
      } else {
        router.push("/admin/login");
      }
    })();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
    </div>
  );
}
