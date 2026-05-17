import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { Icon } from "@/components/dashboard/LmsPrimitives"
import { pageMetaByKey, type LmsRole } from "@/data/navItems"

type TopbarProps = {
  pageKey: string
  role: LmsRole
  onMenuOpen: () => void
}

export function Topbar({ pageKey, role, onMenuOpen }: TopbarProps) {
  const [time, setTime] = useState("")

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

  const placeholder =
    role === "student"
      ? "Kurs, dars yoki Q&A bo'yicha qidiring"
      : role === "teacher"
        ? "Kurs, tinglovchi yoki topshiriqni qidiring"
        : "Foydalanuvchi, kurs yoki log qidiring"

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
          <input
            className="tb-search min-w-0"
            placeholder={placeholder}
          />
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
      </div>
    </header>
  )
}