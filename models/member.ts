import mongoose from "mongoose"

const memberSchema = new mongoose.Schema(
  {
    memberID: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    },
    aadharNumber: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    cibilScore: {
      type: Number,
      min: 300,
      max: 900,
    },
    accountType: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Active",
      enum: ["Active", "Inactive", "Suspended"],
    },
    guarantor: {
      name: String,
      relationship: String,
      contact: String,
      email: String,
    },
    miscCharges: {
      type: Number,
      default: 0,
    },
    joiningDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

// Create name from firstName and lastName
memberSchema.pre("save", function (next) {
  if (this.firstName && this.lastName) {
    this.name = `${this.firstName} ${this.lastName}`
  }
  next()
})

export default mongoose.models.Member || mongoose.model("Member", memberSchema)
