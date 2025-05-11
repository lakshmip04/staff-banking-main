import mongoose from "mongoose"

const paymentSchema = new mongoose.Schema(
  {
    receiptID: {
      type: String,
      required: true,
      unique: true,
    },
    loanID: {
      type: String,
      required: true,
      ref: "Loan",
    },
    memberID: {
      type: String,
      required: true,
      ref: "Member",
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    account: {
      type: String,
      required: true,
    },
    fine: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    balance: {
      type: Number,
    },
    status: {
      type: String,
      default: "Completed",
      enum: ["Completed", "Pending", "Failed"],
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Payment || mongoose.model("Payment", paymentSchema)
