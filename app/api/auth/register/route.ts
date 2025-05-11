import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import Member from '@/models/member';
import { connectDB } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { name, email, password, phone, address } = await request.json();

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if user already exists
    const existingUser = await Member.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate a unique member ID
    const lastMember = await Member.findOne().sort({ createdAt: -1 });
    const memberID = lastMember
      ? `M${String(Number.parseInt(lastMember.memberID.substring(1)) + 1).padStart(3, "0")}`
      : "M001";

    // Create new member
    const newMember = await Member.create({
      name,
      email,
      password: hashedPassword,
      phone: phone || '',
      address: address || '',
      memberID,
      status: 'Active',
    });

    // Remove password from response
    const member = newMember.toObject();
    delete member.password;

    return NextResponse.json({
      message: 'Registration successful',
      member,
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 