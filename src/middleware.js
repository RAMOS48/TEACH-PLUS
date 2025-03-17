import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export default async function middleware(req) {
  try {
    const path = req.nextUrl.pathname;

    // ✅ Récupération du cookie correctement
    const cookie = req.cookies.get("session");

    // ✅ Si le cookie est absent, rediriger les utilisateurs non authentifiés
    if (!cookie) {
      if (path.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      return NextResponse.next();
    }

    // ✅ Vérifier le JWT
    const encodedKey = new TextEncoder().encode(process.env.SESSION_SECRET);
    const { payload } = await jwtVerify(cookie, encodedKey, { algorithms: ["HS256"] });

    // ✅ Si l'utilisateur est connecté et accède à "/", rediriger vers /admin
    if (path === "/") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    // ✅ Ajouter l'adminId dans les headers de la requête
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-admin-id", payload.adminId);

    return NextResponse.next({ request: { headers: requestHeaders } });

  } catch (err) {
    console.error("JWT Middleware Error:", err.message);
    return NextResponse.redirect(new URL("/", req.url)); // Rediriger vers la page de connexion en cas d'erreur
  }
}

// ✅ Appliquer le middleware uniquement aux routes sensibles
export const config = {
  matcher: ["/admin/:path*"], // Le middleware s'exécute uniquement sur /admin et ses sous-pages
};
