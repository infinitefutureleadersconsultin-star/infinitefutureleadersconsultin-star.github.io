import { NextRequest, NextResponse } from 'next/server';

/**
 * Firebase authentication middleware
 * Handles route protection and admin access control
 */
export async function updateSession(request: NextRequest) {
  const response = NextResponse.next();

  // Get the Firebase auth token from cookies
  // Firebase stores the token in a cookie named based on the project
  const authToken = request.cookies.get('__session')?.value;

  // Protected routes that require authentication
  const protectedPaths = ['/dashboard', '/intake', '/book', '/checklist', '/success'];
  const adminPaths = ['/admin'];

  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );
  const isAdmin = adminPaths.some((path) => request.nextUrl.pathname.startsWith(path));

  // For protected routes, if no auth token, redirect to login
  if (isProtected || isAdmin) {
    if (!authToken) {
      const url = request.nextUrl.clone();
      url.pathname = '/auth/login';
      return NextResponse.redirect(url);
    }

    // For admin routes, we'll verify admin status in the actual page/API route
    // since middleware can't easily access Firebase Admin SDK
    // The admin check will happen server-side using the admin SDK
  }

  return response;
}

/**
 * Helper to get auth token from request headers
 * Used in API routes
 */
export function getAuthToken(request: Request): string | null {
  const authHeader = request.headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
}
