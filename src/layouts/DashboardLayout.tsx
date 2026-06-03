import { useEffect, useMemo, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"

import { AIChatWidget } from "@/components/dashboard/AIChatWidget"
import { Sidebar } from "@/components/dashboard/Sidebar"
import { Topbar } from "@/components/dashboard/Topbar"
import { getPageKeyFromPath, getRoleFromPath, pagePathByKey } from "@/data/navItems"
import { useAuth } from "@/hooks/useAuth"

export type LmsOutletContext = {
  pageKey: string
  setPage: (pageKey: string) => void
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mql = window.matchMedia(query)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mql.addEventListener("change", handler)
    return () => mql.removeEventListener("change", handler)
  }, [query])
  return matches
}

export function DashboardLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const role = user?.role ?? getRoleFromPath(pathname)
  const pageKey = getPageKeyFromPath(pathname)

  const isMobile = useMediaQuery("(max-width: 767px)")
  const isCompact = useMediaQuery("(min-width: 768px) and (max-width: 1099px)")

  const [manualCollapsed, setManualCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Compact screens (tablet/small laptop) auto-collapse; desktop respects manual toggle
  const collapsed = !isMobile && (isCompact || manualCollapsed)

  // Close mobile drawer on navigation
  useEffect(() => { setMobileOpen(false) }, [pathname])

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
      <Sidebar
        role={role}
        collapsed={collapsed}
        onToggle={() => setManualCollapsed(c => !c)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <main className="main">
        <Topbar pageKey={pageKey} role={role} onMenuOpen={() => setMobileOpen(true)} />
        <div className="content page-fade" key={pageKey}>
          <Outlet context={context} />
        </div>
      </main>
      <AIChatWidget key={role} role={role} />
    </div>
  )
}
