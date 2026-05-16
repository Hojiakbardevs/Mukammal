import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import Logos from "@/assets/airi_oq.png"

const navLinks = [
  { href: "/#about", label: "Dastur" },
  { href: "/#courses", label: "Yo'nalishlar" },
  { href: "/#faq", label: "Savollar" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-sky-500/10 bg-[linear-gradient(to_right,#08152b,#010b2f)] shadow-[0_4px_40px_rgba(0,0,0,0.6)]"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" onClick={handleLogoClick}>
          <img
            src={Logos}
            alt="AirI Logo"
            width={2780}
            height={473}
            loading="eager"
            decoding="async"
            sizes="282px"
            fetchPriority="high"
            className="h-12 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative rounded-xl px-5 py-2.5 font-sans text-[14px] font-medium tracking-wide text-sky-100/70 transition-all duration-200 hover:bg-sky-400/10 hover:text-sky-50 hover:shadow-[0_0_12px_rgba(56,189,248,0.15)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-linear-to-r from-sky-500 to-cyan-400 px-6 font-heading text-[12px] font-bold tracking-widest text-white shadow-[0_0_20px_rgba(56,189,248,0.35)] transition-all duration-200 hover:scale-105 hover:from-sky-400 hover:to-cyan-300 hover:shadow-[0_0_30px_rgba(56,189,248,0.55)] active:scale-95"
          >
            PLATFORMAGA KIRISH
          </Link>
        </div>

        <button
          className="rounded-xl p-2.5 text-sky-200/70 transition-all hover:bg-sky-500/15 hover:text-sky-100 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menyu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300 md:hidden",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="border-t border-sky-500/10 bg-[linear-gradient(to_right,#08152b,#010b2f)] px-6 py-4">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-xl px-4 py-3 font-sans text-[14px] font-medium tracking-wide text-sky-100/65 transition-all hover:bg-sky-400/10 hover:text-sky-50"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/login"
              className="mt-3 flex items-center justify-center rounded-xl bg-linear-to-r from-sky-500 to-cyan-400 px-4 py-3 font-heading text-[12px] font-bold tracking-widest text-white shadow-[0_0_18px_rgba(56,189,248,0.30)] transition-all hover:from-sky-400 hover:to-cyan-300"
              onClick={() => setIsOpen(false)}
            >
              PLATFORMAGA KIRISH
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
