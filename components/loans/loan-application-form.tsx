"use client"

import { useState } from "react"
import { Layout } from "@/components/layout/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function LoanApplicationForm() {
  const [formData, setFormData] = useState({
    loanType: "",
    amount: "",
    purpose: "",
    applicationDate: new Date().toISOString().split("T")[0],
    guarantorName: "",
    guarantorEmail: "",
    guarantorRelationship: "",
    guarantorContact: "",
  })

  const [charges, setCharges] = useState([
    { id: 1, name: "Processing Fee (2%)", amount: 500 },
    { id: 2, name: "Service Charge", amount: 100 },
  ])

  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, loanType: value }))
  }

  const addExtraCharge = () => {
    const chargeName = prompt("Enter charge type:")
    const chargeAmount = prompt("Enter amount:")

    if (chargeName && chargeAmount && !isNaN(Number(chargeAmount))) {
      setCharges((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: chargeName,
          amount: Number(chargeAmount),
        },
      ])
    }
  }

  const getTotalCharges = () => {
    return charges.reduce((total, charge) => total + charge.amount, 0)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Success",
        description: "Loan application submitted successfully!",
        variant: "default",
      })

      // Reset form
      setFormData({
        loanType: "",
        amount: "",
        purpose: "",
        applicationDate: new Date().toISOString().split("T")[0],
        guarantorName: "",
        guarantorEmail: "",
        guarantorRelationship: "",
        guarantorContact: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit loan application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="flex-grow container mx-auto px-4 py-8 pt-24">
        <Card className="max-w-3xl mx-auto">
          <CardContent className="p-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Personal Loan Application</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="mb-4">
                  <Label htmlFor="loanType">Loan Type</Label>
                  <Select required value={formData.loanType} onValueChange={handleSelectChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select loan type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="type-a">Type A - Personal Loan</SelectItem>
                      <SelectItem value="type-b">Type B - Business Loan</SelectItem>
                      <SelectItem value="type-c">Type C - Education Loan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mb-4">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    placeholder="Enter amount"
                    required
                    value={formData.amount}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <Label htmlFor="purpose">Purpose</Label>
                  <Textarea
                    id="purpose"
                    name="purpose"
                    placeholder="Enter loan purpose"
                    rows={3}
                    required
                    value={formData.purpose}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <Label htmlFor="applicationDate">Application Date</Label>
                  <Input
                    id="applicationDate"
                    name="applicationDate"
                    type="date"
                    required
                    value={formData.applicationDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Guarantor Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="guarantorName">Full Name</Label>
                      <Input
                        id="guarantorName"
                        name="guarantorName"
                        required
                        value={formData.guarantorName}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="guarantorEmail">Email</Label>
                      <Input
                        id="guarantorEmail"
                        name="guarantorEmail"
                        type="email"
                        required
                        value={formData.guarantorEmail}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="guarantorRelationship">Relationship</Label>
                      <Input
                        id="guarantorRelationship"
                        name="guarantorRelationship"
                        required
                        value={formData.guarantorRelationship}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="guarantorContact">Contact Number</Label>
                      <Input
                        id="guarantorContact"
                        name="guarantorContact"
                        type="tel"
                        required
                        value={formData.guarantorContact}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Additional Charges</h4>
                  <div className="space-y-3" id="charges-list">
                    {charges.map((charge) => (
                      <div key={charge.id} className="flex justify-between">
                        <span className="text-sm text-gray-500">{charge.name}</span>
                        <span className="text-sm font-medium text-gray-900">Rs.{charge.amount}</span>
                      </div>
                    ))}
                    <div className="flex justify-between border-t pt-2 mt-2">
                      <span className="text-sm text-gray-500">Total Additional Charges</span>
                      <span className="text-sm font-medium text-gray-900">Rs.{getTotalCharges()}</span>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="link"
                    className="mt-4 px-0 text-primary hover:text-blue-700 flex items-center"
                    onClick={addExtraCharge}
                  >
                    <i className="fas fa-plus mr-2"></i>Add Extra Charges
                  </Button>
                </div>

                <div className="mt-6">
                  <Button type="submit" className="w-full group relative" disabled={loading}>
                    {loading ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        Submit Application{" "}
                        <span className="ml-1" title="Click to submit your loan application">
                          ⓘ
                        </span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
