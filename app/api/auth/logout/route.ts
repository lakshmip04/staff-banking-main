import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  // Clear the auth token cookie
  const cookieStore = cookies();
  cookieStore.set({
    name: 'token',
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0, // Expire immediately
    path: '/',
  });

  return NextResponse.json({
    message: 'Logged out successfully',
  });
} 