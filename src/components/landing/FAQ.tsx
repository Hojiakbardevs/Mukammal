import { ChevronDown, HelpCircle } from "lucide-react"

import { faqs } from "@/components/landing/data"

export function FAQ() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-[#071126] px-4 py-14 text-white sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:py-24"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(96,165,250,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.06)_1px,transparent_1px)] bg-size-[60px_60px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(37,99,235,0.18),transparent_44%),linear-gradient(180deg,rgba(7,17,38,0.12),rgba(7,17,38,0.88))]" />

      <div className="absolute inset-x-0 top-0 h-px bg-blue-200/10" />

      <div className="relative mx-auto max-w-353.5">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12 lg:mb-14">
          <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-blue-200/10 bg-[#0f1b33]/90 shadow-[0_18px_50px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:mb-5 sm:h-12 sm:w-12 sm:rounded-2xl">
            <HelpCircle className="h-5 w-5 text-[#8dbbff]" strokeWidth={2.3} />
          </div>

          <p className="font-heading text-xs tracking-[0.22em] text-[#8dbbff] uppercase">
            FAQ
          </p>

          <h2 className="mt-3 font-heading text-[clamp(1.75rem,6vw,2.35rem)] leading-tight text-white lg:text-[clamp(2rem,3vw,2.65rem)]">
            Ko&apos;p beriladigan savollar
          </h2>

          <p className="mt-4 text-sm leading-6 text-[#c4cde0] sm:text-base sm:leading-7">
            Dastur formati, yo&apos;nalishlar va sertifikat bo&apos;yicha eng
            muhim savollarga qisqa va aniq javoblar.
          </p>
        </div>

        <div className="mx-auto max-w-4xl space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => {
            const isAccent = index === 1

            return (
              <details
                key={faq.question}
                className={`group relative overflow-hidden rounded-xl border bg-[#0f1b33]/86 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl transition duration-300 open:bg-[#13213d]/94 hover:-translate-y-1 hover:bg-[#13213d]/94 sm:p-5 lg:p-6 ${
                  isAccent
                    ? "border-sky-300/30 hover:border-sky-300/45"
                    : "border-blue-200/10 hover:border-blue-200/22"
                }`}
              >
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(96,165,250,0.12),transparent_48%)] opacity-0 transition duration-300 group-open:opacity-100 group-hover:opacity-100" />

                <summary className="relative flex cursor-pointer list-none items-start justify-between gap-5 text-left">
                  <div className="flex gap-3 sm:gap-4">
                    <div
                      className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg sm:h-10 sm:w-10 sm:rounded-xl ${
                        isAccent ? "bg-sky-400/12" : "bg-[#172a4f]"
                      }`}
                    >
                      <span
                        className={`text-sm font-bold ${
                          isAccent ? "text-sky-300" : "text-[#8dbbff]"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="text-sm leading-6 font-semibold text-[#f2edf8] sm:text-base sm:leading-7 lg:text-lg">
                      {faq.question}
                    </h3>
                  </div>

                  <ChevronDown
                    className={`mt-1.5 h-5 w-5 shrink-0 transition duration-300 group-open:rotate-180 sm:mt-2 ${
                      isAccent ? "text-sky-300" : "text-[#8dbbff]"
                    }`}
                    strokeWidth={2.4}
                  />
                </summary>

                <div className="relative mt-4 border-t border-blue-200/10 pt-4 sm:mt-5 sm:pt-5">
                  <p className="text-sm leading-7 font-medium text-[#c4cde0] sm:text-base">
                    {faq.answer}
                  </p>
                </div>
              </details>
            )
          })}
        </div>
      </div>
    </section>
  )
}
