import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"

type BadgeProps = {
  children: ReactNode
  tone?: "slate" | "cyan" | "blue" | "emerald" | "amber" | "rose" | "violet"
  icon?: LucideIcon
  dot?: boolean
}

type ChipProps = BadgeProps & {
  active?: boolean
  onClick?: () => void
}

const tones: Record<NonNullable<BadgeProps["tone"]>, string> = {
  slate: "bg-slate-100 text-slate-700 ring-slate-200",
  cyan: "bg-cyan-50 text-cyan-700 ring-cyan-200",
  blue: "bg-blue-50 text-blue-700 ring-blue-200",
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  amber: "bg-amber-50 text-amber-800 ring-amber-200",
  rose: "bg-rose-50 text-rose-700 ring-rose-200",
  violet: "bg-violet-50 text-violet-700 ring-violet-200",
}

export function Badge({ children, tone = "slate", icon: Icon, dot = false }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${tones[tone]}`}>
      {dot ? <span className="h-1.5 w-1.5 rounded-full bg-current" /> : null}
      {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
      {children}
    </span>
  )
}

export const Pill = Badge

export function Chip({ children, tone = "slate", icon: Icon, active = false, onClick }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ring-1 transition ${active ? tones[tone] : "bg-white text-slate-600 ring-slate-200 hover:bg-slate-50"}`}
    >
      {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
      {children}
    </button>
  )
}
