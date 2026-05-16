import { lazy, Suspense, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, type Variants } from "framer-motion"
import { ArrowRight } from "lucide-react"

import CountdownBadge from "@/components/CountDown"

const NeuralNoise = lazy(() => import("../NeuralNoise"))

// ─── Typing effect hook ───────────────────────────────────────────────────────

const TYPING_TEXTS = [
  "Sun'iy intellekt bo'yicha malaka oshirish dasturi",
  "Professor-o'qituvchilar uchun zamonaviy ta'lim platformasi",
  "Raqamli ta'lim va ilmiy-tadqiqot ko'nikmalarini rivojlantirish",
]

const MotionLink = motion(Link)

type WindowWithIdleCallback = Window & {
  requestIdleCallback?: (
    callback: IdleRequestCallback,
    options?: IdleRequestOptions
  ) => number
  cancelIdleCallback?: (handle: number) => void
}

function useTypingEffect(
  texts: string[],
  typingSpeed = 88,
  deletingSpeed = 44,
  pauseMs = 1800
) {
  const [displayText, setDisplayText] = useState("")
  const [textIndex, setTextIndex] = useState(0)
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">(
    "typing"
  )

  useEffect(() => {
    const current = texts[textIndex]
    let timer: ReturnType<typeof setTimeout>

    if (phase === "typing") {
      if (displayText.length < current.length) {
        timer = setTimeout(
          () => setDisplayText(current.slice(0, displayText.length + 1)),
          typingSpeed
        )
      } else {
        timer = setTimeout(() => setPhase("pausing"), pauseMs)
      }
    } else if (phase === "pausing") {
      timer = setTimeout(() => setPhase("deleting"), 180)
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(
          () => setDisplayText(displayText.slice(0, -1)),
          deletingSpeed
        )
      } else {
        timer = setTimeout(() => {
          setTextIndex((i) => (i + 1) % texts.length)
          setPhase("typing")
        }, 0)
      }
    }

    return () => clearTimeout(timer)
  }, [
    displayText,
    phase,
    textIndex,
    texts,
    typingSpeed,
    deletingSpeed,
    pauseMs,
  ])

  return displayText
}

// ─── Data ─────────────────────────────────────────────────────────────────────

// ─── Animation variants ───────────────────────────────────────────────────────

const EASE_OUT: readonly [number, number, number, number] = [0.22, 1, 0.36, 1]

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE_OUT },
  },
}

// ─── Component ────────────────────────────────────────────────────────────────

const Hero = () => {
  const typedText = useTypingEffect(TYPING_TEXTS)
  const [showNoise, setShowNoise] = useState(false)

  useEffect(() => {
    const idleWindow = window as WindowWithIdleCallback
    if (idleWindow.requestIdleCallback) {
      const handle = idleWindow.requestIdleCallback(
        () => setShowNoise(true),
        { timeout: 1500 }
      )
      return () => idleWindow.cancelIdleCallback?.(handle)
    }

    const timeout = window.setTimeout(() => setShowNoise(true), 700)
    return () => window.clearTimeout(timeout)
  }, [])

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-28 pb-20"
    >
      {/* WebGL background */}
      {showNoise ? (
        <Suspense fallback={null}>
          <NeuralNoise />
        </Suspense>
      ) : null}

      {/* Readability overlay */}
      <div className="pointer-events-none absolute inset-0 z-1 bg-linear-to-br from-black via-blue-950 to-black opacity-70" />

      {/* Ambient glow blobs */}
      <motion.div
        className="pointer-events-none absolute top-1/3 left-1/2 z-1 h-130 w-130 -translate-x-1/2 -translate-y-1/3 rounded-full bg-cyan-500/10 blur-[140px]"
        animate={{ scale: [1, 1.14, 1], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute right-1/4 bottom-1/3 z-1 h-130 w-130 rounded-full bg-violet-500/10 blur-[110px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.6, 0.35] }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5,
        }}
      />

      {/* ── Main content ── */}
      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <div className="flex min-h-56 w-full items-start justify-center sm:min-h-48 md:min-h-52">
          <h1 className="font-heading text-4xl tracking-tight text-white uppercase sm:text-5xl md:text-6xl">
            {typedText}
            <motion.span
              className="ml-1 inline-block h-[0.85em] w-0.75 translate-y-[0.05em] rounded-sm bg-cyan-300 align-middle"
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                times: [0, 0.48, 0.5, 0.98],
              }}
            />
          </h1>
        </div>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="mt-7 max-w-2xl font-sans text-[17px] leading-8 text-slate-300 md:text-xl md:leading-9"
        >
          Ilmiy-tadqiqot institutlari va oliy ta'lim muassasalari
          professor-o'qituvchilari uchun sun'iy intellekt, raqamli ta'lim va
          zamonaviy ilmiy yondashuvlar bo'yicha intensiv malaka oshirish
          dasturi.
        </motion.p>

        {/* Countdown */}
        <motion.div variants={fadeUp} className="mt-10 w-full max-w-xl">
          <CountdownBadge target="2026-06-01T00:00:00+05:00" />
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          className="mt-9 flex flex-col items-center gap-4 sm:flex-row"
        >
          <MotionLink
            to="/register"
            className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-sky-500 to-cyan-400 px-8 text-sm font-bold text-white shadow-[0_0_24px_rgba(56,189,248,0.35)] sm:w-auto"
            whileHover={{
              y: -2,
              boxShadow: "0 0 38px rgba(56,189,248,0.55)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            Ro'yxatdan o'tish
            <ArrowRight className="h-4 w-4" />
          </MotionLink>

          <motion.a
            href="#about"
            className="inline-flex h-13 w-full items-center justify-center rounded-2xl border border-sky-500/30 bg-white/5 px-8 text-sm font-semibold text-sky-100 backdrop-blur-xl sm:w-auto"
            whileHover={{
              y: -2,
              borderColor: "rgba(56,189,248,0.5)",
              backgroundColor: "rgba(56,189,248,0.08)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            Dastur haqida
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
