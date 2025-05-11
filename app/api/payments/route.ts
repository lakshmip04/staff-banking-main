import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Payment from "@/models/payment"
import Loan from "@/models/loan"

export async function GET() {
  try {
    await connectDB()
    const payments = await Payment.find({}).sort({ date: -1 })
    return NextResponse.json(payments)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch payments" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    await connectDB()

    // Generate a unique receipt ID
    const lastPayment = await Payment.findOne().sort({ createdAt: -1 })
    const receiptID = lastPayment ? `#${String(Number.parseInt(lastPayment.receiptID.substring(1)) + 1)}` : "#10001"

    // Create payment
    const payment = await Payment.create({
      ...body,
      receiptID,
      date: new Date(body.date || Date.now()),
    })

    // Update loan outstanding amount
    if (body.loanID) {
      const loan = await Loan.findOne({ loanID: body.loanID })
      if (loan) {
        loan.outstandingAmount -= body.amount
        if (loan.outstandingAmount <= 0) {
          loan.status = "Completed"
        }
        await loan.save()
      }
    }

    return NextResponse.json(payment, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create payment" }, { status: 500 })
  }
}
