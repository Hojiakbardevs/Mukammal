import type { ReactNode } from "react"

type CardProps = {
  children: ReactNode
  className?: string
}

type CardHeadProps = {
  title: string
  sub?: string
  actions?: ReactNode
  count?: number
}

type AvatarProps = {
  name: string
  tone?: string
  size?: "sm" | "md" | "lg" | "xl"
}

type StatProps = {
  label: string
  value: string | number
  unit?: string
  sub?: string
  tone?: "cyan" | "blue" | "emerald" | "amber" | "rose" | "violet" | "slate"
}

type DonutProps = {
  value: number
  size?: number
  stroke?: number
  label?: string
  tone?: string
}

type LineChartProps = {
  data: number[]
  height?: number
  color?: string
}

type BarChartProps = {
  data: number[]
  labels?: string[]
  height?: number
  color?: string
}

type GroupBarChartProps = {
  groups: number[][]
  labels: string[]
  series: Array<{ label: string; color: string }>
  height?: number
}

type LegendProps = {
  items: Array<{ label: string; color: string }>
}

const toneClass: Record<NonNullable<StatProps["tone"]>, string> = {
  cyan: "border-cyan-200 bg-cyan-50 text-cyan-700",
  blue: "border-blue-200 bg-blue-50 text-blue-700",
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
  amber: "border-amber-200 bg-amber-50 text-amber-700",
  rose: "border-rose-200 bg-rose-50 text-rose-700",
  violet: "border-violet-200 bg-violet-50 text-violet-700",
  slate: "border-slate-200 bg-slate-50 text-slate-700",
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <section className={`rounded-lg border border-slate-200 bg-white p-5 shadow-sm ${className}`}>
      {children}
    </section>
  )
}

export function CardHead({ title, sub, actions, count }: CardHeadProps) {
  return (
    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h2 className="text-base font-bold text-slate-950">
          {title} {typeof count === "number" ? <span className="text-slate-400">({count})</span> : null}
        </h2>
        {sub ? <p className="mt-1 text-sm text-slate-500">{sub}</p> : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  )
}

export function Avatar({ name, tone = "bg-cyan-500", size = "md" }: AvatarProps) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
  const sizeClass = size === "sm" ? "h-8 w-8 text-xs" : size === "lg" ? "h-12 w-12" : size === "xl" ? "h-16 w-16 text-lg" : "h-10 w-10"

  return (
    <span className={`grid shrink-0 place-items-center rounded-lg ${tone} ${sizeClass} font-bold text-white`}>
      {initials}
    </span>
  )
}

export function Stat({ label, value, unit, sub, tone = "cyan" }: StatProps) {
  return (
    <div className={`rounded-lg border p-4 ${toneClass[tone]}`}>
      <div className="text-xs font-semibold uppercase tracking-wide opacity-75">{label}</div>
      <div className="mt-2 text-2xl font-bold">
        {value}
        {unit ? <span className="ml-1 text-sm font-semibold">{unit}</span> : null}
      </div>
      {sub ? <div className="mt-2 text-xs font-medium opacity-80">{sub}</div> : null}
    </div>
  )
}

export function Toolbar({ children }: CardProps) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2">
      {children}
    </div>
  )
}

export function Donut({ value, size = 96, stroke = 12, label, tone = "#0891b2" }: DonutProps) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const percent = Math.max(0, Math.min(100, value))
  const offset = circumference - (circumference * percent) / 100

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label={label ?? `${percent}%`}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={tone}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeWidth={stroke}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <span className="text-lg font-bold text-slate-950">{percent}%</span>
      </div>
    </div>
  )
}

export function LineChart({ data, height = 150, color = "#0891b2" }: LineChartProps) {
  const max = Math.max(1, Math.max(...data))
  const min = Math.min(...data)
  const range = Math.max(1, max - min)
  const lastIndex = Math.max(1, data.length - 1)
  const points = data
    .map((value, index) => {
      const x = (index / lastIndex) * 100
      const y = 92 - ((value - min) / range) * 82
      return `${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(" ")

  return (
    <svg className="w-full" height={height} viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="Chiziqli grafik">
      {[20, 45, 70].map((line) => (
        <line key={line} x1="0" x2="100" y1={line} y2={line} stroke="#e2e8f0" strokeWidth="0.4" />
      ))}
      <polyline points={points} fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
    </svg>
  )
}

export function BarChart({ data, labels, height = 150, color = "#0891b2" }: BarChartProps) {
  const max = Math.max(1, Math.max(...data))

  return (
    <div className="flex items-end gap-2" style={{ height }}>
      {data.map((value, index) => (
        <div key={`${value}-${index}`} className="flex h-full flex-1 flex-col justify-end gap-2">
          <div
            className="min-h-2 rounded-t-md"
            style={{ height: `${(value / max) * 100}%`, backgroundColor: color }}
            title={`${value}`}
          />
          {labels ? <div className="text-center text-xs font-semibold text-slate-500">{labels[index]}</div> : null}
        </div>
      ))}
    </div>
  )
}

export function GroupBarChart({ groups, labels, series, height = 170 }: GroupBarChartProps) {
  const max = Math.max(1, Math.max(...groups.flat()))

  return (
    <div className="flex items-end gap-4" style={{ height }}>
      {groups.map((group, groupIndex) => (
        <div key={labels[groupIndex]} className="flex h-full flex-1 flex-col justify-end gap-2">
          <div className="flex h-full items-end gap-1">
            {group.map((value, index) => (
              <div
                key={`${labels[groupIndex]}-${series[index].label}`}
                className="min-h-2 flex-1 rounded-t"
                style={{ height: `${(value / max) * 100}%`, backgroundColor: series[index].color }}
                title={`${series[index].label}: ${value}`}
              />
            ))}
          </div>
          <div className="text-center text-xs font-semibold text-slate-500">{labels[groupIndex]}</div>
        </div>
      ))}
    </div>
  )
}

export function Legend({ items }: LegendProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => (
        <span key={item.label} className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
          {item.label}
        </span>
      ))}
    </div>
  )
}
