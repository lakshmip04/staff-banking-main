"use client"

import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function Header({
  sidebarOpen,
  setSidebarOpen,
  sessionTime,
  extendSession,
}: {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  sessionTime: string
  extendSession: () => void
}) {
  return (
    <header className={`h-16 flex items-center justify-between px-4 sm:px-6 bg-white border-b border-gray-200 fixed top-0 right-0 z-40 transition-all duration-300 ease-in-out ${sidebarOpen ? "sm:left-64" : "left-0"}`}>
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="sm:hidden text-gray-500 hover:text-gray-600">
        <i className="fas fa-bars text-xl"></i>
      </button>

      <div className="flex items-center space-x-4 w-full">
        <Alert className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-0 flex-1 text-left">
          <AlertDescription>Welcome Staff, You Are Logged In!</AlertDescription>
        </Alert>

        <button className="relative p-2">
          <i className="fas fa-bell text-gray-600"></i>
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center space-x-6">
          <div className="text-sm text-gray-600">
            Session expires in: <span className="font-medium">{sessionTime}</span>
          </div>
          <Button onClick={extendSession}>Extend Session</Button>
        </div>
      </div>
    </header>
  )
}
