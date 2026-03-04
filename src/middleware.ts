import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isValidLocale, type Locale } from "./lib/i18n";

const LOCALE_COOKIE = "RAKURA_LOCALE";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameLocale = pathname.split("/")[1];

  // ── Already on a locale path ──────────────────────────────────────────────
  // Respect the URL and update the preference cookie so future visits remember.
  if (isValidLocale(pathnameLocale)) {
    const response = NextResponse.next();
    response.cookies.set(LOCALE_COOKIE, pathnameLocale, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: "/",
      sameSite: "lax",
    });
    return response;
  }

  // ── Detect locale for root / unknown paths ────────────────────────────────
  // Priority:
  //  1. Stored preference cookie  (returning visitor or manual switch)
  //  2. Vercel geo header          (accurate IP-based country on Vercel)
  //  3. Accept-Language header     (browser preference, works in local dev)
  //  4. Default locale             (Thai — our primary market)

  let locale: Locale = defaultLocale;

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    locale = cookieLocale;
  } else {
    const country = request.headers.get("x-vercel-ip-country") ?? "";
    if (country) {
      // Vercel deployment: use IP-based country code
      locale = country === "TH" ? "th" : "en";
    } else {
      // Local dev / non-Vercel: use browser Accept-Language header
      const acceptLang = request.headers.get("accept-language") ?? "";
      locale = /\bth\b/i.test(acceptLang) ? "th" : "en";
    }
  }

  const newUrl = new URL(
    `/${locale}${pathname === "/" ? "" : pathname}`,
    request.url
  );
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets).*)"],
};
