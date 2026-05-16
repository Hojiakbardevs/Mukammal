import type { ReactNode } from "react"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"

type ModalProps = {
  open: boolean
  title: string
  children: ReactNode
  footer?: ReactNode
  onClose: () => void
}

type DrawerProps = ModalProps

export function Modal({ open, title, children, footer, onClose }: ModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4" onClick={onClose}>
      <section className="w-full max-w-2xl rounded-lg bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-slate-200 p-4">
          <h2 className="text-lg font-bold text-slate-950">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-5">{children}</div>
        {footer ? <div className="flex justify-end gap-2 border-t border-slate-200 p-4">{footer}</div> : null}
      </section>
    </div>
  )
}

export function Drawer({ open, title, children, footer, onClose }: DrawerProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/40" onClick={onClose}>
      <aside
        className="ml-auto flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 p-4">
          <h2 className="text-lg font-bold text-slate-950">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
        {footer ? <div className="border-t border-slate-200 p-4">{footer}</div> : null}
      </aside>
    </div>
  )
}
