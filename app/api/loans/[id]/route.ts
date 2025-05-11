import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Loan from "@/models/loan"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const loan = await Loan.findOne({ loanID: params.id })

    if (!loan) {
      return NextResponse.json({ error: "Loan not found" }, { status: 404 })
    }

    return NextResponse.json(loan)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch loan" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    await connectDB()

    const loan = await Loan.findOneAndUpdate({ loanID: params.id }, body, { new: true, runValidators: true })

    if (!loan) {
      return NextResponse.json({ error: "Loan not found" }, { status: 404 })
    }

    return NextResponse.json(loan)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update loan" }, { status: 500 })
  }
}
