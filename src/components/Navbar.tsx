import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { BrainCircuit, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/#hero", label: "Bosh sahifa" },
  { href: "/#about", label: "Loyiha haqida" },
  { href: "/#courses", label: "Yo'nalishlar" },
  { href: "/#timeline", label: "Timeline" },
  { href: "/#process", label: "O'quv jarayoni" },
  { href: "/#faq", label: "FAQ" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-black/70 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-100">
            <BrainCircuit className="h-5 w-5" />
          </div>
          <span className="hidden font-bold text-white sm:block">
            Mukammal trening
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-1.5 text-sm text-white/65 transition-colors hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/register"
            className="inline-flex h-9 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-black transition-all hover:scale-105 hover:bg-white/90"
          >
            Ro'yxatdan o'tish
          </Link>
        </div>

        <button
          className="rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menyu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-white/10 bg-black/90 px-6 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/register"
              className="mt-2 rounded-xl bg-primary px-3 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-primary/80"
              onClick={() => setIsOpen(false)}
            >
              Ro'yxatdan o'tish
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
