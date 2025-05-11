import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  // Get token from the cookies
  const token = request.cookies.get('token')?.value;
  
  // Only protect API routes that are not authentication-related
  const isProtectedApiRoute = request.nextUrl.pathname.startsWith('/api/') && 
                              !request.nextUrl.pathname.startsWith('/api/auth');

  if (isProtectedApiRoute) {
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized - No token provided' },
        { status: 401 }
      );
    }

    try {
      // Verify token
      const secret = process.env.JWT_SECRET || 'default-secret-key-for-development';
      verify(token, secret);
      
      // Token is valid, proceed with the request
      return NextResponse.next();
    } catch (error) {
      // Token is invalid
      return NextResponse.json(
        { error: 'Unauthorized - Invalid token' },
        { status: 401 }
      );
    }
  }

  // Not a protected route, proceed normally
  return NextResponse.next();
}

// Configure which routes should be processed by this middleware
export const config = {
  matcher: [
    '/api/:path*', // Match all API routes
  ],
}; 