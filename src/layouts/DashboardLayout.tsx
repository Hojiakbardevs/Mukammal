import { useLayoutEffect, useMemo } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"

import { AIChatWidget } from "@/components/dashboard/AIChatWidget"
import { Sidebar } from "@/components/dashboard/Sidebar"
import { Topbar } from "@/components/dashboard/Topbar"
import { getPageKeyFromPath, getRoleFromPath, pagePathByKey } from "@/data/navItems"

function ensureLink(id: string, href: string, rel = "stylesheet") {
  if (document.getElementById(id)) return

  const link = document.createElement("link")
  link.id = id
  link.rel = rel
  link.href = href
  if (href.includes("fonts.gstatic.com")) link.crossOrigin = "anonymous"
  document.head.appendChild(link)
}

function useDashboardAssets() {
  useLayoutEffect(() => {
    ensureLink("airi-lms-font-preconnect", "https://fonts.googleapis.com", "preconnect")
    ensureLink("airi-lms-font-gstatic", "https://fonts.gstatic.com", "preconnect")
    ensureLink(
      "airi-lms-fonts",
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Chakra+Petch:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
    )
    ensureLink("airi-lms-tabler-icons", "https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css")
    ensureLink("airi-lms-styles", "/lms-dashboard/styles.css")

    return () => {
      document.getElementById("airi-lms-styles")?.remove()
    }
  }, [])
}

export type LmsOutletContext = {
  pageKey: string
  setPage: (pageKey: string) => void
}

export function DashboardLayout() {
  useDashboardAssets()

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
