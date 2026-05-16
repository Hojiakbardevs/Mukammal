import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, CheckCircle2, Mail, X } from "lucide-react"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  email: string
}

export function SuccessModal({ isOpen, onClose, email }: SuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-modal-title"
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Modalni yopish"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-slate-950/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 26 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 26 }}
            transition={{
              type: "spring",
              damping: 24,
              stiffness: 260,
            }}
            onClick={(event) => event.stopPropagation()}
            className="relative z-10 w-full max-w-110 overflow-hidden rounded-[2rem] border border-white/10 bg-[#081225] shadow-[0_30px_120px_rgba(15,23,42,0.65)]"
          >
            {/* Background texture */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[42px_42px]" />
            <div className="pointer-events-none absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-400/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-blue-600/15 blur-3xl" />

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Yopish"
              className="absolute right-5 top-5 z-20 rounded-full border border-white/10 bg-white/5 p-2 text-white/45 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative px-6 pb-7 pt-10 text-center sm:px-8 sm:pb-8">
              {/* Success icon */}
              <div className="mb-7 flex justify-center">
                <div className="relative flex h-24 w-24 items-center justify-center">
                  <motion.div
                    className="absolute h-24 w-24 rounded-full border border-sky-300/25"
                    animate={{ scale: [1, 1.18, 1], opacity: [0.45, 0.05, 0.45] }}
                    transition={{
                      duration: 2.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <motion.div
                    className="absolute h-20 w-20 rounded-full bg-sky-400/10"
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{
                      duration: 2.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <motion.div
                    initial={{ scale: 0.4, opacity: 0, rotate: -30 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      damping: 14,
                      stiffness: 220,
                      delay: 0.12,
                    }}
                    className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-sky-300/30 bg-sky-400/15 shadow-[0_0_40px_rgba(56,189,248,0.22)]"
                  >
                    <CheckCircle2 className="h-8 w-8 text-sky-300" />
                  </motion.div>
                </div>
              </div>

              {/* Content */}
              <motion.h2
                id="success-modal-title"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="font-heading text-[1.65rem] font-semibold leading-tight tracking-tight text-white"
              >
                Arizangiz qabul qilindi
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-300"
              >
                Ma'lumotlaringiz muvaffaqiyatli yuborildi. Arizangiz ko'rib
                chiqilgandan so'ng siz bilan bog'lanamiz.
              </motion.p>

              {/* Email badge */}
              {email && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.36 }}
                  className="mt-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-left"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-400/10">
                    <Mail className="h-4 w-4 text-sky-300" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                      Email manzil
                    </p>
                    <p className="truncate text-sm font-semibold text-white">
                      {email}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* CTA */}
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.44 }}
                onClick={onClose}
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-sky-400 via-blue-500 to-[#246BFE] px-6 py-3.5 font-heading text-xs font-bold uppercase tracking-[0.18em] text-white shadow-[0_18px_44px_rgba(36,107,254,0.32)] transition hover:shadow-[0_22px_58px_rgba(36,107,254,0.44)] active:scale-[0.98]"
              >
                Bosh sahifaga qaytish
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}