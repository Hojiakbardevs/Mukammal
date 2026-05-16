import { CheckCircle2 } from "lucide-react"

import AboutImage from "@/assets/IlmiyImkoniyatlar.png"
import { benefits } from "@/components/landing/data"

export const About = () => {
  return (
    <section
      id="about"
      className="relative flex scroll-mt-24 items-center overflow-hidden bg-[#f7faff] py-14 sm:py-16 lg:min-h-[680px] lg:py-18 xl:min-h-screen"
    >
      {/* Image side — right */}
      <div className="absolute inset-y-0 right-0 z-3 w-full lg:w-[55%]">
        <img
          src={AboutImage}
          alt="Ilmiy tadqiqot bo'limi"
          width={1672}
          height={941}
          loading="lazy"
          decoding="async"
          sizes="(min-width: 1024px) 55vw, 100vw"
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
      <div className="relative z-20 container mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="mr-auto max-w-2xl lg:w-[62%] xl:w-[58%]">
          <div className="mb-5 inline-flex max-w-full items-center gap-3 rounded-full border border-blue-100 bg-white/86 px-4 py-2 shadow-sm backdrop-blur-xl sm:mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#246BFE]" />
            <p className="text-xs font-black tracking-[0.22em] text-[#604eff] uppercase sm:text-sm">
              Dastur haqida
            </p>
          </div>

          <h2 className="font-heading text-[clamp(1.9rem,7vw,3.05rem)] leading-[1.05] tracking-tight text-slate-950 lg:text-[clamp(2.15rem,4.1vw,3.7rem)]">
            Professor-oʻqituvchilar malakasini yangi bosqichga olib chiqadigan
            dastur
          </h2>

          <p className="mt-5 text-base leading-7 font-light text-slate-600 sm:mt-6 sm:text-justify sm:text-lg sm:leading-8 lg:max-w-xl">
            Dastur ilmiy-tadqiqot institutlari va oliy oʻquv muassasalari
            professor-oʻqituvchilarining sunʼiy intellekt bo‘yicha zamonaviy
            bilimlarini oshirish, oʻqitish metodikasini yangilash, oʻquv
            jarayonini raqamlashtirish va ilgʻor ilmiy yondashuvlarni amaliy
            taʼlimga joriy etishga qaratilgan.
          </p>

          <ul className="mt-6 space-y-3 sm:mt-8">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#246BFE]" />
                <span className="text-sm leading-6 text-slate-700 sm:text-base">
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
