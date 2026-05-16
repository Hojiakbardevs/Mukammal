export type LmsRole = "student" | "teacher" | "admin"

export type LmsNavEntry =
  | {
      section: string
    }
  | {
      icon: string
      label: string
      href: string
      pageKey: string
      badge?: {
        kind?: "amber" | "mute" | "red"
        text: string
      }
    }

export const pagePathByKey: Record<string, string> = {
  "s-dashboard": "/app",
  "s-courses": "/app/courses",
  "s-course": "/app/courses/nlp",
  "s-lesson": "/app/lessons/transformers-attention",
  "s-tasks": "/app/tasks",
  "s-grades": "/app/grades",
  "s-schedule": "/app/schedule",
  "s-certs": "/app/certificates",
  "s-profile": "/app/profile",

  "t-dashboard": "/teacher",
  "t-courses": "/teacher/courses",
  "t-course-detail": "/teacher/courses/ai-fundamentals",
  "t-schedule": "/teacher/schedule",
  "t-attendance": "/teacher/attendance",
  "t-grading": "/teacher/grading",
  "t-ai-grading": "/teacher/ai-grading",
  "t-final": "/teacher/final-grades",
  "t-risk": "/teacher/risk",
  "t-qa": "/teacher/qa",

  "a-analytics": "/admin",
  "a-courses": "/admin/courses",
  "a-users": "/admin/users",
  "a-roles": "/admin/roles",
  "a-certs": "/admin/certificates",
  "a-surveys": "/admin/surveys",
  "a-ai-gov": "/admin/ai-governance",
  "a-audit": "/admin/audit",
  "a-moderation": "/admin/moderation",
}

export const pageMetaByKey: Record<string, { crumb: string; title: string }> = {
  "s-dashboard": { crumb: "Talaba / Bosh sahifa", title: "Salom, Aziza!" },
  "s-courses": { crumb: "Talaba / O'quv", title: "Mening kurslarim" },
  "s-course": { crumb: "Talaba / Kurs · NLP", title: "Tabiiy tilni qayta ishlash (NLP)" },
  "s-lesson": { crumb: "Talaba / Dars", title: "Transformerlar va attention" },
  "s-tasks": { crumb: "Talaba / Akademik", title: "Topshiriqlar" },
  "s-grades": { crumb: "Talaba / Akademik", title: "Mening baholarim" },
  "s-schedule": { crumb: "Talaba / Akademik", title: "Dars jadvali" },
  "s-certs": { crumb: "Talaba / Muvaffaqiyat", title: "Sertifikatlar va yutuqlar" },
  "s-profile": { crumb: "Talaba / Profil", title: "Mening profilim" },

  "t-dashboard": { crumb: "Teacher / Bosh sahifa", title: "Xush kelibsiz, Aziza opa" },
  "t-courses": { crumb: "Teacher / O'quv boshqaruvi", title: "Mening kurslarim" },
  "t-course-detail": { crumb: "Teacher / Kurs · AI fundamentals", title: "AI Fundamentals · Modul boshqaruvi" },
  "t-schedule": { crumb: "Teacher / Jadval", title: "Dars jadvali" },
  "t-attendance": { crumb: "Teacher / Davomat", title: "Davomat" },
  "t-grading": { crumb: "Teacher / Baholash", title: "Tekshirish navbati" },
  "t-ai-grading": { crumb: "Teacher / Baholash · AI", title: "AI grading review" },
  "t-final": { crumb: "Teacher / Baholash", title: "Yakuniy baholarni tasdiqlash" },
  "t-risk": { crumb: "Teacher / Talaba", title: "Risk paneli — erta yordam radari" },
  "t-qa": { crumb: "Teacher / Talaba", title: "Q&A moderatsiya" },

  "a-analytics": { crumb: "Super Admin / Governance", title: "Tahlil markazi" },
  "a-courses": { crumb: "Super Admin / O'quv boshqaruvi", title: "Kurslar va O'quv oqimlari" },
  "a-users": { crumb: "Super Admin / Access", title: "Foydalanuvchilar" },
  "a-roles": { crumb: "Super Admin / Access", title: "Rollar va ruxsatlar" },
  "a-certs": { crumb: "Super Admin / Kontent", title: "Sertifikat shablonlari" },
  "a-surveys": { crumb: "Super Admin / Kontent", title: "So'rovnomalar" },
  "a-ai-gov": { crumb: "Super Admin / Politika", title: "AI boshqaruvi va moderatsiya sozlamalari" },
  "a-audit": { crumb: "Super Admin / Ishonchlilik", title: "Audit jurnali" },
  "a-moderation": { crumb: "Super Admin / Ishonchlilik", title: "Kontent moderatsiya navbati" },
}

export const studentNav: LmsNavEntry[] = [
  { section: "Asosiy" },
  { icon: "layout-dashboard", label: "Bosh sahifa", href: "/app", pageKey: "s-dashboard" },
  { icon: "books", label: "Mening kurslarim", href: "/app/courses", pageKey: "s-courses" },
  { section: "Dars" },
  { icon: "player-play", label: "Joriy dars", href: "/app/lessons/transformers-attention", pageKey: "s-lesson" },
  { icon: "info-circle", label: "Kurs tafsiloti", href: "/app/courses/nlp", pageKey: "s-course" },
  { section: "Akademik" },
  { icon: "file-text", label: "Topshiriqlar", href: "/app/tasks", pageKey: "s-tasks", badge: { kind: "amber", text: "3" } },
  { icon: "stamp", label: "Mening baholarim", href: "/app/grades", pageKey: "s-grades" },
  { icon: "calendar", label: "Dars jadvali", href: "/app/schedule", pageKey: "s-schedule" },
  { section: "Muvaffaqiyat" },
  { icon: "award", label: "Sertifikatlar", href: "/app/certificates", pageKey: "s-certs", badge: { kind: "mute", text: "2" } },
  { icon: "user", label: "Mening profilim", href: "/app/profile", pageKey: "s-profile" },
]

export const teacherNav: LmsNavEntry[] = [
  { section: "Asosiy" },
  { icon: "layout-dashboard", label: "Dashboard", href: "/teacher", pageKey: "t-dashboard" },
  { section: "O'quv boshqaruvi" },
  { icon: "books", label: "Mening kurslarim", href: "/teacher/courses", pageKey: "t-courses" },
  { icon: "list-tree", label: "Kurs va modullar", href: "/teacher/courses/ai-fundamentals", pageKey: "t-course-detail" },
  { icon: "calendar-time", label: "Jadval", href: "/teacher/schedule", pageKey: "t-schedule" },
  { icon: "user-check", label: "Davomat", href: "/teacher/attendance", pageKey: "t-attendance", badge: { kind: "amber", text: "2" } },
  { section: "Baholash" },
  { icon: "file-check", label: "Tekshirish navbati", href: "/teacher/grading", pageKey: "t-grading", badge: { kind: "red", text: "18" } },
  { icon: "sparkles", label: "AI grading review", href: "/teacher/ai-grading", pageKey: "t-ai-grading", badge: { kind: "mute", text: "AI" } },
  { icon: "stamp", label: "Yakuniy baholar", href: "/teacher/final-grades", pageKey: "t-final" },
  { section: "Talaba" },
  { icon: "alert-triangle", label: "Risk paneli", href: "/teacher/risk", pageKey: "t-risk", badge: { kind: "red", text: "7" } },
  { icon: "messages", label: "Q&A moderatsiya", href: "/teacher/qa", pageKey: "t-qa", badge: { kind: "amber", text: "4" } },
]

export const adminNav: LmsNavEntry[] = [
  { section: "Governance" },
  { icon: "chart-pie", label: "Tahlil markazi", href: "/admin", pageKey: "a-analytics" },
  { icon: "presentation", label: "Kurslar & O'quv oqimlari", href: "/admin/courses", pageKey: "a-courses" },
  { section: "Foydalanuvchi va access" },
  { icon: "users", label: "Foydalanuvchilar", href: "/admin/users", pageKey: "a-users" },
  { icon: "lock-square", label: "Rollar va ruxsatlar", href: "/admin/roles", pageKey: "a-roles" },
  { section: "Kontent va politika" },
  { icon: "award", label: "Sertifikat shablonlari", href: "/admin/certificates", pageKey: "a-certs" },
  { icon: "clipboard-list", label: "So'rovnomalar", href: "/admin/surveys", pageKey: "a-surveys" },
  { icon: "shield-check", label: "AI boshqaruvi", href: "/admin/ai-governance", pageKey: "a-ai-gov" },
  { section: "Audit & ishonchlilik" },
  { icon: "history", label: "Audit jurnali", href: "/admin/audit", pageKey: "a-audit" },
  { icon: "alert-octagon", label: "Moderatsiya", href: "/admin/moderation", pageKey: "a-moderation", badge: { kind: "amber", text: "3" } },
]

export const pageKeyByPath: Record<string, string> = Object.fromEntries(
  Object.entries(pagePathByKey).map(([key, path]) => [path, key])
)

export function getRoleFromPath(pathname: string): LmsRole {
  if (pathname.startsWith("/admin")) return "admin"
  if (pathname.startsWith("/teacher")) return "teacher"
  return "student"
}

export function getPageKeyFromPath(pathname: string) {
  if (pathname.startsWith("/app/courses/")) return "s-course"
  if (pathname.startsWith("/app/lessons/")) return "s-lesson"
  if (pathname.startsWith("/teacher/courses/")) return "t-course-detail"

  return pageKeyByPath[pathname] ?? "s-dashboard"
}
