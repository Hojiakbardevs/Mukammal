import { ChevronDown } from "lucide-react"

import { faqs } from "@/components/landing/data"

export function FAQ() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-[#071126] px-6 py-20 text-white sm:py-24"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(96,165,250,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(240,200,75,0.12),transparent_34%),radial-gradient(circle_at_82%_42%,rgba(37,99,235,0.2),transparent_42%),linear-gradient(180deg,#071126_0%,#08111f_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-blue-200/8" />

      <div className="relative mx-auto max-w-4xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="font-heading text-xs tracking-[0.22em] text-[#8dbbff] uppercase">
            FAQ
          </p>
          <h2 className="mt-3 font-heading text-[clamp(2rem,3vw,2.65rem)] leading-tight text-white">
            Ko'p beriladigan savollar
          </h2>
          <p className="mt-4 text-base leading-7 text-[#c4cde0]">
            Dastur formati, yo'nalishlar va sertifikat bo'yicha eng muhim
            savollarga qisqa javoblar.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isAccent = index === 1

            return (
              <details
                key={faq.question}
                className={`group rounded-lg border bg-[#0f1b33]/88 p-5 shadow-[0_22px_70px_rgba(0,0,0,0.2)] backdrop-blur-xl transition duration-300 open:bg-[#13213d]/92 ${
                  isAccent ? "border-[#f0c84b]/30" : "border-blue-200/12"
                }`}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-bold text-white">
                  {faq.question}
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 transition group-open:rotate-180 ${
                      isAccent ? "text-[#f0c84b]" : "text-[#8dbbff]"
                    }`}
                  />
                </summary>
                <p className="mt-4 text-sm leading-6 text-[#c4cde0]">
                  {faq.answer}
                </p>
              </details>
            )
          })}
        </div>
      </div>
    </section>
  )
}
