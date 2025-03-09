import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// CORS headers configuration
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_APP_URL || "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Helper function to create response with CORS
const createResponse = (response: NextResponse) => {
  Object.entries(CORS_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
};

// Helper function to create error response
const createErrorResponse = (message: string, status: number) => {
  return NextResponse.json(
    {
      status: false,
      message,
      statusCode: status,
    },
    { status, headers: CORS_HEADERS }
  );
};

// Check if path is public
const isPublicPath = (pathname: string) => {
  const publicPaths = [
    "/api/auth",
    "/api/missing-answers",
  ];
  return publicPaths.some((path) => pathname.startsWith(path));
};

// Check if request is public GET knowledge
const isPublicKnowledge = (pathname: string, method: string) => {
  return pathname.startsWith("/api/knowledges") && method === "GET";
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle OPTIONS request
  if (request.method === "OPTIONS") {
    return new NextResponse(null, { status: 200, headers: CORS_HEADERS });
  }

  // Handle API routes
  if (pathname.startsWith("/api")) {
    // Allow public paths and GET knowledge without auth
    if (isPublicPath(pathname) || isPublicKnowledge(pathname, request.method)) {
      return createResponse(NextResponse.next());
    }

    // Check authentication
    const token = await getToken({ req: request });
    if (!token) {
      return createErrorResponse("Unauthorized access", 401);
    }

    return createResponse(NextResponse.next());
  }

  // Handle non-API routes
  const token = await getToken({ req: request });
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/:path*",
    "/dashboard/:path*",
    "/users/:path*",
    "/questions/:path*",
    "/knowledges/:path*",
  ],
};
