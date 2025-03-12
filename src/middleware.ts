import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { PERMISSIONS, hasPermission } from "@/lib/auth/permissions";

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
  const publicPaths = ["/api/auth", "/api/missing-answers"];
  return publicPaths.some((path) => pathname.startsWith(path));
};

// Check if request is public GET knowledge
const isPublicKnowledge = (pathname: string, method: string) => {
  return pathname.startsWith("/api/knowledges") && method === "GET";
};

const PROTECTED_ROUTES = [
  {
    path: "/users",
    permission: PERMISSIONS.READ_USER,
  },
  {
    path: "/users/create",
    permission: PERMISSIONS.CREATE_USER,
  },
  {
    path: "/users/:id",
    permission: PERMISSIONS.UPDATE_USER,
  },
  {
    path: "/knowledges",
    permission: PERMISSIONS.READ_KNOWLEDGE,
  },
  {
    path: "/knowledges/create",
    permission: PERMISSIONS.CREATE_KNOWLEDGE,
  },
  {
    path: "/knowledges/:id",
    permission: PERMISSIONS.UPDATE_KNOWLEDGE,
  },
  {
    path: "/logs",
    permission: PERMISSIONS.READ_LOG_ACTIVITY,
  },
  {
    path: "/questions",
    permission: PERMISSIONS.READ_QUESTION,
  },
] as const;

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

  // Check permission for the accessed route
  const protectedRoute = PROTECTED_ROUTES.find((route) =>
    pathname.startsWith(route.path)
  );

  if (protectedRoute) {
    const hasAccess = hasPermission(
      token.role as string,
      protectedRoute.permission
    );

    if (!hasAccess) {
      return createErrorResponse("Unauthorized access", 403);
    }
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
    "/logs/:path*",
    "/chat-votes/:path*",
  ],
};
