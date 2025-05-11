"use client"

import { useState, useEffect } from "react"
import { Layout } from "@/components/layout/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function Dashboard() {
  const [stats, setStats] = useState({
    activeLoans: 0,
    todaysPayments: 0,
    pendingApplications: 0,
    duePayments: 0,
  })
  const [activities, setActivities] = useState([])
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setStats({
        activeLoans: 2451,
        todaysPayments: 12675,
        pendingApplications: 18,
        duePayments: 124,
      })

      setActivities([
        {
          id: 1,
          type: "payment",
          title: "Payment Received",
          description: "Rs.2,500 from John Smith",
          time: "2 minutes ago",
          icon: "fa-check",
          iconBg: "bg-green-100",
          iconColor: "text-green-600",
        },
        {
          id: 2,
          type: "member",
          title: "New Member Added",
          description: "Sarah Johnson registered",
          time: "15 minutes ago",
          icon: "fa-user-plus",
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
        },
        {
          id: 3,
          type: "loan",
          title: "Loan Application",
          description: "New application from Michael Brown",
          time: "1 hour ago",
          icon: "fa-file-alt",
          iconBg: "bg-yellow-100",
          iconColor: "text-yellow-600",
        },
      ])

      setPayments([
        {
          id: 1,
          date: "2024-02-20",
          member: "John Smith",
          loanId: "L-2024-001",
          amount: "Rs.2,500",
          status: "Completed",
        },
        {
          id: 2,
          date: "2024-02-20",
          member: "Sarah Johnson",
          loanId: "L-2024-002",
          amount: "Rs.1,800",
          status: "Pending",
        },
      ])

      setLoading(false)

      toast({
        title: "Welcome Staff",
        description: "You are logged in successfully!",
        variant: "default",
      })
    }, 1000)
  }, [toast])

  return (
    <Layout>
      <div className="pt-6 px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Active Loans"
            value={stats.activeLoans.toLocaleString()}
            icon="fa-file-invoice-dollar"
            iconBg="bg-indigo-50"
            iconColor="text-primary"
          />
          <StatCard
            title="Today's Payments"
            value={`Rs.${stats.todaysPayments.toLocaleString()}`}
            icon="fa-money-bill-wave"
            iconBg="bg-green-50"
            iconColor="text-green-600"
          />
          <StatCard
            title="Pending Applications"
            value={stats.pendingApplications.toLocaleString()}
            icon="fa-clock"
            iconBg="bg-yellow-50"
            iconColor="text-yellow-600"
          />
          <StatCard
            title="Due Payments"
            value={stats.duePayments.toLocaleString()}
            icon="fa-exclamation-circle"
            iconBg="bg-red-50"
            iconColor="text-red-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <Button asChild className="flex items-center justify-center">
                  <Link href="/members/new">
                    <i className="fas fa-user-plus mr-2"></i>
                    New Member
                  </Link>
                </Button>
                <Button asChild className="flex items-center justify-center">
                  <Link href="/members">
                    <i className="fas fa-file-alt mr-2"></i>
                    New Loan
                  </Link>
                </Button>
                <Button asChild className="flex items-center justify-center">
                  <Link href="/payments/new">
                    <i className="fas fa-money-check-alt mr-2"></i>
                    Record Payment
                  </Link>
                </Button>
                <Button asChild className="flex items-center justify-center">
                  <Link href="/search">
                    <i className="fas fa-search mr-2"></i>
                    Search Members
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start">
                    <div className="flex-shrink-0">
                      <span
                        className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${activity.iconBg}`}
                      >
                        <i className={`fas ${activity.icon} ${activity.iconColor}`}></i>
                      </span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Payments</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Member
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Loan ID
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.member}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.loanId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            payment.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

function StatCard({ title, value, icon, iconBg, iconColor }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center">
          <div className={`p-3 rounded-lg ${iconBg}`}>
            <i className={`fas ${icon} ${iconColor}`}></i>
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
