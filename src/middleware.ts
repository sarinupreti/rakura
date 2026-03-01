import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isValidLocale } from "./lib/i18n";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameLocale = pathname.split("/")[1];

  if (isValidLocale(pathnameLocale)) {
    return NextResponse.next();
  }

  const locale = defaultLocale;
  const newUrl = new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets).*)"],
};
