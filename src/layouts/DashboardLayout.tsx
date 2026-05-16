import React, { useEffect, useMemo, useState } from "react"
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"

import {
  adminNav,
  getPageKeyFromPath,
  getRoleFromPath,
  pageMetaByKey,
  pagePathByKey,
  studentNav,
  teacherNav,
  type LmsNavEntry,
  type LmsRole,
} from "@/components/dashboard/lmsRouteMap"

const lmsScripts = [
  "data.js",
  "student-data.js",
  "shared.js",
  "student-1.js",
  "student-2.js",
  "student-3.js",
  "teacher-1.js",
  "teacher-2.js",
  "admin-1.js",
  "admin-certs.js",
  "admin-surveys.js",
  "admin-ai-gov.js",
  "admin-audit-mod.js",
  "chatbot.js",
]

const roleUsers = {
  student: { name: "Aziza Mahmudova", title: "NLP-26 · Level 4", init: "AM" },
  teacher: { name: "Aziza Tursunova", title: "Lead Trainer · ML Track", init: "AT" },
  admin: { name: "Rustam Abdullaev", title: "Super Admin · AIRI", init: "RA" },
} satisfies Record<LmsRole, { name: string; title: string; init: string }>

type LegacyWindow = Window & {
  React?: typeof React
  __AIRI_LMS_ASSETS_LOADED__?: boolean
  ChatbotFab?: React.ComponentType<{ role: LmsRole }>
}

function ensureLink(id: string, href: string, rel = "stylesheet") {
  if (document.getElementById(id)) return
  const link = document.createElement("link")
  link.id = id
  link.rel = rel
  link.href = href
  if (href.includes("fonts.gstatic.com")) link.crossOrigin = "anonymous"
  document.head.appendChild(link)
}

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[data-airi-lms="${src}"]`)
    if (existing?.dataset.loaded === "true") {
      resolve()
      return
    }

    const script = existing ?? document.createElement("script")
    script.dataset.airiLms = src
    script.src = src
    script.async = false
    script.onload = () => {
      script.dataset.loaded = "true"
      resolve()
    }
    script.onerror = () => reject(new Error(`Failed to load ${src}`))

    if (!existing) document.body.appendChild(script)
  })
}

function useLmsAssets() {
  const [isReady, setIsReady] = useState(() => Boolean((window as LegacyWindow).__AIRI_LMS_ASSETS_LOADED__))

  useEffect(() => {
    let cancelled = false

    async function loadAssets() {
      const legacyWindow = window as LegacyWindow
      legacyWindow.React = React

      ensureLink("airi-lms-font-preconnect", "https://fonts.googleapis.com", "preconnect")
      ensureLink("airi-lms-font-gstatic", "https://fonts.gstatic.com", "preconnect")
      ensureLink(
        "airi-lms-fonts",
        "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Chakra+Petch:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
      )
      ensureLink(
        "airi-lms-tabler-icons",
        "https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      )
      ensureLink("airi-lms-styles", "/lms-dashboard/styles.css")

      if (!legacyWindow.__AIRI_LMS_ASSETS_LOADED__) {
        for (const script of lmsScripts) {
          await loadScript(`/lms-dashboard/${script}`)
        }
        legacyWindow.__AIRI_LMS_ASSETS_LOADED__ = true
      }

      if (!cancelled) setIsReady(true)
    }

    loadAssets().catch(() => {
      if (!cancelled) setIsReady(false)
    })

    return () => {
      cancelled = true
    }
  }, [])

  return isReady
}

function Icon({ name }: { name: string }) {
  return <i className={`ti ti-${name}`} />
}

function navForRole(role: LmsRole) {
  if (role === "admin") return adminNav
  if (role === "teacher") return teacherNav
  return studentNav
}

function RoleSwitcher({ role }: { role: LmsRole }) {
  return (
    <div className="sb-role-switch">
      <NavLink to="/app" className={`sb-role-btn ${role === "student" ? "active" : ""}`}>
        <Icon name="school" /> Talaba
      </NavLink>
      <NavLink to="/teacher" className={`sb-role-btn ${role === "teacher" ? "active" : ""}`}>
        <Icon name="chalkboard" /> Teacher
      </NavLink>
      <NavLink to="/admin" className={`sb-role-btn ${role === "admin" ? "active" : ""}`}>
        <Icon name="shield-half" /> Admin
      </NavLink>
    </div>
  )
}

function Sidebar({ role, pageKey }: { role: LmsRole; pageKey: string }) {
  const user = roleUsers[role]
  const nav = navForRole(role)

  return (
    <aside className="sb">
      <div className="sb-brand">
        <div className="sb-logo">AI</div>
        <div>
          <span className="sb-brand-name">AIRI Training</span>
          <div className="sb-brand-sub">{role === "student" ? "Learn · Grow" : "Learning Operations"}</div>
        </div>
      </div>

      <RoleSwitcher role={role} />

      <nav className="sb-nav">
        {nav.map((item, index) => {
          if ("section" in item) {
            return (
              <div key={`${item.section}-${index}`} className="sb-section">
                {item.section}
              </div>
            )
          }

          return <SidebarItem key={item.pageKey} item={item} active={pageKey === item.pageKey} />
        })}
      </nav>

      <div className="sb-foot">
        <div className="sb-foot-avatar">{user.init}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="sb-foot-name">{user.name}</div>
          <div className="sb-foot-sub">{user.title}</div>
        </div>
        <i className="ti ti-chevron-up-down" style={{ color: "rgba(255,255,255,0.4)", fontSize: 16 }} />
      </div>
    </aside>
  )
}

function SidebarItem({ item, active }: { item: Extract<LmsNavEntry, { pageKey: string }>; active: boolean }) {
  return (
    <NavLink className={`sb-item ${active ? "active" : ""}`} to={item.href}>
      <Icon name={item.icon} />
      <span>{item.label}</span>
      {item.badge ? (
        <span className={`sb-badge ${item.badge.kind === "amber" ? "b-amber" : item.badge.kind === "mute" ? "b-mute" : ""}`}>
          {item.badge.text}
        </span>
      ) : null}
    </NavLink>
  )
}

function Topbar({ pageKey, role }: { pageKey: string; role: LmsRole }) {
  const [time, setTime] = useState("")
  const meta = pageMetaByKey[pageKey] ?? { crumb: "AIRI LMS", title: "Dashboard" }

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(
        `${now.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })} · ${now.toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" })}`
      )
    }
    tick()
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [])

  const placeholder =
    role === "student"
      ? "Kurs, dars yoki Q&A bo'yicha qidiring..."
      : role === "teacher"
        ? "Kurs, talaba yoki topshiriqni qidiring..."
        : "Foydalanuvchi, kurs yoki log..."

  return (
    <header className="topbar">
      <div className="tb-left">
        <span className="tb-crumb">{meta.crumb}</span>
        <h1 className="tb-title">{meta.title}</h1>
      </div>
      <div className="tb-right">
        <div className="tb-search-wrap">
          <Icon name="search" />
          <input className="tb-search" placeholder={placeholder} />
        </div>
        <span className="kbd">Ctrl K</span>
        <Link className="tb-icon" title="Landing" to="/">
          <Icon name="home" />
        </Link>
        <div className="tb-icon" title="Bildirishnomalar">
          <Icon name="bell" />
          <span className="dot" />
        </div>
        <div className="tb-icon" title="Yordam">
          <Icon name="help" />
        </div>
        <span className="kbd mono" style={{ marginLeft: 4 }}>
          {time}
        </span>
      </div>
    </header>
  )
}

export function DashboardLayout() {
  const isReady = useLmsAssets()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const role = getRoleFromPath(pathname)
  const pageKey = getPageKeyFromPath(pathname)
  const Chatbot = (window as LegacyWindow).ChatbotFab

  const context = useMemo(
    () => ({
      isReady,
      pageKey,
      setPage: (nextPageKey: string) => {
        navigate(pagePathByKey[nextPageKey] ?? pagePathByKey[pageKey] ?? "/app")
      },
    }),
    [isReady, navigate, pageKey]
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
      {isReady && Chatbot ? <Chatbot role={role} /> : null}
    </div>
  )
}
