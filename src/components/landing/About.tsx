import { CheckCircle2 } from "lucide-react"

import AboutImage from "@/assets/IlmiyImkoniyatlar.png"
import { benefits } from "@/components/landing/data"

export const About = () => {
  return (
    <section
      id="about"
      className="relative flex h-screen scroll-mt-24 items-center overflow-hidden bg-[#f7faff]"
    >
      {/* Image side — right */}
      <div className="absolute inset-y-0 right-0 z-3 w-full lg:w-[55%]">
        <img
          src={AboutImage}
          alt="Ilmiy tadqiqot bo'limi"
          className="h-full w-full object-cover object-[52%_center] brightness-[1.02] contrast-[1.08] saturate-[1.12]"
        />

        {/* Mobile overlay */}
        <div className="absolute inset-0 bg-[#f7faff]/88 lg:hidden" />

        {/* Desktop gradients */}
        <div className="absolute inset-y-0 right-0 hidden w-16 bg-gradient-to-l from-[#f7faff]/40 to-transparent lg:block" />
        <div className="absolute inset-y-0 left-0 hidden w-96 bg-gradient-to-r from-[#f7faff] via-[#f7faff]/75 to-transparent lg:block" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#f7faff] to-transparent" />
      </div>

      {/* Content — left */}
      <div className="relative z-20 container mx-auto w-full px-4 py-16 sm:px-6 lg:px-10">
        <div className="mr-auto lg:w-[60%]">
          <div className="mb-6 inline-flex max-w-full items-center gap-3 rounded-full border border-blue-100 bg-white/86 px-4 py-2 shadow-sm backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-[#246BFE]" />
            <p className="text-xs font-black tracking-[0.22em] text-[#604eff] uppercase sm:text-sm">
              Dastur haqida
            </p>
          </div>

          <h2 className="font-heading text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-tight text-slate-950">
            Professor-oʻqituvchilar malakasini yangi bosqichga olib chiqadigan
            dastur
          </h2>

          <p className="mt-7 text-justify text-base leading-8 font-light text-slate-600 sm:text-lg">
            Dastur ilmiy-tadqiqot institutlari va oliy oʻquv muassasalari
            professor-oʻqituvchilarining sunʼiy intellekt bo‘yicha zamonaviy
            bilimlarini oshirish, oʻqitish metodikasini yangilash, oʻquv
            jarayonini raqamlashtirish va ilgʻor ilmiy yondashuvlarni amaliy
            taʼlimga joriy etishga qaratilgan.
          </p>

          <ul className="mt-8 space-y-3">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#246BFE]" />
                <span className="text-base leading-6 text-slate-700">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
