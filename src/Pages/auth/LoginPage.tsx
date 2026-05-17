import { Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { toast } from "sonner"

import { NeuralGrid } from "@/components/landing/NeuralGrid"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { getDefaultRoute } from "@/context/AuthContext"
import { mockUsers } from "@/data/mockUsers"
import { useAuth } from "@/hooks/useAuth"
import type { UserRole } from "@/types/auth"

type DemoAccount = {
  role: UserRole
  label: string
  email: string
  password: string
  color: string
}

const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    role: "student",
    label: "Tinglovchi",
    email: "student@airi.uz",
    password: "Student@2026!",
    color: "bg-sky-500/15 text-sky-300 border-sky-500/30 hover:bg-sky-500/25",
  },
  {
    role: "teacher",
    label: "Trener",
    email: "teacher@airi.uz",
    password: "Teacher@2026!",
    color: "bg-violet-500/15 text-violet-300 border-violet-500/30 hover:bg-violet-500/25",
  },
  {
    role: "admin",
    label: "Admin",
    email: "admin@airi.uz",
    password: "Admin@2026!",
    color: "bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/25",
  },
  {
    role: "super_admin",
    label: "Super Admin",
    email: "superadmin@airi.uz",
    password: "SuperAdmin@2026!",
    color: "bg-red-500/15 text-red-300 border-red-500/30 hover:bg-red-500/25",
  },
]

function canAccessPath(role: UserRole, pathname?: string) {
  if (!pathname) return false
  if (role === "student") return pathname.startsWith("/app")
  if (role === "teacher") return pathname.startsWith("/teacher")
  if (role === "admin") return pathname.startsWith("/admin")
  return pathname.startsWith("/admin") || pathname.startsWith("/super-admin")
}

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  function fillDemo(account: DemoAccount) {
    setEmail(account.email)
    setPassword(account.password)
    setError("")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) {
      setError("Email va parolni kiriting")
      return
    }
    setError("")
    setIsLoading(true)
    const result = await login(email, password)
    setIsLoading(false)
    if (!result.success) {
      const message = result.error ?? "Xatolik yuz berdi"
      setError(message)
      toast.error(message)
      return
    }

    const found = mockUsers.find((u) => u.email.toLowerCase() === email.trim().toLowerCase())
    if (found) {
      const fromPath = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname
      const destination =
        fromPath && canAccessPath(found.role, fromPath) ? fromPath : getDefaultRoute(found.role)
      toast.success(`${found.fullName} sifatida tizimga kirdingiz`)
      navigate(destination, { replace: true })
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#070b17] px-6 text-white">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#08152b_0%,#010b2f_50%,#070b17_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(36,107,254,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(36,107,254,0.07)_1px,transparent_1px)] bg-size-[56px_56px]" />
      <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-blue-600/5 blur-[140px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-500/4 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-1/3 left-0 h-56 w-56 rounded-full bg-indigo-600/4 blur-[90px]" />
      <div className="pointer-events-none absolute inset-0 opacity-15">
        <NeuralGrid />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center py-16">
        <div className="w-full max-w-md">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-linear-to-br from-sky-500 to-[#246BFE] shadow-[0_0_24px_rgba(36,107,254,0.4)]">
              <LockKeyhole className="h-7 w-7 text-white" />
            </div>
            <p className="mb-2 font-heading text-xs font-bold tracking-[0.28em] text-sky-400 uppercase">
              Malaka oshirish platformasiga kirish
            </p>
            <h1 className="font-heading text-3xl font-bold text-white">AIRI Training LMS</h1>
          </motion.div>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-3xl border border-white/10 bg-white/3 p-8 shadow-[0_0_80px_rgba(36,107,254,0.08)] backdrop-blur-2xl"
          >
            <form onSubmit={handleSubmit} noValidate>
              {/* Section label */}
              <div className="mb-5 flex items-center gap-3">
                <div className="h-5 w-1 shrink-0 rounded-full bg-sky-400" />
                <h3 className="font-heading text-sm font-bold tracking-wide text-white">
                  Kirish ma'lumotlari
                </h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-sm font-medium text-white/75">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@airi.uz"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError("")
                    }}
                    autoComplete="email"
                    className="h-11 border-white/20 bg-white/8 text-white placeholder:text-white/35 focus-visible:border-sky-500/60 focus-visible:ring-sky-500/30"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-sm font-medium text-white/75">
                    Parol
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        setError("")
                      }}
                      autoComplete="current-password"
                      className="h-11 border-white/20 bg-white/8 pr-10 text-white placeholder:text-white/35 focus-visible:border-sky-500/60 focus-visible:ring-sky-500/30"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 transition-colors hover:text-white/70"
                      aria-label={showPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <Alert className="border-red-500/30 bg-red-500/10 text-red-300">
                    <AlertDescription className="text-sm">{error}</AlertDescription>
                  </Alert>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="mt-6 h-12 w-full rounded-xl bg-linear-to-r from-sky-500 to-[#246BFE] font-heading text-[12px] font-bold tracking-widest text-white uppercase shadow-[0_0_24px_rgba(36,107,254,0.35)] transition-all hover:from-sky-400 hover:to-blue-500 hover:shadow-[0_0_36px_rgba(36,107,254,0.55)] active:scale-[0.98] disabled:opacity-60"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Kirilmoqda...
                  </span>
                ) : (
                  "Kirish"
                )}
              </Button>
            </form>

            <Separator className="my-6 bg-white/8" />

            {/* Demo accounts */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-5 w-1 shrink-0 rounded-full bg-sky-400" />
                <h3 className="font-heading text-sm font-bold tracking-wide text-white">
                  Demo hisoblar
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {DEMO_ACCOUNTS.map((account) => (
                  <button
                    key={account.role}
                    type="button"
                    onClick={() => fillDemo(account)}
                    className={`flex items-center justify-between rounded-xl border px-3 py-2.5 text-left transition-all ${account.color}`}
                  >
                    <span className="font-heading text-xs font-bold tracking-wide">
                      {account.label}
                    </span>
                    <Badge
                      variant="outline"
                      className="border-current/30 bg-transparent px-1.5 py-0 text-[10px] opacity-70"
                    >
                      demo
                    </Badge>
                  </button>
                ))}
              </div>
              <p className="mt-3 text-center text-xs text-white/30">
                Tugmani bosing — email va parol avtomatik to'ldiriladi
              </p>
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs text-white/35">
              <ShieldCheck className="h-4 w-4 shrink-0 text-sky-400/70" />
              Parol localStorage'ga saqlanmaydi. Faqat sessiya ma'lumotlari xavfsiz saqlanadi.
            </div>
            <p className="mt-3 text-center text-xs text-white/35">
              Hisob administrator tomonidan beriladi
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
