import { Home, LogIn, RotateCcw } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

import { NeuralGrid } from "@/components/landing/NeuralGrid"
import { getDefaultRoute } from "@/context/AuthContext"
import { useAuth } from "@/hooks/useAuth"

export function NotFoundPage() {
  const { isAuthenticated, user } = useAuth()
  const dashboardPath = user ? getDefaultRoute(user.role) : "/login"

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#070b17] px-6 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#08152b_0%,#010b2f_50%,#070b17_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(36,107,254,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(36,107,254,0.07)_1px,transparent_1px)] bg-size-[56px_56px]" />
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <NeuralGrid />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md text-center"
        >
          <p className="mb-2 font-heading text-xs font-bold tracking-[0.28em] text-sky-400 uppercase">
            404 — Sahifa topilmadi
          </p>
          <h1 className="font-heading text-3xl font-bold text-white">Bu manzil mavjud emas</h1>
          <p className="mt-4 text-sm leading-6 text-white/50">
            Havola eskirgan yoki noto'g'ri kiritilgan bo'lishi mumkin.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            {isAuthenticated ? (
              <Link
                to={dashboardPath}
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-linear-to-r from-sky-500 to-[#246BFE] px-6 font-heading text-[12px] font-bold tracking-widest text-white uppercase shadow-[0_0_24px_rgba(36,107,254,0.35)] transition-all hover:shadow-[0_0_36px_rgba(36,107,254,0.55)] active:scale-[0.98]"
              >
                <RotateCcw className="h-4 w-4" />
                Panelga qaytish
              </Link>
            ) : (
              <>
                <Link
                  to="/"
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-linear-to-r from-sky-500 to-[#246BFE] px-6 font-heading text-[12px] font-bold tracking-widest text-white uppercase shadow-[0_0_24px_rgba(36,107,254,0.35)] transition-all hover:shadow-[0_0_36px_rgba(36,107,254,0.55)] active:scale-[0.98]"
                >
                  <Home className="h-4 w-4" />
                  Bosh sahifa
                </Link>
                <Link
                  to="/login"
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/15 px-6 font-heading text-[12px] font-bold tracking-widest text-white/60 uppercase transition-all hover:border-white/30 hover:text-white active:scale-[0.98]"
                >
                  <LogIn className="h-4 w-4" />
                  Kirish
                </Link>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
