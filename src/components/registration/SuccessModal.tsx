import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, X, ArrowRight, Mail } from "lucide-react"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  email: string
}

export function SuccessModal({ isOpen, onClose, email }: SuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#070b17]/90 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 32 }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#08122a] shadow-[0_0_100px_rgba(36,107,254,0.22)]"
          >
            {/* Grid pattern inside modal */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(36,107,254,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(36,107,254,0.055)_1px,transparent_1px)] bg-size-[40px_40px]" />
            {/* Top glow */}
            <div className="pointer-events-none absolute top-0 left-1/2 h-48 w-80 -translate-x-1/2 rounded-full bg-sky-500/12 blur-[60px]" />

            <div className="relative px-8 pt-10 pb-8 text-center">
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 rounded-full p-1.5 text-white/25 transition-colors hover:bg-white/8 hover:text-white/70"
              >
                <X size={18} />
              </button>

              {/* Animated check icon */}
              <div className="mb-7 flex justify-center">
                <div className="relative flex items-center justify-center">
                  {/* Outer pulse ring */}
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.25, 0, 0.25] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute h-24 w-24 rounded-full border border-sky-400/30"
                  />
                  {/* Middle ring */}
                  <motion.div
                    animate={{ scale: [1, 1.22, 1], opacity: [0.35, 0, 0.35] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                    className="absolute h-20 w-20 rounded-full border border-sky-400/25"
                  />
                  {/* Icon circle */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-sky-400/30 bg-sky-500/10 shadow-[0_0_30px_rgba(56,189,248,0.2)]">
                    <motion.div
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", damping: 14, stiffness: 220, delay: 0.15 }}
                    >
                      <CheckCircle2 className="h-8 w-8 text-sky-400" />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="font-heading mb-2 text-[1.55rem] leading-tight text-white"
              >
                Arizangiz qabul qilindi!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mb-5 text-sm leading-6 text-white"
              >
                Ko'rib chiqgandan so'ng siz bilan bog'lanamiz.
              </motion.p>

              {/* Email badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42 }}
                className="mb-7 flex items-center justify-center gap-2 rounded-xl border border-sky-400/20 bg-sky-500/8 px-4 py-2.5"
              >
                <Mail className="h-4 w-4 shrink-0 text-white" />
                <span className="text-sm font-semibold text-white">{email}</span>
              </motion.div>

              {/* CTA button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={onClose}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-sky-500 to-[#246BFE] px-6 py-3 font-heading text-[11px] font-bold tracking-widest text-white uppercase shadow-[0_0_24px_rgba(36,107,254,0.4)] transition-all hover:from-sky-400 hover:to-blue-500 hover:shadow-[0_0_36px_rgba(36,107,254,0.6)] active:scale-[0.97]"
              >
                Bosh sahifaga qaytish
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
