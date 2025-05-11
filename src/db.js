const mongoose = require("mongoose")

// MongoDB Connection URI (can be moved to environment variable)
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/loanManagement"

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log("MongoDB connected successfully")
  } catch (error) {
    console.error("MongoDB connection error:", error)
    process.exit(1) // Exit process with failure
  }
}

// Create models
const memberSchema = new mongoose.Schema({
  memberID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  joiningDate: { type: Date, default: Date.now },
})

const loanSchema = new mongoose.Schema({
  loanID: { type: String, required: true, unique: true },
  memberID: { type: String, required: true },
  amount: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  status: { type: String, default: "Active" },
})

const Member = mongoose.model("Member", memberSchema)
const Loan = mongoose.model("Loan", loanSchema)

module.exports = {
  connectDB,
  Member,
  Loan,
}
