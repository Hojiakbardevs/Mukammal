import { motion } from "framer-motion"
import { ArrowRight, BadgeCheck, BrainCircuit, DatabaseZap } from "lucide-react"
import { Link } from "react-router-dom"

import CountdownBadge from "@/components/CountDown"

const trustPoints = [
  "Oliy ta'lim",
  "Ilmiy-tadqiqot",
  "AI laboratoriya",
  "Raqamli ta'lim",
]

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 pb-16"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.22),transparent_32%),radial-gradient(circle_at_82%_28%,rgba(139,92,246,0.22),transparent_30%),linear-gradient(135deg,#070b17_0%,#0b1530_48%,#070b17_100%)]" />
      <div className="data-grid absolute inset-0 opacity-45" />
      <div className="neural-lines absolute inset-0 opacity-50" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-white/[0.06] px-4 py-2 text-xs font-semibold tracking-[0.22em] text-cyan-100 uppercase backdrop-blur-xl">
            <BadgeCheck className="h-4 w-4 text-cyan-300" />
            Premium AI education program
          </div>

          <h1 className="max-w-4xl font-heading text-5xl leading-[1.03] font-bold text-white md:text-7xl">
            Mukammal trening
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 md:text-xl">
            Mukammal trening — professor-o'qituvchilar uchun sun'iy intellekt,
            raqamli ta'lim va ilmiy-tadqiqot ko'nikmalarini rivojlantirish
            dasturi.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="#registration"
              className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-300 to-violet-400 px-7 text-sm font-bold text-slate-950 shadow-[0_0_36px_rgba(34,211,238,0.24)] transition hover:translate-y-[-1px] hover:shadow-[0_0_44px_rgba(139,92,246,0.3)]"
            >
              Ro'yxatdan o'tish
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#about"
              className="inline-flex h-[52px] items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 text-sm font-semibold text-white backdrop-blur-xl transition hover:border-cyan-300/40 hover:bg-white/[0.08]"
            >
              Loyiha haqida
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {trustPoints.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-slate-300"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-cyan-400/18 to-violet-500/18 blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-white/[0.06] p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-2xl">
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-xs font-semibold tracking-[0.22em] text-cyan-200 uppercase">
                  AI Lab Dashboard
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">
                  Akademik malaka oshirish
                </h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300/12 text-cyan-200">
                <BrainCircuit className="h-6 w-6" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <DatabaseZap className="mb-4 h-6 w-6 text-violet-300" />
                <p className="text-3xl font-bold text-white">4</p>
                <p className="mt-1 text-sm text-slate-400">kurs yo'nalishi</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <BrainCircuit className="mb-4 h-6 w-6 text-cyan-300" />
                <p className="text-3xl font-bold text-white">5 oy</p>
                <p className="mt-1 text-sm text-slate-400">to'liq dastur</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
              <CountdownBadge target="2026-06-01T00:00:00+05:00" />
            </div>

            <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-cyan-300/14 bg-cyan-300/[0.05] p-4 text-sm leading-6 text-slate-300">
              <p>
                Ma'ruza, amaliy mashg'ulot, mustaqil ta'lim va video yozuvlar
                orqali professor-o'qituvchilar AI vositalarini o'quv va ilmiy
                jarayonga tatbiq etishni o'rganadi.
              </p>
              <Link
                to="/register"
                className="inline-flex w-fit items-center gap-2 font-semibold text-cyan-200 transition hover:text-white"
              >
                Batafsil ariza formasi
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
