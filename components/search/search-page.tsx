"use client"

import { useState, useEffect } from "react"
import { Layout } from "@/components/layout/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(true)
  const [pageSize, setPageSize] = useState("10")

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoans([
        {
          id: 1,
          date: "2024-02-20",
          loanNumber: "L-2024-001",
          memberName: "John Smith",
        },
        {
          id: 2,
          date: "2024-02-19",
          loanNumber: "L-2024-002",
          memberName: "Sarah Johnson",
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredLoans = loans.filter((loan) => {
    const matchesSearch =
      loan.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.loanNumber.toLowerCase().includes(searchTerm.toLowerCase())

    if (filter === "today") {
      return matchesSearch && loan.date === new Date().toISOString().split("T")[0]
    } else if (filter === "pending") {
      // In a real app, you would have a status field to filter by
      return matchesSearch
    }

    return matchesSearch
  })

  const handleQuickPay = (loanId) => {
    // Show loading overlay
    document.getElementById("loading-overlay").classList.remove("hidden")

    // Simulate payment processing
    setTimeout(() => {
      document.getElementById("loading-overlay").classList.add("hidden")
      alert(`Payment processed for loan ${loanId}`)
    }, 1500)
  }

  return (
    <Layout>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-900">Payment Search</h1>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search members..."
                    className="w-96 pl-10 pr-4 py-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-search text-gray-400"></i>
                  </div>
                </div>
              </div>

              <RadioGroup value={filter} onValueChange={setFilter} className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="today" id="today" />
                  <Label htmlFor="today">Today</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pending" id="pending" />
                  <Label htmlFor="pending">Pending</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all">All</Label>
                </div>
              </RadioGroup>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date <i className="fas fa-sort ml-1"></i>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Loan Number
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Member Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loading ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-4 text-center">
                          <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                          </div>
                        </td>
                      </tr>
                    ) : filteredLoans.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                          No loans found
                        </td>
                      </tr>
                    ) : (
                      filteredLoans.map((loan) => (
                        <tr key={loan.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{loan.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-primary hover:underline">
                            <Link href={`/loans/${loan.loanNumber}`}>{loan.loanNumber}</Link>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{loan.memberName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <Button
                              className="bg-green-500 hover:bg-red-500 text-white transition-colors duration-200"
                              onClick={() => handleQuickPay(loan.loanNumber)}
                            >
                              Quick Pay
                            </Button>
                            <Button asChild className="bg-blue-500 hover:bg-blue-600 text-white ml-2">
                              <Link href={`/loans/${loan.loanNumber}`}>Loan Details</Link>
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <Select value={pageSize} onValueChange={setPageSize}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="10 per page" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 per page</SelectItem>
                      <SelectItem value="25">25 per page</SelectItem>
                      <SelectItem value="50">50 per page</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" disabled>
                    Previous
                  </Button>
                  <Button>Next</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div
        id="loading-overlay"
        className="hidden fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
      >
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    </Layout>
  )
}
