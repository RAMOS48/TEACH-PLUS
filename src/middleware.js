import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export default async function middleware(req) {
  try {
    const path = req.nextUrl.pathname;
    const cookie = (await cookies()).get("session")?.value

    if (!cookie) {
      if (path == "/") {
        return NextResponse.json(
          { status: "FAILED", message: "Unauthorized activity! Admin is not logged in" },
          { status: 401 }
        );
      }
      return NextResponse.next();
    }

    // Verify JWT
    const encodedKey = new TextEncoder().encode(process.env.SESSION_SECRET);
    const { payload } = await jwtVerify(cookie, encodedKey, { algorithms: ["HS256"] });

    if (path === "/" && payload?.adminId) {
      return NextResponse.json(
        { status: "FAILED", message: "Admin is already logged in" },
        { status: 401 }
      );
    }

    // Store the admin ID in headers
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-admin-id", payload.adminId);

    return NextResponse.next({ request: { headers: requestHeaders } });

  } catch (err) {
    console.error("JWT Middleware Error:", err.message);
    return NextResponse.json(
      { status: "FAILED", message: err.message },
      { status: 401 }
    );
  }
}

// ✅ Fixed: Middleware only runs for "/admin" routes, not for all pages
export const config = {
  matcher: ["/:path*"], 
};
