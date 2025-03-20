import { NextResponse } from "next/server";

export function middleware(request) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  const method = request.method;

  // Define paths that are protected (require authentication)
  const isAdminPath =
    path.startsWith("/admin") &&
    !path.startsWith("/admin/login") &&
    !path.startsWith("/admin/register");

  // For client-side authentication, we need to allow the initial page load
  // The client-side code will handle redirecting if not authenticated

  // Allow public access to GET /api/projects
  if (path === "/api/projects" && method === "GET") {
    return NextResponse.next();
  }

  // Check authentication for other API requests
  if (
    path.startsWith("/api/") &&
    path !== "/api/auth/login" &&
    path !== "/api/auth/register"
  ) {
    // Check for the Authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

// Configure the paths that should trigger this middleware
export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
