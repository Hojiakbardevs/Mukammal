import * as React from "react"
import type { LucideIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg border font-semibold transition disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border-slate-200 bg-white text-slate-700 hover:border-cyan-300 hover:text-slate-950",
        primary: "border-cyan-500 bg-cyan-500 text-white hover:bg-cyan-600",
        destructive: "border-rose-500 bg-rose-500 text-white hover:bg-rose-600",
        danger: "border-rose-500 bg-rose-500 text-white hover:bg-rose-600",
        outline: "border-slate-200 bg-transparent text-slate-700 hover:bg-slate-50",
        secondary: "border-slate-100 bg-slate-100 text-slate-900 hover:bg-slate-200",
        ghost: "border-transparent bg-transparent text-slate-600 hover:bg-slate-100",
        link: "border-transparent bg-transparent text-cyan-700 underline-offset-4 hover:underline",
        success: "border-emerald-500 bg-emerald-500 text-white hover:bg-emerald-600",
        amber: "border-amber-400 bg-amber-400 text-slate-950 hover:bg-amber-500",
      },
      size: {
        default: "h-10 px-4 text-sm",
        xs: "h-8 px-2 text-xs",
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-6 text-base",
        icon: "h-10 w-10 px-0 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    icon?: LucideIcon
    rightIcon?: LucideIcon
  }

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, icon: Icon, rightIcon: RightIcon, children, type = "button", ...props }, ref) => (
    <button ref={ref} type={type} className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {Icon ? <Icon /> : null}
      {children}
      {RightIcon ? <RightIcon /> : null}
    </button>
  )
)

Button.displayName = "Button"

export const Btn = Button
