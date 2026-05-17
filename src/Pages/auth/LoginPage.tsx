import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

import type { UserRole } from "@/data/navItems"
import { NeuralGrid } from "@/components/landing/NeuralGrid"

const roleRoutes: Record<UserRole, string> = {
  student: "/app",
  teacher: "/teacher",
  admin: "/admin",
}

const inputCls =
  "mt-2 h-11 w-full rounded-lg border border-white/20 bg-white/8 px-3 text-sm text-white outline-none placeholder:text-white/35 transition focus:border-sky-500/60 focus:ring-1 focus:ring-sky-500/30"

export function LoginPage() {
  const [role, setRole] = useState<UserRole>("student")
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#070b17] px-6 text-white">
      {/* Gradient base */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#08152b_0%,#010b2f_50%,#070b17_100%)]" />
      {/* Blue grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(36,107,254,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(36,107,254,0.07)_1px,transparent_1px)] bg-size-[56px_56px]" />
      {/* Glow orbs */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-blue-600/5 blur-[140px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-500/4 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-1/3 left-0 h-56 w-56 rounded-full bg-indigo-600/4 blur-[90px]" />
      {/* Neural animation */}
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
              Tizimga kirish
            </p>
            <h1 className="font-heading text-3xl font-bold text-white">
              AIRI Training LMS
            </h1>
            <p className="mt-3 text-sm leading-6 text-white/50">
              Demo kirish. Rol tanlang va mos dashboardga o'ting.
            </p>
          </motion.div>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-3xl border border-white/10 bg-white/3 p-8 shadow-[0_0_80px_rgba(36,107,254,0.08)] backdrop-blur-2xl"
          >
            {/* Section label */}
            <div className="mb-6 flex items-center gap-3">
              <div className="h-5 w-1 rounded-full bg-sky-400" />
              <h3 className="font-heading text-sm font-bold tracking-wide text-white">
                Kirish ma'lumotlari
              </h3>
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-white/75">Email</span>
                <input
                  className={inputCls}
                  defaultValue="demo@airi.uz"
                  type="email"
                  placeholder="email@example.uz"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-white/75">Parol</span>
                <input
                  className={inputCls}
                  defaultValue="demo"
                  type="password"
                  placeholder="••••••••"
                />
              </label>

              <div className="border-t border-white/8 pt-4">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-5 w-1 rounded-full bg-sky-400" />
                  <h3 className="font-heading text-sm font-bold tracking-wide text-white">
                    Foydalanuvchi roli
                  </h3>
                </div>
                <label className="block">
                  <span className="text-sm font-medium text-white/75">Rol</span>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="mt-2 h-11 w-full rounded-lg border border-white/20 bg-white/8 px-3 text-sm text-white outline-none transition focus:border-sky-500/60 focus:ring-1 focus:ring-sky-500/30"
                  >
                    <option value="student" className="bg-slate-900">Tinglovchi</option>
                    <option value="teacher" className="bg-slate-900">Trener</option>
                    <option value="admin" className="bg-slate-900">Super Admin</option>
                  </select>
                </label>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate(roleRoutes[role])}
              className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-sky-500 to-[#246BFE] font-heading text-[12px] font-bold tracking-widest text-white uppercase shadow-[0_0_24px_rgba(36,107,254,0.35)] transition-all hover:from-sky-400 hover:to-blue-500 hover:shadow-[0_0_36px_rgba(36,107,254,0.55)] active:scale-[0.98]"
            >
              Platformaga kirish
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="mt-5 flex items-center gap-2 text-xs text-white/35">
              <ShieldCheck className="h-4 w-4 text-sky-400/70" />
              Hozircha auth mock. Backend ulanganda guard bilan almashadi.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
