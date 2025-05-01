import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("authToken")?.value;

  // Agar foydalanuvchi autentifikatsiya qilingan bo‘lsa (authToken mavjud)
  if (authToken) {
    // Sign-in va sign-up sahifalariga kirishni cheklash
    if (
      request.nextUrl.pathname.startsWith("/sign-in") ||
      request.nextUrl.pathname.startsWith("/sign-up")
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Boshqa holatlarda so‘rovni davom ettirish
  return NextResponse.next();
}

// Middleware qaysi yo‘llarda ishlaydi
export const config = {
  matcher: ["/sign-in", "/sign-up"],
};
