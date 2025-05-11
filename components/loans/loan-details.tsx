"use client"

import { useState, useEffect } from "react"
import { Layout } from "@/components/layout/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function LoanDetails({ loanId }: { loanId: string }) {
  const [loanDetails, setLoanDetails] = useState({
    startDate: "January 15, 2024",
    loanType: "Personal Loan",
    loanAmount: "Rs.10,000.00",
    returnAmount: "Rs.11,200.00",
    dailyIST: "Rs.1.50",
    arrears: "Rs.150.00",
    totalFine: "Rs.25.00",
    paymentsMade: "3",
    istCollected: "Rs.45.00",
    fineCollected: "Rs.25.00",
    outstandingAmount: "Rs.9,130.00",
  })

  const [paymentHistory, setPaymentHistory] = useState([
    {
      id: 1,
      date: "Jan 22, 2024",
      amount: "Rs.300.00",
      account: "A",
      receiptId: "#12345",
      fine: "Rs.10.00",
      balance: "Rs.9,700.00",
    },
    {
      id: 2,
      date: "Jan 29, 2024",
      amount: "Rs.270.00",
      account: "B",
      receiptId: "#12346",
      fine: "Rs.8.00",
      balance: "Rs.9,430.00",
    },
  ])

  const [newPayment, setNewPayment] = useState({
    paymentDate: new Date().toISOString().split("T")[0],
    fineAmount: "",
    account: "",
    receiptId: "",
    discount: "",
    paymentAmount: "",
  })

  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate API call to fetch loan details
    setLoading(true)
    setTimeout(() => {
      // In a real app, you would fetch data based on loanId
      setLoading(false)
    }, 1000)
  }, [loanId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewPayment((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value) => {
    setNewPayment((prev) => ({ ...prev, account: value }))
  }

  const handleSubmitPayment = async () => {
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Success",
        description: "Payment recorded successfully!",
        variant: "default",
      })

      // Reset form
      setNewPayment({
        paymentDate: new Date().toISOString().split("T")[0],
        fineAmount: "",
        account: "",
        receiptId: "",
        discount: "",
        paymentAmount: "",
      })

      // In a real app, you would refresh the payment history
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <main className="max-w-8xl mx-auto py-10 px-4 sm:px-6 lg:px-8 pt-24">
        <Card className="mb-8">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Loan Details</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Loan Start Date</div>
                <div className="font-semibold">{loanDetails.startDate}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Loan Type</div>
                <div className="font-semibold">{loanDetails.loanType}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Loan Amount</div>
                <div className="font-semibold">{loanDetails.loanAmount}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Loan Return Amount</div>
                <div className="font-semibold">{loanDetails.returnAmount}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Daily IST</div>
                <div className="font-semibold">{loanDetails.dailyIST}</div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-lg font-semibold mb-4">First Week Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Arrears</div>
                  <div className="font-semibold">{loanDetails.arrears}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Total Fine</div>
                  <div className="font-semibold">{loanDetails.totalFine}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Payments Made</div>
                <div className="font-semibold">{loanDetails.paymentsMade}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">IST Collected</div>
                <div className="font-semibold">{loanDetails.istCollected}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Fine Collected</div>
                <div className="font-semibold">{loanDetails.fineCollected}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg col-span-full">
                <div className="text-sm text-gray-500">Outstanding Loan Amount</div>
                <div className="font-semibold text-primary">{loanDetails.outstandingAmount}</div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Payment History</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Account
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Receipt ID
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fine
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Balance
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paymentHistory.map((payment) => (
                      <tr key={payment.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.account}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.receiptId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.fine}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.balance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-6">New Payment</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="paymentDate">Payment Date</Label>
                    <Input
                      id="paymentDate"
                      name="paymentDate"
                      type="date"
                      value={newPayment.paymentDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fineAmount">Fine Amount</Label>
                    <Input
                      id="fineAmount"
                      name="fineAmount"
                      placeholder="Rs.0.00"
                      value={newPayment.fineAmount}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="account">Account</Label>
                    <Select value={newPayment.account} onValueChange={handleSelectChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select account" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">Account A</SelectItem>
                        <SelectItem value="B">Account B</SelectItem>
                        <SelectItem value="C">Account C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="receiptId">Receipt ID</Label>
                    <Input
                      id="receiptId"
                      name="receiptId"
                      placeholder="Enter receipt ID"
                      value={newPayment.receiptId}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="discount">Discount</Label>
                    <Input
                      id="discount"
                      name="discount"
                      placeholder="Rs.0.00"
                      value={newPayment.discount}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="paymentAmount">Payment Amount</Label>
                    <Input
                      id="paymentAmount"
                      name="paymentAmount"
                      placeholder="Enter amount"
                      value={newPayment.paymentAmount}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    variant="outline"
                    className="border-primary text-primary"
                    onClick={handleSubmitPayment}
                    disabled={loading}
                  >
                    Submit Payment
                  </Button>
                  <Button onClick={handleSubmitPayment} disabled={loading}>
                    {loading ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Processing...
                      </>
                    ) : (
                      "Confirm Transaction"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </Layout>
  )
}
