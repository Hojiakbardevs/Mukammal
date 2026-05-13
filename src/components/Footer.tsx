import { BrainCircuit } from "lucide-react"

const footerLinks = [
  { href: "#about", label: "Loyiha haqida" },
  { href: "#courses", label: "Yo'nalishlar" },
  { href: "#timeline", label: "Timeline" },
  { href: "#registration", label: "Ro'yxatdan o'tish" },
]

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-200">
            <BrainCircuit className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold text-white">Mukammal trening</p>
            <p className="text-sm text-slate-500">
              Professor-o'qituvchilar uchun AI education dasturi
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-4 text-sm text-slate-400">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-cyan-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="text-sm text-slate-500">
          © 2026 Mukammal trening. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </footer>
  )
}
