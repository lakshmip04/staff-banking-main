import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Member from '@/models/member';

export async function GET() {
  try {
    await connectDB();
    
    // Create a test member
    const testMember = await Member.create({
      firstName: "Test",
      lastName: "User",
      dob: new Date("1990-01-01"),
      gender: "male",
      aadharNumber: "123456789012",
      mobileNumber: "9876543210",
      email: "test@example.com",
      password: "test123",
      address: "123 Test Street, Test City",
      accountType: "Savings",
      memberID: "M099", // Unique test member ID
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Test member created successfully!',
      member: testMember
    });
  } catch (error) {
    console.error('Database operation error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to create test member', 
      error: error.message 
    }, { status: 500 });
  }
} 