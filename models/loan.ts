import mongoose from "mongoose"

const loanSchema = new mongoose.Schema(
  {
    loanID: {
      type: String,
      required: true,
      unique: true,
    },
    memberID: {
      type: String,
      required: true,
      ref: "Member",
    },
    loanType: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    interestRate: {
      type: Number,
      required: true,
    },
    returnAmount: {
      type: Number,
      required: true,
    },
    dailyIST: {
      type: Number,
    },
    outstandingAmount: {
      type: Number,
    },
    purpose: {
      type: String,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
    status: {
      type: String,
      default: "Active",
      enum: ["Active", "Completed", "Defaulted", "Cancelled"],
    },
    guarantor: {
      name: String,
      relationship: String,
      contact: String,
      email: String,
    },
    additionalCharges: [
      {
        name: String,
        amount: Number,
      },
    ],
  },
  {
    timestamps: true,
  },
)

// Calculate returnAmount, outstandingAmount, and dailyIST before saving
loanSchema.pre("save", function (next) {
  if (this.isNew) {
    // Calculate return amount based on interest rate
    this.returnAmount = this.amount * (1 + this.interestRate / 100)

    // Set initial outstanding amount to return amount
    this.outstandingAmount = this.returnAmount

    // Calculate daily IST (assuming 30-day month)
    const durationInDays = 30
    this.dailyIST = (this.returnAmount - this.amount) / durationInDays

    // Set end date (assuming 30-day loan term)
    const startDate = new Date(this.startDate)
    this.endDate = new Date(startDate.setDate(startDate.getDate() + 30))
  }
  next()
})

export default mongoose.models.Loan || mongoose.model("Loan", loanSchema)
