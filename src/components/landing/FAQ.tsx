import { ChevronDown } from "lucide-react"

import { faqs } from "@/components/landing/data"
import { SectionHeader } from "@/components/landing/SectionHeader"

export function FAQ() {
  return (
    <section id="faq" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          eyebrow="FAQ"
          title="Ko'p beriladigan savollar"
          description="Dastur formati, yo'nalishlar va sertifikat bo'yicha eng muhim savollarga qisqa javoblar."
        />

        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-bold text-white">
                {faq.question}
                <ChevronDown className="h-5 w-5 shrink-0 text-cyan-200 transition group-open:rotate-180" />
              </summary>
              <p className="mt-4 text-sm leading-6 text-slate-400">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
