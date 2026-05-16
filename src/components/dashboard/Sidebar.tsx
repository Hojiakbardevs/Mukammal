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
        {navItems.map((item) => {
          const Icon = item.icon
          const end = item.href === "/app" || item.href === "/teacher" || item.href === "/admin"

          return (
            <NavLink
              key={item.href}
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
              {item.label}
            </NavLink>
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
