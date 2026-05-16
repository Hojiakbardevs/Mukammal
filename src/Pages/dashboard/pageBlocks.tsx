import type { ReactNode } from "react"

type PageHeaderProps = {
  eyebrow: string
  title: string
  description: string
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <div className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
        {eyebrow}
      </div>
      <h2 className="mt-2 text-2xl font-bold text-slate-950">{title}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
        {description}
      </p>
    </div>
  )
}

type PanelProps = {
  title: string
  children: ReactNode
}

export function Panel({ title, children }: PanelProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-base font-bold text-slate-950">{title}</h3>
      <div className="mt-4">{children}</div>
    </section>
  )
}

type ListRowProps = {
  title: string
  meta: string
  value: string
}

export function ListRow({ title, meta, value }: ListRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-3 last:border-0">
      <div>
        <div className="font-semibold text-slate-900">{title}</div>
        <div className="mt-1 text-sm text-slate-500">{meta}</div>
      </div>
      <div className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
        {value}
      </div>
    </div>
  )
}
