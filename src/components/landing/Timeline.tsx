import { timeline } from "@/components/landing/data"

const stepLabels = ["Boshlanish", "Tanlov", "Amaliyot"]

function TimelineCard({
  step,
  index,
  align = "left",
}: {
  step: (typeof timeline)[number]
  index: number
  align?: "left" | "right"
}) {
  const isAccent = index === 1

  return (
    <article
      className={`rounded-lg border bg-[#0f1b33]/88 p-6 shadow-[0_22px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl ${
        isAccent ? "border-[#f0c84b]/30" : "border-blue-200/12"
      } ${align === "right" ? "text-right" : "text-left"}`}
    >
      <div
        className={`mb-4 inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-black tracking-[0.16em] uppercase ${
          isAccent
            ? "border-[#f0c84b]/25 bg-[#f0c84b]/10 text-[#f0c84b]"
            : "border-blue-300/15 bg-blue-300/8 text-[#8dbbff]"
        }`}
      >
        {step.duration}
      </div>

      <h3 className="text-xl leading-7 font-semibold text-[#f5f7ff]">
        {step.title}
      </h3>

      <p className="mt-3 text-base leading-7 font-medium text-[#c4cde0]">
        {step.description}
      </p>
    </article>
  )
}

function StepNode({ index }: { index: number }) {
  const isAccent = index === 1

  return (
    <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#071126]">
      <div
        className={`absolute inset-0 rounded-full blur-md ${
          isAccent ? "bg-[#f0c84b]/22" : "bg-blue-300/18"
        }`}
      />
      <div
        className={`relative flex h-12 w-12 items-center justify-center rounded-full border text-sm font-black ${
          isAccent
            ? "border-[#f0c84b]/75 bg-[#2d2c24] text-[#f0c84b]"
            : "border-blue-200/35 bg-[#172a4f] text-[#dbeafe]"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </div>
    </div>
  )
}

function TimelineMeta({
  index,
  align = "left",
}: {
  index: number
  align?: "left" | "right"
}) {
  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      <p className="font-heading text-xs tracking-[0.18em] text-[#8b94aa] uppercase">
        Bosqich {String(index + 1).padStart(2, "0")}
      </p>
      <p className="mt-2 text-base font-semibold text-[#f5f7ff]">
        {stepLabels[index]}
      </p>
    </div>
  )
}

export function Timeline() {
  return (
    <section
      id="timeline"
      className="relative overflow-hidden bg-[#071126] px-6 py-20 text-white sm:py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(37,99,235,0.22),transparent_42%),linear-gradient(180deg,#071126_0%,#08111f_48%,#0a0f1e_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-blue-200/8" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-blue-200/8" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-heading text-xs tracking-[0.22em] text-[#8dbbff] uppercase">
            O'quv yo'l xaritasi
          </p>
          <h2 className="mt-3 font-heading text-[clamp(2rem,3vw,2.65rem)] leading-tight text-white">
            Dastur bosqichlari
          </h2>
          <p className="mt-4 text-base leading-7 text-[#c4cde0]">
            Avval barcha tinglovchilar umumiy AI asoslarini o'zlashtiradi, keyin
            o'z ehtiyojiga mos ixtisoslashuv yo'nalishida davom etadi.
          </p>
        </div>

        <div className="relative mx-auto mt-14 hidden max-w-5xl space-y-8 sm:block">
          <div className="absolute top-10 bottom-10 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-blue-200/20 to-transparent" />

          {timeline.map((step, index) => {
            const isLeft = index % 2 === 0

            return (
              <div
                key={step.title}
                className="grid grid-cols-[minmax(0,1fr)_5rem_minmax(0,1fr)] items-center gap-x-8"
              >
                <div className={isLeft ? "" : "text-right"}>
                  {isLeft ? (
                    <TimelineCard step={step} index={index} align="right" />
                  ) : (
                    <TimelineMeta index={index} align="right" />
                  )}
                </div>

                <div className="flex justify-center">
                  <StepNode index={index} />
                </div>

                <div>
                  {isLeft ? (
                    <TimelineMeta index={index} />
                  ) : (
                    <TimelineCard step={step} index={index} />
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="relative mx-auto mt-12 space-y-7 sm:hidden">
          <div className="absolute top-8 bottom-8 left-8 w-px bg-gradient-to-b from-transparent via-blue-200/20 to-transparent" />

          {timeline.map((step, index) => (
            <div
              key={step.title}
              className="relative grid grid-cols-[4rem_1fr] gap-4"
            >
              <StepNode index={index} />
              <div>
                <TimelineMeta index={index} />
                <div className="mt-3">
                  <TimelineCard step={step} index={index} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
