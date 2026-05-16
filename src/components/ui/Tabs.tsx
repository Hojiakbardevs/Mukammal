import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"

export type TabItem = {
  value: string
  label: string
  count?: number
  icon?: LucideIcon
}

type TabsProps = {
  value: string
  onChange: (value: string) => void
  items: TabItem[]
}

type SegProps = TabsProps

export function Tabs({ value, onChange, items }: TabsProps) {
  return (
    <div className="flex flex-wrap gap-2 border-b border-slate-200">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onChange(item.value)}
            className={`-mb-px inline-flex items-center gap-2 border-b-2 px-3 py-2 text-sm font-bold transition ${value === item.value ? "border-cyan-500 text-cyan-700" : "border-transparent text-slate-500 hover:text-slate-900"}`}
          >
            {Icon ? <Icon className="h-4 w-4" /> : null}
            {item.label}
            {typeof item.count === "number" ? <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs">{item.count}</span> : null}
          </button>
        )
      })}
    </div>
  )
}

export function Seg({ value, onChange, items }: SegProps) {
  return (
    <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onChange(item.value)}
            className={`inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-bold transition ${value === item.value ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
          >
            {Icon ? <Icon className="h-4 w-4" /> : null}
            {item.label}
          </button>
        )
      })}
    </div>
  )
}

type TabPanelProps = {
  children: ReactNode
}

export function TabPanel({ children }: TabPanelProps) {
  return <div className="pt-4">{children}</div>
}
