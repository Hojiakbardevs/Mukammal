import { NavLink } from "react-router-dom"

import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants"
import { RoleSwitcher } from "@/components/dashboard/RoleSwitcher"
import {
  adminNavItems,
  studentNavItems,
  teacherNavItems,
} from "@/data/navItems"
import { useAuth } from "@/hooks/useAuth"
import { useRole } from "@/hooks/useRole"

export function Sidebar() {
  const role = useRole()
  const { user } = useAuth()
  const navItems =
    role === "admin"
      ? adminNavItems
      : role === "teacher"
        ? teacherNavItems
        : studentNavItems

  return (
    <aside className="fixed top-0 left-0 z-40 hidden h-screen w-72 border-r border-white/10 bg-[#071126] text-white lg:block">
      <div className="border-b border-white/10 p-6">
        <div className="text-lg font-bold">{APP_NAME}</div>
        <div className="mt-1 text-xs text-slate-400">{APP_DESCRIPTION}</div>
      </div>

      <div className="border-b border-white/10 p-4">
        <RoleSwitcher role={role} />
      </div>

      <nav className="space-y-1 p-4">
        {navItems.map((item, index) => {
          const Icon = item.icon
          const end = item.href === "/app" || item.href === "/teacher" || item.href === "/admin"
          const previous = navItems[index - 1]
          const showSection = item.section && item.section !== previous?.section

          return (
            <div key={item.href}>
              {showSection ? (
                <div className="px-4 pt-4 pb-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                  {item.section}
                </div>
              ) : null}
              <NavLink
                to={item.href}
                end={end}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition",
                    isActive
                      ? "bg-cyan-400 text-slate-950"
                      : "text-slate-300 hover:bg-white/10 hover:text-white",
                  ].join(" ")
                }
              >
                <Icon className="h-5 w-5" />
                <span className="min-w-0 flex-1 truncate">{item.label}</span>
                {item.badge ? (
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-bold text-cyan-100">
                    {item.badge}
                  </span>
                ) : null}
              </NavLink>
            </div>
          )
        })}
      </nav>

      <div className="absolute right-4 bottom-4 left-4 rounded-lg border border-white/10 bg-white/6 p-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-400 font-bold text-slate-950">
            {user.initials}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{user.name}</div>
            <div className="truncate text-xs text-slate-400">{user.title}</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
