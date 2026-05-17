import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { Icon } from "@/components/dashboard/LmsPrimitives"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
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
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 px-3 py-3 backdrop-blur-xl",
        "md:px-5 md:py-4"
      )}
    >
      <div className="flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Left side */}
        <div className="flex min-w-0 items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onMenuOpen}
            aria-label="Menyu ochish"
            className="h-10 w-10 shrink-0 rounded-2xl border-slate-200 bg-white/80 shadow-sm md:h-11 md:w-11"
          >
            <Icon name="menu-2" />
          </Button>

          <div className="min-w-0 flex-1">
            <span className="block truncate text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-xs">
              {meta.crumb}
            </span>

            <h1 className="truncate text-lg font-bold leading-tight text-slate-950 sm:text-xl md:text-2xl">
              {meta.title}
            </h1>
          </div>

          {/* Mobile actions */}
          <div className="ml-auto flex shrink-0 items-center gap-2 md:hidden">
            <Button
              asChild
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-2xl border-slate-200 bg-white/80 shadow-sm"
            >
              <Link title="Landing" to="/">
                <Icon name="home" />
              </Link>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              title="Bildirishnomalar"
              className="relative h-10 w-10 rounded-2xl border-slate-200 bg-white/80 shadow-sm"
            >
              <Icon name="bell" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
            </Button>
          </div>
        </div>

        {/* Right side */}
        <div className="flex min-w-0 items-center gap-2 md:justify-end">
          <div className="relative w-full md:w-[320px] lg:w-95">
            <div className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-slate-400">
              <Icon name="search" />
            </div>

            <Input
              type="search"
              placeholder={placeholder}
              className={cn(
                "h-11 rounded-2xl border-slate-200 bg-slate-50/80 pl-10 pr-4 text-sm shadow-none",
                "placeholder:text-slate-400",
                "focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:ring-offset-0"
              )}
            />
          </div>

          <span className="hidden h-9 items-center rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-500 lg:inline-flex">
            Ctrl K
          </span>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 md:flex">
            <Button
              asChild
              variant="outline"
              size="icon"
              className="h-11 w-11 rounded-2xl border-slate-200 bg-white/80 shadow-sm"
            >
              <Link title="Landing" to="/">
                <Icon name="home" />
              </Link>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              title="Bildirishnomalar"
              className="relative h-11 w-11 rounded-2xl border-slate-200 bg-white/80 shadow-sm"
            >
              <Icon name="bell" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              title="Yordam"
              className="h-11 w-11 rounded-2xl border-slate-200 bg-white/80 shadow-sm"
            >
              <Icon name="help" />
            </Button>

            <span className="hidden h-9 items-center rounded-xl border border-slate-200 bg-slate-50 px-3 font-mono text-xs font-semibold text-slate-500 xl:inline-flex">
              {time}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}