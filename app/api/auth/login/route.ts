import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import Member from '@/models/member';
import { connectDB } from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Find user by email
    const member = await Member.findOne({ email });

    if (!member) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check if password matches
    const passwordMatch = await bcrypt.compare(password, member.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const secret = process.env.JWT_SECRET || 'default-secret-key-for-development';
    const token = jwt.sign(
      {
        id: member._id,
        memberID: member.memberID,
        email: member.email,
      },
      secret,
      { expiresIn: '24h' }
    );

    // Set cookie with token
    const cookieStore = cookies();
    cookieStore.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    return NextResponse.json({
      message: 'Login successful',
      member: {
        memberID: member.memberID,
        name: member.name,
        email: member.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 