"use client"

import { useState } from "react"
import { Layout } from "@/components/layout/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useMembers } from "@/hooks/use-members"

export default function MembersList() {
  const { members, loading, error } = useMembers()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMember, setSelectedMember] = useState(null)

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.memberID.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const showPersonalDetails = (member) => {
    setSelectedMember(member)
  }

  const fetchGuarantor = () => {
    document.getElementById("guarantorData").classList.remove("hidden")
  }

  return (
    <Layout>
      <div className="max-w-8xl mx-auto p-8 pt-24">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Member Management</h1>
          <div className="mt-4 flex">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search members..."
                className="w-full pl-10 pr-4 py-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>
            <Button className="ml-4">
              <i className="fas fa-filter mr-2"></i>Filter
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left bg-gray-50">
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Member ID</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Member Name
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center">
                        <div className="flex justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                        </div>
                      </td>
                    </tr>
                  ) : filteredMembers.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                        No members found
                      </td>
                    </tr>
                  ) : (
                    filteredMembers.map((member) => (
                      <tr key={member.memberID}>
                        <td className="px-6 py-4 whitespace-nowrap">{member.memberID}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{member.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {member.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Button
                            variant="link"
                            className="text-primary hover:text-blue-700 font-medium"
                            onClick={() => showPersonalDetails(member)}
                          >
                            Proceed
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing 1 to {filteredMembers.length} of {filteredMembers.length} entries
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" disabled>
                    Previous
                  </Button>
                  <Button variant="outline">Next</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {selectedMember && (
          <div className="mt-8">
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Details</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">Member Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <p className="mt-1 text-gray-900">{selectedMember.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Member ID</label>
                        <p className="mt-1 text-gray-900">{selectedMember.memberID}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Contact</label>
                        <p className="mt-1 text-gray-900">{selectedMember.contact}</p>
                      </div>
                    </div>
                    <Button asChild className="mt-6">
                      <Link href="/loans/new">Apply More Loan</Link>
                    </Button>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">Guarantor Information</h3>
                    <Button
                      variant="outline"
                      className="border-primary text-primary hover:bg-blue-50"
                      onClick={fetchGuarantor}
                    >
                      <i className="fas fa-sync-alt mr-2"></i>Fetch Guarantor Data
                    </Button>
                    <div id="guarantorData" className="hidden mt-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Guarantor Name</label>
                        <p className="mt-1 text-gray-900">{selectedMember.guarantor.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Relationship</label>
                        <p className="mt-1 text-gray-900">{selectedMember.guarantor.relationship}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Contact</label>
                        <p className="mt-1 text-gray-900">{selectedMember.guarantor.contact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Loan History</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left bg-gray-50">
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Loan ID
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Next Payment
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedMember.loans.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                            No loans found for this member
                          </td>
                        </tr>
                      ) : (
                        selectedMember.loans.map((loan) => (
                          <tr key={loan.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{loan.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{loan.type}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{loan.amount}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {loan.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{loan.nextPayment}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  )
}
