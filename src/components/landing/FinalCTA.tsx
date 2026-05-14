import { ArrowRight, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#071126] px-6 py-20 text-white sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.18),transparent_42%),linear-gradient(180deg,#08111f_0%,#071126_54%,#0a0f1e_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(96,165,250,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border border-blue-200/12 bg-[#0f1b33]/88 p-8 text-center shadow-[0_26px_90px_rgba(0,0,0,0.26)] backdrop-blur-xl md:p-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(240,200,75,0.14),transparent_38%),linear-gradient(140deg,rgba(96,165,250,0.14),transparent_54%)]" />

        <div className="relative mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-blue-200/20 bg-[#172a4f] text-[#8dbbff]">
          <Sparkles className="h-7 w-7" />
        </div>
        <p className="relative mb-3 font-heading text-xs tracking-[0.22em] text-[#8dbbff] uppercase">
          Keyingi qadam
        </p>
        <h2 className="relative mx-auto max-w-3xl font-heading text-[clamp(2rem,4vw,3rem)] leading-tight text-white">
          AI ta'limni amaliy, ishonchli va ilmiy asosda joriy eting
        </h2>
        <p className="relative mx-auto mt-5 max-w-2xl text-base leading-7 text-[#c4cde0]">
          Mukammal trening dasturiga qo'shiling va o'quv jarayonida sun'iy
          intellektdan samarali foydalanish kompetensiyasini rivojlantiring.
        </p>
        <div className="relative mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="#registration"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#f0c84b] px-7 text-sm font-bold text-[#071126] transition hover:bg-[#ffd95d]"
          >
            Ariza qoldirish
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            to="/register"
            className="inline-flex h-12 items-center justify-center rounded-full border border-blue-200/18 px-7 text-sm font-semibold text-white transition hover:bg-blue-200/10"
          >
            To'liq forma
          </Link>
        </div>
      </div>
    </section>
  )
}
