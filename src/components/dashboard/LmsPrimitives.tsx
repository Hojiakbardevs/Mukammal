import type { CSSProperties, ReactNode } from "react"

export type PillTone = "green" | "amber" | "red" | "blue" | "purple" | "gray" | "teal" | "solid-blue"
export type StatTone = "blue" | "green" | "amber" | "red" | "purple"

type IconProps = {
  name: string
  className?: string
  style?: CSSProperties
}

export function Icon({ name, className = "", style }: IconProps) {
  return <i className={`ti ti-${name} ${className}`.trim()} style={style} />
}

type CardProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export function Card({ children, className = "", style }: CardProps) {
  return <section className={`card ${className}`.trim()} style={style}>{children}</section>
}

type CardHeadProps = {
  title: string
  sub?: string
  count?: number
  actions?: ReactNode
}

export function CardHead({ title, sub, count, actions }: CardHeadProps) {
  return (
    <div className="card-head">
      <h3>
        {title}
        {typeof count === "number" ? <span className="muted">({count})</span> : null}
        {sub ? <span className="muted">{sub}</span> : null}
      </h3>
      <div className="cta-row">{actions}</div>
    </div>
  )
}

type PillProps = {
  tone?: PillTone
  dot?: boolean
  icon?: string
  children: ReactNode
}

export function Pill({ tone = "gray", dot = false, icon, children }: PillProps) {
  return (
    <span className={`pill pill-${tone} ${dot ? "pill-dot" : ""}`.trim()}>
      {icon ? <Icon name={icon} /> : null}
      {children}
    </span>
  )
}

type BarProps = {
  value?: number
  tone?: "blue" | "green" | "amber" | "red" | "purple"
  thin?: boolean
  thick?: boolean
}

export function Bar({ value = 0, tone = "blue", thin = false, thick = false }: BarProps) {
  const width = `${Math.max(0, Math.min(100, value))}%`
  return (
    <div className={`bar ${thin ? "thin" : ""} ${thick ? "thick" : ""} ${tone}`.trim()}>
      <div style={{ width }} />
    </div>
  )
}

type BtnProps = {
  variant?: "default" | "primary" | "ghost" | "danger" | "success" | "amber"
  size?: "sm" | "xs" | "icon"
  children?: ReactNode
  leftIcon?: string
  rightIcon?: string
  type?: "button" | "submit"
  onClick?: () => void
  disabled?: boolean
  className?: string
  ariaLabel?: string
}

export function Btn({
  variant = "default",
  size,
  children,
  leftIcon,
  rightIcon,
  type = "button",
  onClick,
  disabled = false,
  className = "",
  ariaLabel,
}: BtnProps) {
  const classes = ["btn"]
  if (variant !== "default") classes.push(`btn-${variant}`)
  if (size) classes.push(`btn-${size}`)
  if (className) classes.push(className)

  return (
    <button type={type} className={classes.join(" ")} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
      {leftIcon ? <Icon name={leftIcon} /> : null}
      {children}
      {rightIcon ? <Icon name={rightIcon} /> : null}
    </button>
  )
}

type AvatarProps = {
  name: string
  tone?: string
  size?: "sm" | "lg" | "xl"
}

export function Avatar({ name, tone = "b1", size }: AvatarProps) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
  const sizeClass = size ? size : ""

  return <span className={`av ${tone} ${sizeClass}`.trim()}>{initials || "?"}</span>
}

type StatProps = {
  tone?: StatTone
  label: string
  value: string | number
  unit?: string
  sub: string
  trend?: {
    dir: "up" | "down" | "flat"
    label: string
  }
}

export function Stat({ tone = "blue", label, value, unit, sub, trend }: StatProps) {
  return (
    <div className={`stat ${tone === "blue" ? "" : tone}`.trim()}>
      <div className="stat-accent" />
      <div className="stat-label">{label}</div>
      <div className="stat-val num">
        {value}
        {unit ? <span className="unit">{unit}</span> : null}
      </div>
      <div className="stat-sub">
        {trend ? (
          <span className={`stat-trend ${trend.dir}`}>
            <Icon name={trend.dir === "up" ? "trending-up" : trend.dir === "down" ? "trending-down" : "minus"} />
            {trend.label}
          </span>
        ) : null}
        {sub}
      </div>
    </div>
  )
}

type SegOption = {
  value: string
  label: string
  icon?: string
}

type SegProps = {
  value: string
  onChange: (value: string) => void
  options: SegOption[]
}

export function Seg({ value, onChange, options }: SegProps) {
  return (
    <div className="seg">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`seg-btn ${value === option.value ? "active" : ""}`}
          onClick={() => onChange(option.value)}
        >
          {option.icon ? <Icon name={option.icon} /> : null}
          {option.label}
        </button>
      ))}
    </div>
  )
}

type TabItem = {
  value: string
  label: string
  icon?: string
  count?: number
}

type TabsProps = {
  value: string
  onChange: (value: string) => void
  items: TabItem[]
}

export function Tabs({ value, onChange, items }: TabsProps) {
  return (
    <div className="tabs">
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          className={`tab ${value === item.value ? "active" : ""}`}
          onClick={() => onChange(item.value)}
        >
          {item.icon ? <Icon name={item.icon} /> : null}
          {item.label}
          {typeof item.count === "number" ? <span className="count num">{item.count}</span> : null}
        </button>
      ))}
    </div>
  )
}

type ChipProps = {
  active?: boolean
  icon?: string
  children: ReactNode
  onClick?: () => void
}

export function Chip({ active = false, icon, children, onClick }: ChipProps) {
  return (
    <button type="button" className={`chip ${active ? "active" : ""}`} onClick={onClick}>
      {icon ? <Icon name={icon} /> : null}
      {children}
    </button>
  )
}

type ModalProps = {
  open: boolean
  onClose: () => void
  title: string
  footer?: ReactNode
  children: ReactNode
  width?: number
}

export function Modal({ open, onClose, title, footer, children, width }: ModalProps) {
  if (!open) return null

  const modalStyle = width ? { width } : undefined

  return (
    <div className="modal-mask" onClick={onClose}>
      <div className="modal" style={modalStyle} onClick={(event) => event.stopPropagation()}>
        <div className="modal-head">
          <h2>{title}</h2>
          <Btn variant="ghost" size="icon" onClick={onClose} ariaLabel="Yopish">
            <Icon name="x" />
          </Btn>
        </div>
        <div className="modal-body">{children}</div>
        {footer ? <div className="modal-foot">{footer}</div> : null}
      </div>
    </div>
  )
}

type DrawerProps = {
  open: boolean
  onClose: () => void
  title: string
  footer?: ReactNode
  children: ReactNode
}

export function Drawer({ open, onClose, title, footer, children }: DrawerProps) {
  if (!open) return null

  return (
    <>
      <div className="drawer-mask" onClick={onClose} />
      <aside className="drawer" onClick={(event) => event.stopPropagation()}>
        <div className="drawer-head">
          <h2 style={{ fontSize: 15, fontWeight: 700 }}>{title}</h2>
          <Btn variant="ghost" size="icon" onClick={onClose} ariaLabel="Yopish">
            <Icon name="x" />
          </Btn>
        </div>
        <div className="drawer-body">{children}</div>
        {footer ? <div className="drawer-foot">{footer}</div> : null}
      </aside>
    </>
  )
}

type DonutProps = {
  size?: number
  stroke?: number
  value?: number
  max?: number
  tone?: string
  trackTone?: string
  center: ReactNode
}

export function Donut({
  size = 92,
  stroke = 12,
  value = 0,
  max = 100,
  tone = "#1f6feb",
  trackTone = "#eef1f7",
  center,
}: DonutProps) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const percent = Math.max(0, Math.min(1, value / max))

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={trackTone} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={tone}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - circumference * percent}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center" }}>
        {center}
      </div>
    </div>
  )
}

type LinePoint = {
  x?: number
  y: number
}

type LineChartProps = {
  data: Array<number | LinePoint>
  height?: number
  color?: string
  fill?: string
  grid?: boolean
  ariaLabel?: string
}

export function LineChart({
  data,
  height = 140,
  color = "#1f6feb",
  fill = "rgba(31,111,235,0.10)",
  grid = true,
  ariaLabel = "Chiziqli grafik",
}: LineChartProps) {
  const points = data.map((item, index) => (typeof item === "number" ? { x: index, y: item } : item))
  const ys = points.map((point) => point.y)
  const min = Math.min.apply(null, ys)
  const max = Math.max.apply(null, ys)
  const range = max - min || 1
  const xMax = Math.max(1, points.length - 1)
  const path = points
    .map((point, index) => {
      const x = (index / xMax) * 100
      const y = 100 - ((point.y - min) / range) * 90 - 5
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(" ")
  const area = `${path} L 100 100 L 0 100 Z`

  return (
    <svg width="100%" height={height} viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label={ariaLabel}>
      {grid ? [25, 50, 75].map((y) => <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="#eef1f7" strokeWidth="0.4" />) : null}
      <path d={area} fill={fill} />
      <path d={path} fill="none" stroke={color} strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

type BarChartProps = {
  data: number[]
  height?: number
  color?: string
  labels?: string[]
}

export function BarChart({ data, height = 140, color = "#1f6feb", labels }: BarChartProps) {
  const max = Math.max(1, Math.max.apply(null, data))

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height, paddingBottom: 18, position: "relative" }}>
      {data.map((value, index) => (
        <div key={`${value}-${index}`} style={{ flex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", gap: 6, position: "relative" }}>
          <div style={{ width: "70%", height: `${(value / max) * 100}%`, background: `linear-gradient(180deg, ${color}66, ${color})`, borderRadius: "5px 5px 0 0", position: "relative", minHeight: 4 }} />
          {labels ? <div style={{ position: "absolute", bottom: -16, fontSize: 10.5, color: "#8a93a6", fontWeight: 600 }}>{labels[index]}</div> : null}
        </div>
      ))}
    </div>
  )
}

type GroupBarChartProps = {
  groups: number[][]
  series: Array<{ label: string; color: string }>
  height?: number
  labels?: string[]
}

export function GroupBarChart({ groups, series, height = 160, labels }: GroupBarChartProps) {
  const flat = groups.reduce<number[]>((acc, group) => acc.concat(group), [])
  const max = Math.max(1, Math.max.apply(null, flat))

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height, paddingBottom: 22 }}>
      {groups.map((group, groupIndex) => (
        <div key={`group-${groupIndex}`} style={{ flex: 1, display: "flex", gap: 3, alignItems: "flex-end", height: "100%", position: "relative" }}>
          {group.map((value, seriesIndex) => (
            <div
              key={`${groupIndex}-${seriesIndex}`}
              style={{ flex: 1, height: `${(value / max) * 100}%`, background: series[seriesIndex]?.color ?? "#1f6feb", borderRadius: "4px 4px 0 0", minHeight: 3 }}
              title={`${series[seriesIndex]?.label ?? "Qiymat"}: ${value}`}
            />
          ))}
          {labels ? <div style={{ position: "absolute", bottom: -18, left: 0, right: 0, textAlign: "center", fontSize: 10.5, color: "#8a93a6", fontWeight: 600 }}>{labels[groupIndex]}</div> : null}
        </div>
      ))}
    </div>
  )
}

type LegendProps = {
  items: Array<{ color: string; label: string }>
}

export function Legend({ items }: LegendProps) {
  return (
    <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
      {items.map((item) => (
        <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: "#475569", fontWeight: 600 }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, background: item.color, display: "inline-block" }} />
          {item.label}
        </div>
      ))}
    </div>
  )
}

type ToolbarProps = {
  children: ReactNode
}

export function Toolbar({ children }: ToolbarProps) {
  return <div className="toolbar">{children}</div>
}

type CheckProps = {
  value?: boolean
  onChange?: (value: boolean) => void
}

export function Check({ value = false, onChange }: CheckProps) {
  return (
    <button
      type="button"
      className={`check ${value ? "on" : ""}`}
      onClick={() => {
        if (onChange) onChange(!value)
      }}
      aria-label={value ? "Tanlovni olib tashlash" : "Tanlash"}
    />
  )
}

type PeopleProps = {
  list: Array<{ name: string; tone?: string }>
  max?: number
  size?: "sm" | "lg"
}

export function People({ list, max = 4, size = "sm" }: PeopleProps) {
  const overflow = list.length > max ? list.length - max : 0

  return (
    <div className="people">
      {list.slice(0, max).map((person, index) => (
        <Avatar key={person.name} name={person.name} tone={person.tone ?? `b${(index % 8) + 1}`} size={size} />
      ))}
      {overflow > 0 ? <span className={`av more ${size === "sm" ? "sm" : ""}`}>+{overflow}</span> : null}
    </div>
  )
}

export function Heat({ value }: { value: number }) {
  const className = value <= 0 ? "" : value === 1 ? "l1" : value === 2 ? "l2" : value === 3 ? "l3" : "l4"
  return <span className={`heat ${className}`.trim()} />
}

type SparkProps = {
  data: number[]
  tone?: "blue" | "amber" | "green" | "red" | "muted"
  height?: number
}

export function Spark({ data, tone = "blue", height = 36 }: SparkProps) {
  const max = Math.max(1, Math.max.apply(null, data))

  return (
    <div className="spark" style={{ height }}>
      {data.map((value, index) => (
        <span key={`${value}-${index}`} className={tone === "blue" ? "" : tone} style={{ height: `${Math.max(6, (value / max) * 100)}%` }} />
      ))}
    </div>
  )
}
