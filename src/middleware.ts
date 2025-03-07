import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith("/api")) {
      const response = NextResponse.next();

      response.headers.set(
        "Access-Control-Allow-Origin",
        process.env.NEXT_PUBLIC_APP_URL || "*"
      );
      response.headers.set(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      response.headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );

      if (request.method === "OPTIONS") {
        return NextResponse.json({}, { headers: response.headers });
      }

      return response;
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname.startsWith("/api")) {
          return true;
        }

        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/api/:path*",
    "/dashboard/:path*",
    "/users/:path*",
    "/questions/:path*",
    "/knowledges/:path*",
  ],
};
