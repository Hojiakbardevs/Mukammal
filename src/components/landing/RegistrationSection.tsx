import { useState } from "react"
import { ArrowRight, Loader2, Send } from "lucide-react"
import { Link } from "react-router-dom"

import { SectionHeader } from "@/components/landing/SectionHeader"

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwfuEtBehYe9SkiW8sk-hVud8Sw0ya-T-PvSfx8RCLmgoua6eWUQ_3jectdX9uqn-zjPA/exec"

type Status = "idle" | "loading" | "success" | "error"

export function RegistrationSection() {
  const [status, setStatus] = useState<Status>("idle")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("loading")

    const form = event.currentTarget
    const data = new FormData(form)
    const body = new URLSearchParams()

    body.append("firstName", String(data.get("firstName") || ""))
    body.append("lastName", String(data.get("lastName") || ""))
    body.append("email", String(data.get("email") || ""))
    body.append("phone", String(data.get("phone") || ""))
    body.append("institution", String(data.get("institution") || ""))
    body.append("position", "Professor-o'qituvchi")
    body.append("academicDegree", "Landing form")
    body.append(
      "participationMode",
      String(data.get("participationMode") || "offline")
    )
    body.append(
      "motivationLetter",
      `Tanlangan yo'nalish: ${String(data.get("track") || "")}`
    )

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body,
      })
      form.reset()
      setStatus("success")
    } catch (error) {
      console.error(error)
      setStatus("error")
    }
  }

  return (
    <section id="registration" className="px-6 py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <SectionHeader
            align="left"
            eyebrow="Registration form"
            title="Dasturga ariza qoldiring"
            description="Qisqa formani to'ldiring. Batafsil ariza kerak bo'lsa, alohida ro'yxatdan o'tish sahifasiga o'tishingiz mumkin."
          />
          <Link
            to="/register"
            className="inline-flex items-center gap-2 text-sm font-bold text-cyan-200 transition hover:text-white"
          >
            To'liq ariza formasiga o'tish
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/12 bg-slate-950/55 p-6 backdrop-blur-2xl md:p-8"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-300">Ism</span>
              <input
                name="firstName"
                required
                className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 text-sm text-white transition outline-none placeholder:text-slate-600 focus:border-cyan-300/55"
                placeholder="Ismingiz"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-300">
                Familiya
              </span>
              <input
                name="lastName"
                required
                className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 text-sm text-white transition outline-none placeholder:text-slate-600 focus:border-cyan-300/55"
                placeholder="Familiyangiz"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-300">Email</span>
              <input
                name="email"
                type="email"
                required
                className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 text-sm text-white transition outline-none placeholder:text-slate-600 focus:border-cyan-300/55"
                placeholder="name@example.com"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-300">
                Telefon
              </span>
              <input
                name="phone"
                required
                className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 text-sm text-white transition outline-none placeholder:text-slate-600 focus:border-cyan-300/55"
                placeholder="+998"
              />
            </label>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-300">
                Muassasa
              </span>
              <input
                name="institution"
                required
                className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 text-sm text-white transition outline-none placeholder:text-slate-600 focus:border-cyan-300/55"
                placeholder="Universitet yoki institut"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-300">
                Qatnashish formati
              </span>
              <select
                name="participationMode"
                className="h-12 w-full rounded-xl border border-white/10 bg-slate-950 px-4 text-sm text-white transition outline-none focus:border-cyan-300/55"
              >
                <option value="offline">Offline</option>
                <option value="online">Online</option>
              </select>
            </label>
          </div>

          <label className="mt-4 block space-y-2">
            <span className="text-sm font-medium text-slate-300">
              Qiziqqan yo'nalish
            </span>
            <select
              name="track"
              className="h-12 w-full rounded-xl border border-white/10 bg-slate-950 px-4 text-sm text-white transition outline-none focus:border-cyan-300/55"
            >
              <option>Sun'iy intellektni qo'llash asoslari</option>
              <option>
                Sun'iy intellekt, mashinaviy o'rganish va ma'lumotlar tahlili
              </option>
              <option>Kompyuterli ko'rish</option>
              <option>Tabiiy tilni qayta ishlash</option>
            </select>
          </label>

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-300 to-violet-400 text-sm font-bold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Yuborilmoqda...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Ariza yuborish
              </>
            )}
          </button>

          {status === "success" ? (
            <p className="mt-4 rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm text-cyan-100">
              Arizangiz qabul qilindi. Tez orada siz bilan bog'lanamiz.
            </p>
          ) : null}
          {status === "error" ? (
            <p className="mt-4 rounded-xl border border-red-300/20 bg-red-400/10 px-4 py-3 text-sm text-red-100">
              Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  )
}
