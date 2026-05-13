import { ArrowRight, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"

export function FinalCTA() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-br from-cyan-300/12 via-white/[0.05] to-violet-500/14 p-8 text-center backdrop-blur-2xl md:p-12">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-cyan-200">
          <Sparkles className="h-7 w-7" />
        </div>
        <p className="mb-3 text-xs font-bold tracking-[0.24em] text-cyan-200 uppercase">
          CTA
        </p>
        <h2 className="mx-auto max-w-3xl font-heading text-3xl leading-tight font-bold text-white md:text-5xl">
          AI ta'limni amaliy, ishonchli va ilmiy asosda joriy eting
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300">
          Mukammal trening dasturiga qo'shiling va o'quv jarayonida sun'iy
          intellektdan samarali foydalanish kompetensiyasini rivojlantiring.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="#registration"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-bold text-slate-950 transition hover:bg-cyan-100"
          >
            Ariza qoldirish
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            to="/register"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-7 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            To'liq forma
          </Link>
        </div>
      </div>
    </section>
  )
}
