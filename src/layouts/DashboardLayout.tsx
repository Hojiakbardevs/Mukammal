import { Outlet } from "react-router-dom"

import { AIChatWidget } from "@/components/dashboard/AIChatWidget"
import { Sidebar } from "@/components/dashboard/Sidebar"
import { Topbar } from "@/components/dashboard/Topbar"

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Sidebar />

      <div className="min-h-screen lg:pl-72">
        <Topbar />
        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>

      <AIChatWidget />
    </div>
  )
}
