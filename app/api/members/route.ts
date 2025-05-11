import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Member from "@/models/member"

export async function GET() {
  try {
    await connectDB()
    const members = await Member.find({})
    return NextResponse.json(members)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    await connectDB()

    // Generate a unique member ID
    const lastMember = await Member.findOne().sort({ createdAt: -1 })
    const memberID = lastMember
      ? `M${String(Number.parseInt(lastMember.memberID.substring(1)) + 1).padStart(3, "0")}`
      : "M001"

    const member = await Member.create({
      ...body,
      memberID,
    })

    return NextResponse.json(member, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create member" }, { status: 500 })
  }
}
