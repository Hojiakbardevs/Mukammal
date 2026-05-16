type ProgressProps = {
  value: number
  tone?: "cyan" | "blue" | "emerald" | "amber" | "rose" | "violet"
  size?: "sm" | "md" | "lg"
  label?: string
}

const tones: Record<NonNullable<ProgressProps["tone"]>, string> = {
  cyan: "bg-cyan-500",
  blue: "bg-blue-500",
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
  violet: "bg-violet-500",
}

const sizes: Record<NonNullable<ProgressProps["size"]>, string> = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-3.5",
}

export function Progress({ value, tone = "cyan", size = "md", label }: ProgressProps) {
  const percent = Math.max(0, Math.min(100, value))

  return (
    <div>
      {label ? (
        <div className="mb-1 flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>{label}</span>
          <span>{percent}%</span>
        </div>
      ) : null}
      <div className={`overflow-hidden rounded-full bg-slate-100 ${sizes[size]}`}>
        <div className={`h-full rounded-full ${tones[tone]}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}

export const Bar = Progress
