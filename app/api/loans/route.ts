import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Loan from "@/models/loan"

export async function GET() {
  try {
    await connectDB()
    const loans = await Loan.find({})
    return NextResponse.json(loans)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch loans" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    await connectDB()

    // Generate a unique loan ID
    const lastLoan = await Loan.findOne().sort({ createdAt: -1 })
    const currentYear = new Date().getFullYear()
    const loanID = lastLoan
      ? `L-${currentYear}-${String(Number.parseInt(lastLoan.loanID.split("-")[2]) + 1).padStart(3, "0")}`
      : `L-${currentYear}-001`

    const loan = await Loan.create({
      ...body,
      loanID,
      startDate: new Date(),
      status: "Active",
    })

    return NextResponse.json(loan, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create loan" }, { status: 500 })
  }
}
