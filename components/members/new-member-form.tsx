"use client"

import { useState } from "react"
import { Layout } from "@/components/layout/layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function NewMemberForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    aadharNumber: "",
    gender: "",
    mobileNumber: "",
    cibilScore: "",
    address: "",
    miscCharges: "",
    accountType: "",
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value) => {
    setFormData((prev) => ({ ...prev, gender: value }))
  }

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, accountType: value }))
  }

  const handleAadharInput = (e) => {
    let value = e.target.value.replace(/\D/g, "")
    if (value.length > 12) value = value.slice(0, 12)
    if (value.length >= 4) value = value.slice(0, 4) + "-" + value.slice(4)
    if (value.length >= 9) value = value.slice(0, 9) + "-" + value.slice(9)
    setFormData((prev) => ({ ...prev, aadharNumber: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Success",
        description: "Member registered successfully!",
        variant: "default",
      })

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        dob: "",
        aadharNumber: "",
        gender: "",
        mobileNumber: "",
        cibilScore: "",
        address: "",
        miscCharges: "",
        accountType: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register member. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6 pt-24">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">New Member Registration</h1>

        <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg p-6 space-y-6">
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  required
                  pattern="[A-Za-z ]+"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  required
                  pattern="[A-Za-z ]+"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="dob">Date of Birth *</Label>
                <Input id="dob" name="dob" type="date" required value={formData.dob} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="aadharNumber">Aadhar Card Number *</Label>
                <Input
                  id="aadharNumber"
                  name="aadharNumber"
                  required
                  pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}"
                  placeholder="XXXX-XXXX-XXXX"
                  value={formData.aadharNumber}
                  onChange={handleAadharInput}
                />
              </div>
              <div>
                <Label>Gender *</Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={handleRadioChange}
                  className="flex space-x-4 mt-2"
                  required
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="mobileNumber">Mobile Number *</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    +91
                  </span>
                  <Input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    className="rounded-l-none"
                    placeholder="Enter mobile number"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="cibilScore">CIBIL Score</Label>
                <Input
                  id="cibilScore"
                  name="cibilScore"
                  type="number"
                  min="300"
                  max="900"
                  placeholder="Enter CIBIL score"
                  value={formData.cibilScore}
                  onChange={handleChange}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address">Address *</Label>
                <Textarea
                  id="address"
                  name="address"
                  required
                  rows={3}
                  placeholder="Enter full address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Registration Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="registrationDate">Date of Registration</Label>
                <Input
                  id="registrationDate"
                  type="date"
                  value={new Date().toISOString().split("T")[0]}
                  className="bg-gray-50 cursor-not-allowed"
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="miscCharges">Miscellaneous Charges *</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    ₹
                  </span>
                  <Input
                    id="miscCharges"
                    name="miscCharges"
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    className="rounded-l-none"
                    placeholder="Enter amount"
                    value={formData.miscCharges}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="transactionId">Transaction ID/Bill No</Label>
                <Input id="transactionId" value="TXN123456789" className="bg-gray-50 cursor-not-allowed" disabled />
              </div>
              <div>
                <Label htmlFor="accountType">Account Type *</Label>
                <Select required value={formData.accountType} onValueChange={handleSelectChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Type A</SelectItem>
                    <SelectItem value="B">Type B</SelectItem>
                    <SelectItem value="C">Type C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <Button type="reset" variant="outline">
              Clear Form
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Processing...
                </>
              ) : (
                "Submit Registration"
              )}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  )
}
