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
  const meta = pageMetaByKey[pageKey] ?? { crumb: "AIRI LMS", title: "Bosh sahifa" }

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
    <header className="topbar">
      <button className="tb-hamburger" onClick={onMenuOpen} aria-label="Menyu ochish">
        <Icon name="menu-2" />
      </button>
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
