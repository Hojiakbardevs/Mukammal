import { useMemo } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"

import { AIChatWidget } from "@/components/dashboard/AIChatWidget"
import { Sidebar } from "@/components/dashboard/Sidebar"
import { Topbar } from "@/components/dashboard/Topbar"
import { getPageKeyFromPath, getRoleFromPath, pagePathByKey } from "@/data/navItems"

export type LmsOutletContext = {
  pageKey: string
  setPage: (pageKey: string) => void
}

export function DashboardLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const role = getRoleFromPath(pathname)
  const pageKey = getPageKeyFromPath(pathname)
  const context = useMemo<LmsOutletContext>(
    () => ({
      pageKey,
      setPage: (nextPageKey: string) => {
        navigate(pagePathByKey[nextPageKey] ?? pagePathByKey[pageKey] ?? "/app")
      },
    }),
    [navigate, pageKey]
  )

  return (
    <div className="app">
      <Sidebar role={role} pageKey={pageKey} />
      <main className="main">
        <Topbar pageKey={pageKey} role={role} />
        <div className="content page-fade" key={pageKey}>
          <Outlet context={context} />
        </div>
      </main>
      <AIChatWidget key={role} role={role} />
    </div>
  )
}
