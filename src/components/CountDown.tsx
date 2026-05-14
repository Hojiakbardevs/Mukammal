import { useEffect, useState } from "react"

type Countdown = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface CountdownBadgeProps {
  target?: string // ISO datetime string, optionally with timezone offset
  startedText?: string // text to show when target time is reached/passed
}

function CountdownBadge({
  target = "2026-06-01T00:12:00+05:00",
  startedText,
}: CountdownBadgeProps) {
  const actualStartedText = startedText || "Ro‘yxatdan o‘tish yakunlandi"

  const [timeLeft, setTimeLeft] = useState<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const end = new Date(target).getTime()

    const tick = () => {
      const now = Date.now()
      const diff = end - now

      if (diff <= 0) {
        setStarted(true)
        return
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }

    // initial tick to avoid 1s delay
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [target])

  return (
    <div className="group relative inline-flex w-full scale-[1.01] flex-col items-center gap-3">
      <span className="md:text-md text-center font-heading text-sm tracking-wider text-white/70 uppercase">
        Ro‘yxatdan o‘tish yakunlanishiga qoldi
      </span>
      <div className="absolute inset-0 rounded-2xl bg-blue-500/10 blur-xl transition-all duration-500 group-hover:bg-blue-500/20" />

      <div className="relative z-10 grid w-full grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-3 py-3 shadow-[0_0_24px_rgba(255,255,255,0.1)] backdrop-blur-md sm:gap-3 sm:px-5">
        {started ? (
          <span className="col-span-7 text-center font-heading text-base tracking-wider text-cyan-300 uppercase sm:text-lg">
            {actualStartedText}
          </span>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <span className="font-heading text-xl leading-none text-white tabular-nums sm:text-3xl">
                {String(timeLeft.days).padStart(2, "0")}
              </span>
              <span className="mt-1 text-[10px] font-medium tracking-wide text-white/50 uppercase sm:text-xs">
                Kun
              </span>
            </div>
            <span className="pb-3 font-heading text-lg text-white/35 sm:text-2xl">
              :
            </span>
            <div className="flex flex-col items-center">
              <span className="font-heading text-xl leading-none text-white tabular-nums sm:text-3xl">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="mt-1 text-[10px] font-medium tracking-wide text-white/50 uppercase sm:text-xs">
                Soat
              </span>
            </div>
            <span className="pb-3 font-heading text-lg text-white/35 sm:text-2xl">
              :
            </span>
            <div className="flex flex-col items-center">
              <span className="font-heading text-xl leading-none text-white tabular-nums sm:text-3xl">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="mt-1 text-[10px] font-medium tracking-wide text-white/50 uppercase sm:text-xs">
                Daqiqa
              </span>
            </div>
            <span className="pb-3 font-heading text-lg text-white/35 sm:text-2xl">
              :
            </span>
            <div className="flex flex-col items-center">
              <span className="font-heading text-xl leading-none text-white tabular-nums sm:text-3xl">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="mt-1 text-[10px] font-medium tracking-wide text-white/50 uppercase sm:text-xs">
                Soniya
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CountdownBadge
