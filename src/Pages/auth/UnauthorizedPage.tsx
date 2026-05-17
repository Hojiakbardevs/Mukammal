import { ShieldX } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

import { NeuralGrid } from "@/components/landing/NeuralGrid"
import { useAuth } from "@/hooks/useAuth"
import { getDefaultRoute } from "@/context/AuthContext"

export function UnauthorizedPage() {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()

  function handleBack() {
    if (isAuthenticated && user) {
      navigate(getDefaultRoute(user.role))
    } else {
      navigate("/login")
    }
  }

  function handleLogout() {
    logout()
    navigate("/login", { replace: true })
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#070b17] px-6 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#08152b_0%,#010b2f_50%,#070b17_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(36,107,254,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(36,107,254,0.07)_1px,transparent_1px)] bg-size-[56px_56px]" />
      <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-red-600/5 blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <NeuralGrid />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center py-16">
        <div className="w-full max-w-md text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-3xl bg-red-500/10 ring-1 ring-red-500/30">
              <ShieldX className="h-10 w-10 text-red-400" />
            </div>

            <p className="mb-2 font-heading text-xs font-bold tracking-[0.28em] text-red-400 uppercase">
              403 — Kirish taqiqlangan
            </p>
            <h1 className="font-heading text-3xl font-bold text-white">Ruxsat yo'q</h1>
            <p className="mt-4 text-sm leading-6 text-white/50">
              Sizda bu sahifaga kirish huquqi yo'q. Agar xato deb hisoblasangiz,
              administratorga murojaat qiling.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-linear-to-r from-sky-500 to-[#246BFE] px-6 font-heading text-[12px] font-bold tracking-widest text-white uppercase shadow-[0_0_24px_rgba(36,107,254,0.35)] transition-all hover:shadow-[0_0_36px_rgba(36,107,254,0.55)] active:scale-[0.98]"
              >
                Asosiy panelga qaytish
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/15 px-6 font-heading text-[12px] font-bold tracking-widest text-white/60 uppercase transition-all hover:border-white/30 hover:text-white active:scale-[0.98]"
              >
                Tizimdan chiqish
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
