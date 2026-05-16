import { GraduationCap, ShieldCheck, UserRoundCog } from "lucide-react"
import { useNavigate } from "react-router-dom"

import type { UserRole } from "@/data/navItems"

type RoleSwitcherProps = {
  role: UserRole
}

const roles = [
  {
    role: "student",
    label: "Talaba",
    href: "/app",
    icon: GraduationCap,
  },
  {
    role: "teacher",
    label: "Teacher",
    href: "/teacher",
    icon: UserRoundCog,
  },
  {
    role: "admin",
    label: "Admin",
    href: "/admin",
    icon: ShieldCheck,
  },
] satisfies Array<{
  role: UserRole
  label: string
  href: string
  icon: typeof GraduationCap
}>

export function RoleSwitcher({ role }: RoleSwitcherProps) {
  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-3 gap-1 rounded-lg bg-white/8 p-1">
      {roles.map((item) => {
        const Icon = item.icon

        return (
          <button
            key={item.role}
            type="button"
            onClick={() => navigate(item.href)}
            className={[
              "flex h-9 items-center justify-center gap-1.5 rounded-md text-xs font-semibold transition",
              role === item.role
                ? "bg-cyan-400 text-slate-950"
                : "text-slate-300 hover:bg-white/10 hover:text-white",
            ].join(" ")}
          >
            <Icon className="h-3.5 w-3.5" />
            <span>{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}
