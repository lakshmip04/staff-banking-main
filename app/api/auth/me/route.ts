import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import Member from '@/models/member';
import { connectDB } from '@/lib/db';

export async function GET() {
  try {
    // Get token from cookie
    const token = cookies().get('token')?.value;

    if (!token) {
      return NextResponse.json({ 
        authenticated: false 
      }, { status: 401 });
    }

    // Verify token
    const secret = process.env.JWT_SECRET || 'default-secret-key-for-development';
    const decoded = jwt.verify(token, secret) as { id: string };

    await connectDB();

    // Get user data
    const member = await Member.findById(decoded.id).select('-password');

    if (!member) {
      return NextResponse.json({ 
        authenticated: false 
      }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        memberID: member.memberID,
        name: member.name,
        email: member.email
      }
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ 
      authenticated: false 
    }, { status: 401 });
  }
} 