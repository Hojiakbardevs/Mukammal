import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, X } from "lucide-react"
import { Button } from "@/components/ui/button"

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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/95 p-8 text-center shadow-2xl backdrop-blur-xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>

            <div className="mb-5 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
                <CheckCircle2 className="h-10 w-10 text-green-400" />
              </div>
            </div>

            <h2 className="mb-2 text-2xl font-bold text-white">
              Muvaffaqiyatli yuborildi!
            </h2>
            <p className="mb-1 text-white/60 text-sm">
              Arizangiz qabul qilindi.
            </p>
            <p className="mb-6 text-sm text-white/60">
              <span className="font-semibold text-white">{email}</span> manzilingizga
              tez orada xabar yuboramiz.
            </p>

            <Button
              onClick={onClose}
              className="h-11 w-full rounded-xl bg-white font-semibold text-black hover:bg-white/90"
            >
              Bosh sahifaga qaytish
            </Button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
