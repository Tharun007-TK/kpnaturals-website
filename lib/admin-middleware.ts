import type { NextRequest } from "next/server"

export function validateAdminRequest(request: NextRequest): boolean {
  // In a production environment, you would validate JWT tokens or session cookies
  // For this demo, we'll use a simple header-based authentication
  const adminToken = request.headers.get("x-admin-token")
  return adminToken === "admin-authenticated"
}

export function createAdminResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  })
}
