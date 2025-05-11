"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function Sidebar({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (open: boolean) => void
}) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out",
        open ? "translate-x-0" : "-translate-x-full sm:translate-x-0",
      )}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        <Link href="/" className="font-bold text-xl text-primary">
          LoanManager
        </Link>
        <button onClick={() => setOpen(false)} className="sm:hidden text-gray-500 hover:text-gray-600">
          <i className="fas fa-times text-xl"></i>
        </button>
      </div>

      <nav className="p-4 space-y-1">
        <NavLink href="/" icon="fa-home" active={pathname === "/"}>
          Dashboard
        </NavLink>
        <NavLink href="/members" icon="fa-users" active={pathname.startsWith("/members")}>
          Members
        </NavLink>
        <NavLink href="/members/new" icon="fa-user-plus" active={pathname === "/members/new"}>
          New Member
        </NavLink>
        <NavLink href="/payments" icon="fa-money-bill-wave" active={pathname.startsWith("/payments")}>
          Payments
        </NavLink>
        <NavLink href="/settings" icon="fa-cog" active={pathname === "/settings"}>
          Settings
        </NavLink>
      </nav>
    </aside>
  )
}

function NavLink({
  href,
  icon,
  active,
  children,
}: {
  href: string
  icon: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center px-4 py-3 text-sm font-medium rounded-lg",
        active ? "text-primary bg-indigo-50" : "text-gray-700 hover:bg-gray-50",
      )}
    >
      <i className={`fas ${icon} w-5 h-5 mr-3`}></i>
      {children}
    </Link>
  )
}
