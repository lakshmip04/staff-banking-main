import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Member from "@/models/member"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const member = await Member.findOne({ memberID: params.id })

    if (!member) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 })
    }

    return NextResponse.json(member)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch member" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    await connectDB()

    const member = await Member.findOneAndUpdate({ memberID: params.id }, body, { new: true, runValidators: true })

    if (!member) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 })
    }

    return NextResponse.json(member)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update member" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const member = await Member.findOneAndDelete({ memberID: params.id })

    if (!member) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Member deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete member" }, { status: 500 })
  }
}
