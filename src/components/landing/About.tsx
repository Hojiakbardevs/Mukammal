import { ArrowRight, CheckCircle2, Landmark, ShieldCheck } from "lucide-react"
import { Link } from "react-router-dom"

import { benefits } from "@/components/landing/data"
import { SectionHeader } from "@/components/landing/SectionHeader"

export const About = () => {
  return (
    <section id="about" className="relative px-6 py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/25 to-transparent" />

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <SectionHeader
            align="left"
            eyebrow="Loyiha haqida"
            title="Ilmiy institut aniqligi, AI lab tezligi va EdTech qulayligi"
            description="Dastur O'zbekiston oliy ta'lim va ilmiy-tadqiqot muassasalari professor-o'qituvchilarining sun'iy intellekt bo'yicha malakasini oshirishga qaratilgan."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
              <Landmark className="mb-4 h-6 w-6 text-cyan-300" />
              <h3 className="font-semibold text-white">Akademik ishonch</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Darslar professor-o'qituvchilarning real o'quv va ilmiy
                ehtiyojlari asosida tuziladi.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
              <ShieldCheck className="mb-4 h-6 w-6 text-violet-300" />
              <h3 className="font-semibold text-white">Mas'uliyatli AI</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Xavfsiz, etik va maqsadli AI qo'llash ko'nikmalari ustuvor
                o'rinda turadi.
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-5 rounded-3xl bg-gradient-to-br from-cyan-300/12 to-violet-500/12 blur-2xl" />
          <div className="relative rounded-3xl border border-white/12 bg-slate-950/50 p-6 backdrop-blur-2xl md:p-8">
            <div className="mb-7 flex items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <p className="text-sm text-slate-400">Asosiy fokus</p>
                <h3 className="mt-1 text-2xl font-bold text-white">
                  AI kompetensiyani tizimli rivojlantirish
                </h3>
              </div>
              <div className="hidden rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 sm:block">
                5 oy
              </div>
            </div>

            <ul className="space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                  <span className="text-sm leading-6 text-slate-300">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              to="/register"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-100"
            >
              Ariza topshirish
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
