import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import type { UserRole } from "@/data/navItems"

const roleRoutes: Record<UserRole, string> = {
  student: "/app",
  teacher: "/teacher",
  admin: "/admin",
}

export function LoginPage() {
  const [role, setRole] = useState<UserRole>("student")
  const navigate = useNavigate()

  return (
    <section className="relative grid min-h-screen place-items-center overflow-hidden px-6 py-24">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#08152b_0%,#010b2f_52%,#070b17_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(36,107,254,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(36,107,254,0.08)_1px,transparent_1px)] bg-size-[56px_56px]" />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-white/8 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-cyan-400 text-slate-950">
            <LockKeyhole className="h-6 w-6" />
          </div>
          <h1 className="mt-5 text-2xl font-bold">AIRI Training LMS</h1>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Demo kirish. Rol tanlang va mos dashboardga o'ting.
          </p>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-200">Email</span>
            <input
              className="mt-2 h-11 w-full rounded-lg border border-white/15 bg-white/10 px-3 text-sm text-white outline-none placeholder:text-white/35"
              defaultValue="demo@airi.uz"
              type="email"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-200">Parol</span>
            <input
              className="mt-2 h-11 w-full rounded-lg border border-white/15 bg-white/10 px-3 text-sm text-white outline-none placeholder:text-white/35"
              defaultValue="demo"
              type="password"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-200">Rol</span>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value as UserRole)}
              className="mt-2 h-11 w-full rounded-lg border border-white/15 bg-slate-950/80 px-3 text-sm text-white outline-none"
            >
              <option value="student">Tinglovchi</option>
              <option value="teacher">Trener</option>
              <option value="admin">Super Admin</option>
            </select>
          </label>
        </div>

        <button
          type="button"
          onClick={() => navigate(roleRoutes[role])}
          className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-cyan-400 font-bold text-slate-950 transition hover:bg-cyan-300"
        >
          Platformaga kirish
          <ArrowRight className="h-4 w-4" />
        </button>

        <div className="mt-5 flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="h-4 w-4 text-cyan-300" />
          Hozircha auth mock. Backend ulanganda shu joy guard bilan almashadi.
        </div>
      </div>
    </section>
  )
}
