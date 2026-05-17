import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { Icon } from "@/components/dashboard/LmsPrimitives"
import { useAuth } from "@/hooks/useAuth"
import { pageMetaByKey, type LmsRole } from "@/data/navItems"
import type { UserRole } from "@/types/auth"

type TopbarProps = {
  pageKey: string
  role: LmsRole
  onMenuOpen: () => void
}

const ROLE_LABELS: Record<UserRole, string> = {
  student: "Tinglovchi",
  teacher: "Trener",
  admin: "Admin",
  super_admin: "Super Admin",
}

const ROLE_COLORS: Record<UserRole, string> = {
  student: "bg-sky-500/15 text-sky-300 border-sky-500/25",
  teacher: "bg-violet-500/15 text-violet-300 border-violet-500/25",
  admin: "bg-amber-500/15 text-amber-300 border-amber-500/25",
  super_admin: "bg-red-500/15 text-red-300 border-red-500/25",
}

export function Topbar({ pageKey, role, onMenuOpen }: TopbarProps) {
  const [time, setTime] = useState("")
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const meta = pageMetaByKey[pageKey] ?? {
    crumb: "AIRI LMS",
    title: "Bosh sahifa",
  }

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const date = now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      const clock = now.toLocaleTimeString("uz-UZ", {
        hour: "2-digit",
        minute: "2-digit",
      })
      setTime(`${date} · ${clock}`)
    }
    tick()
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    if (userMenuOpen) document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [userMenuOpen])

  function handleLogout() {
    setUserMenuOpen(false)
    logout()
    navigate("/login")
  }

  const placeholder =
    role === "student"
      ? "Kurs, dars yoki Q&A bo'yicha qidiring"
      : role === "teacher"
        ? "Kurs, tinglovchi yoki topshiriqni qidiring"
        : "Foydalanuvchi, kurs yoki log qidiring"

  const userRole = user?.role ?? role
  const roleLabel = ROLE_LABELS[userRole] ?? "Foydalanuvchi"
  const roleColor = ROLE_COLORS[userRole] ?? ROLE_COLORS.student

  return (
    <header className="topbar flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          className="tb-hamburger shrink-0"
          onClick={onMenuOpen}
          aria-label="Menyu ochish"
        >
          <Icon name="menu-2" />
        </button>

        <div className="tb-left min-w-0 flex-1">
          <span className="tb-crumb truncate">{meta.crumb}</span>
          <h1 className="tb-title truncate">{meta.title}</h1>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2 md:hidden">
          <Link className="tb-icon" title="Landing" to="/">
            <Icon name="home" />
          </Link>
          <div className="tb-icon" title="Bildirishnomalar">
            <Icon name="bell" />
            <span className="dot" />
          </div>
        </div>
      </div>

      <div className="tb-right flex w-full min-w-0 items-center gap-2 md:w-auto md:justify-end">
        <div className="tb-search-wrap min-w-0 flex-1 md:flex-none">
          <Icon name="search" />
          <input className="tb-search min-w-0" placeholder={placeholder} />
        </div>

        <span className="kbd hidden lg:inline-flex">Ctrl K</span>

        <Link className="tb-icon hidden md:inline-flex" title="Landing" to="/">
          <Icon name="home" />
        </Link>

        <div className="tb-icon hidden md:inline-flex" title="Bildirishnomalar">
          <Icon name="bell" />
          <span className="dot" />
        </div>

        <div className="tb-icon hidden md:inline-flex" title="Yordam">
          <Icon name="help" />
        </div>

        <span className="kbd mono hidden xl:inline-flex" style={{ marginLeft: 4 }}>
          {time}
        </span>

        {/* User section */}
        {user && (
          <div className="relative ml-1 hidden md:block" ref={menuRef}>
            <button
              type="button"
              onClick={() => setUserMenuOpen((v) => !v)}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/4 px-3 py-1.5 transition-all hover:border-white/20 hover:bg-white/8"
            >
              <div
                className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-linear-to-br from-sky-500/40 to-blue-600/40 text-[10px] font-bold text-sky-200"
                aria-hidden
              >
                {user.initials}
              </div>
              <span className="max-w-[7rem] truncate text-xs font-medium text-white/80">
                {user.fullName}
              </span>
              <span
                className={`rounded-md border px-1.5 py-0.5 text-[10px] font-bold tracking-wide ${roleColor}`}
              >
                {roleLabel}
              </span>
              <Icon name="chevron-down" style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }} />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-white/10 bg-[#0d1a35] shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl">
                <div className="border-b border-white/8 px-4 py-3">
                  <p className="text-xs font-semibold text-white">{user.fullName}</p>
                  <p className="mt-0.5 text-[11px] text-white/45">{user.email}</p>
                  <p className="mt-0.5 text-[11px] text-white/45">{user.title}</p>
                </div>
                <div className="p-1.5">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm text-red-400 transition-colors hover:bg-red-500/10"
                  >
                    <Icon name="logout" style={{ fontSize: 16 }} />
                    Chiqish
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
