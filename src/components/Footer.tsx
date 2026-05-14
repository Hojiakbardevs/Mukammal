import {
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  Globe2,
} from "lucide-react"

import Logos from "@/assets/airi_oq.png"

const footerLinks = [
  { href: "#about", label: "Loyiha haqida" },
  { href: "#timeline", label: "Dastur" },
  { href: "#news", label: "Yangiliklar" },
  { href: "#registration", label: "Bog'lanish" },
]

const contacts = [
  { icon: Phone, label: "+998 71 200-00-00" },
  { icon: Mail, label: "info@ai-academy.uz" },
  { icon: MapPin, label: "Toshkent sh., IT Park binosi" },
]

const socials = [
  { icon: Share2, label: "share" },
  { icon: Globe2, label: "public" },
  { icon: MessageCircle, label: "forum" },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#071126] px-6 pt-16 pb-8 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.16),transparent_38%),linear-gradient(180deg,#071126_0%,#08111f_48%,#0a0f1e_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-blue-200/8" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-blue-200/10 pb-10 md:grid-cols-[1.4fr_0.8fr_1fr_0.8fr]">
          <div>
            <a href="#" className="inline-flex items-center">
              <img
                src={Logos}
                alt="AI Academy"
                className="h-12 w-auto object-contain"
              />
            </a>
            <p className="mt-5 max-w-sm text-base leading-7 text-[#c4cde0]">
              O'zbekistonda sun'iy intellekt sohasini rivojlantirish va yuqori
              malakali mutaxassislar tayyorlash markazi.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-sm tracking-[0.18em] text-[#8dbbff] uppercase">
              Tezkor havolalar
            </h2>
            <nav className="mt-5 grid gap-3 text-sm font-medium text-[#c4cde0]">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="transition hover:text-[#f0c84b]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="font-heading text-sm tracking-[0.18em] text-[#8dbbff] uppercase">
              Aloqa
            </h2>
            <div className="mt-5 grid gap-4 text-sm font-medium text-[#c4cde0]">
              {contacts.map((contact) => (
                <div key={contact.label} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200/12 bg-[#0f1b33]/88 text-[#8dbbff]">
                    <contact.icon className="h-4 w-4" />
                  </span>
                  <span>{contact.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-heading text-sm tracking-[0.18em] text-[#8dbbff] uppercase">
              Ijtimoiy tarmoqlar
            </h2>
            <div className="mt-5 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-blue-200/12 bg-[#0f1b33]/88 text-[#c4cde0] transition hover:border-[#f0c84b]/35 hover:text-[#f0c84b]"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="pt-7 text-sm text-[#8b94aa]">
          © 2024 Institute for Advanced AI Education. All Research Reserved.
        </p>
      </div>
    </footer>
  )
}
