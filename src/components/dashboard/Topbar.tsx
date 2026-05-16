import { Menu, Search } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

import { useAuth } from "@/hooks/useAuth"

const titleByPath: Record<string, string> = {
  "/app": "Salom, Aziza!",
  "/app/courses": "Mening kurslarim",
  "/app/course": "Kurs tafsiloti",
  "/app/lesson": "Transformerlar va attention",
  "/app/tasks": "Topshiriqlar",
  "/app/grades": "Mening baholarim",
  "/app/schedule": "Dars jadvali",
  "/app/certificates": "Sertifikatlar va yutuqlar",
  "/app/profile": "Mening profilim",
  "/teacher": "Xush kelibsiz, Aziza opa",
  "/teacher/courses": "Mening kurslarim",
  "/teacher/course-detail": "Kurs va modullar",
  "/teacher/schedule": "Trener jadvali",
  "/teacher/attendance": "Davomat",
  "/teacher/grading": "Tekshirish navbati",
  "/teacher/ai-grading": "SI baholash nazorati",
  "/teacher/final": "Yakuniy baholarni tasdiqlash",
  "/teacher/risk": "Risk paneli",
  "/teacher/qa": "Q&A moderatsiya",
  "/admin": "Tahlil markazi",
  "/admin/users": "Foydalanuvchilar",
  "/admin/courses": "Kurslar va o‘quv oqimlari",
  "/admin/roles": "Rollar va ruxsatlar",
  "/admin/certificates": "Sertifikat shablonlari",
  "/admin/surveys": "So‘rovnomalar",
  "/admin/ai-governance": "SI boshqaruvi",
  "/admin/audit": "Audit jurnali",
  "/admin/moderation": "Kontent moderatsiyasi",
}

function resolveTitle(pathname: string) {
  if (pathname.startsWith("/app/courses/")) return "Kurs tafsiloti"
  if (pathname.startsWith("/app/lessons/")) return "Dars oynasi"

  return titleByPath[pathname] ?? "AIRI Training LMS"
}

export function Topbar() {
  const { pathname } = useLocation()
  const { user } = useAuth()
  const title = resolveTitle(pathname)

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-600 lg:hidden"
          aria-label="Menyu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="min-w-0 flex-1">
          <div className="text-xs font-medium text-slate-500">
            {user.role === "admin"
              ? "Super Admin"
              : user.role === "teacher"
                ? "Trener"
                : "Tinglovchi"}
          </div>
          <h1 className="truncate text-xl font-bold text-slate-950">{title}</h1>
        </div>

        <label className="hidden h-10 w-full max-w-xs items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-500 md:flex">
          <Search className="h-4 w-4" />
          <input
            className="w-full bg-transparent outline-none placeholder:text-slate-400"
            placeholder="Kurs, dars yoki foydalanuvchini qidiring"
          />
        </label>

        <Link
          to="/"
          className="hidden rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-slate-950 sm:inline-flex"
        >
          Landing
        </Link>
      </div>
    </header>
  )
}
