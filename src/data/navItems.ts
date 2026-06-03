export type UserRole = "student" | "teacher" | "admin" | "super_admin"
export type LmsRole = UserRole

export type NavBadge = {
  kind?: "amber" | "mute" | "red"
  text: string
}

export type LmsNavEntry =
  | {
      section: string
    }
  | {
      icon: string
      label: string
      href: string
      pageKey: string
      badge?: NavBadge
    }

export const pagePathByKey: Record<string, string> = {
  "s-dashboard": "/app",
  "s-courses": "/app/courses",
  "s-course": "/app/courses/nlp",
  "s-lesson": "/app/lessons/current",
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
  "t-students": "/teacher/students",
  "t-ai-grading": "/teacher/ai-grading",
  "t-final": "/teacher/final-grades",
  "t-risk": "/teacher/risk",
  "t-qa": "/teacher/qa",

  "a-analytics": "/admin",
  "a-courses": "/admin/courses",
  "a-streams": "/admin/learning-streams",
  "a-reports": "/admin/reports",
  "a-users": "/admin/users",
  "a-roles": "/admin/roles",
  "a-certs": "/admin/certificates",
  "a-surveys": "/admin/surveys",
  "a-ai-gov": "/admin/ai-governance",
  "a-audit": "/admin/audit",
  "a-moderation": "/admin/moderation",

  "sa-analytics": "/super-admin",
  "sa-courses": "/super-admin/courses",
  "sa-streams": "/super-admin/learning-streams",
  "sa-users": "/super-admin/users",
  "sa-roles": "/super-admin/roles",
  "sa-certs": "/super-admin/certificates",
  "sa-surveys": "/super-admin/surveys",
  "sa-ai-gov": "/super-admin/ai-governance",
  "sa-audit": "/super-admin/audit",
  "sa-moderation": "/super-admin/moderation",
  "sa-settings": "/super-admin/settings",
}

export const pageMetaByKey: Record<string, { crumb: string; title: string }> = {
  "s-dashboard": { crumb: "Tinglovchi / Bosh sahifa", title: "Salom, Hojiakbar!" },
  "s-courses": { crumb: "Tinglovchi / O'quv", title: "Mening kurslarim" },
  "s-course": { crumb: "Tinglovchi / Kurs · NLP", title: "Tabiiy tilni qayta ishlash" },
  "s-lesson": { crumb: "Tinglovchi / Dars", title: "Transformerlar va attention" },
  "s-tasks": { crumb: "Tinglovchi / Akademik", title: "Topshiriqlar" },
  "s-grades": { crumb: "Tinglovchi / Akademik", title: "Mening baholarim" },
  "s-schedule": { crumb: "Tinglovchi / Akademik", title: "Dars jadvali" },
  "s-certs": { crumb: "Tinglovchi / Muvaffaqiyat", title: "Sertifikatlar va yutuqlar" },
  "s-profile": { crumb: "Tinglovchi / Profil", title: "Mening profilim" },

  "t-dashboard": { crumb: "Trener / Bosh sahifa", title: "Xush kelibsiz, Aziza opa" },
  "t-courses": { crumb: "Trener / O'quv boshqaruvi", title: "Mening kurslarim" },
  "t-course-detail": {
    crumb: "Trener / Kurs · SI asoslari",
    title: "Sun'iy intellekt asoslari · Modul boshqaruvi",
  },
  "t-schedule": { crumb: "Trener / Jadval", title: "Dars jadvali" },
  "t-attendance": { crumb: "Trener / Davomat", title: "Davomat" },
  "t-grading": { crumb: "Trener / Baholash", title: "Tekshirish navbati" },
  "t-students": { crumb: "Trener / Tinglovchilar", title: "Tinglovchilar va risk paneli" },
  "t-ai-grading": { crumb: "Trener / Baholash · SI", title: "SI baholash nazorati" },
  "t-final": { crumb: "Trener / Baholash", title: "Yakuniy baholarni tasdiqlash" },
  "t-risk": { crumb: "Trener / Tinglovchi", title: "Risk paneli · erta yordam radari" },
  "t-qa": { crumb: "Trener / Tinglovchi", title: "Q&A moderatsiya" },

  "a-analytics": { crumb: "Admin / Tahlil", title: "Tahlil markazi" },
  "a-courses": { crumb: "Admin / O'quv boshqaruvi", title: "Kurslar" },
  "a-streams": { crumb: "Admin / O'quv boshqaruvi", title: "O'quv oqimlari" },
  "a-reports": { crumb: "Admin / Hisobotlar", title: "Hisobotlar" },
  "a-users": { crumb: "Admin / Access", title: "Foydalanuvchilar" },
  "a-roles": { crumb: "Admin / Access", title: "Rollar va ruxsatlar" },
  "a-certs": { crumb: "Admin / Kontent", title: "Sertifikat shablonlari" },
  "a-surveys": { crumb: "Admin / Kontent", title: "So'rovnomalar" },
  "a-ai-gov": { crumb: "Admin / Politika", title: "SI boshqaruvi va moderatsiya sozlamalari" },
  "a-audit": { crumb: "Admin / Ishonchlilik", title: "Audit jurnali" },
  "a-moderation": { crumb: "Admin / Ishonchlilik", title: "Kontent moderatsiya navbati" },

  "sa-analytics": { crumb: "Super Admin / Tahlil", title: "Tahlil markazi" },
  "sa-courses": { crumb: "Super Admin / O'quv boshqaruvi", title: "Kurslar" },
  "sa-streams": { crumb: "Super Admin / O'quv boshqaruvi", title: "O'quv oqimlari" },
  "sa-users": { crumb: "Super Admin / Access", title: "Foydalanuvchilar" },
  "sa-roles": { crumb: "Super Admin / Access", title: "Rollar va ruxsatlar" },
  "sa-certs": { crumb: "Super Admin / Kontent", title: "Sertifikat shablonlari" },
  "sa-surveys": { crumb: "Super Admin / Kontent", title: "So'rovnomalar" },
  "sa-ai-gov": { crumb: "Super Admin / Politika", title: "SI boshqaruvi va moderatsiya sozlamalari" },
  "sa-audit": { crumb: "Super Admin / Ishonchlilik", title: "Audit jurnali" },
  "sa-moderation": { crumb: "Super Admin / Ishonchlilik", title: "Kontent moderatsiya navbati" },
  "sa-settings": { crumb: "Super Admin / Sozlamalar", title: "Platforma sozlamalari" },
}

export const studentNav: LmsNavEntry[] = [
  { section: "Asosiy" },
  { icon: "layout-dashboard", label: "Bosh sahifa", href: "/app", pageKey: "s-dashboard" },
  { icon: "books", label: "Mening kurslarim", href: "/app/courses", pageKey: "s-courses" },
  { section: "Dars" },
  {
    icon: "player-play",
    label: "Joriy dars",
    href: "/app/lessons/current",
    pageKey: "s-lesson",
  },
  { icon: "info-circle", label: "Kurs tafsiloti", href: "/app/courses/nlp", pageKey: "s-course" },
  { section: "Akademik" },
  {
    icon: "file-text",
    label: "Topshiriqlar",
    href: "/app/tasks",
    pageKey: "s-tasks",
    badge: { kind: "amber", text: "3" },
  },
  { icon: "clipboard-check", label: "Mening baholarim", href: "/app/grades", pageKey: "s-grades" },
  { icon: "calendar", label: "Dars jadvali", href: "/app/schedule", pageKey: "s-schedule" },
  { section: "Muvaffaqiyat" },
  {
    icon: "award",
    label: "Sertifikatlar",
    href: "/app/certificates",
    pageKey: "s-certs",
    badge: { kind: "mute", text: "2" },
  },
  { icon: "user", label: "Mening profilim", href: "/app/profile", pageKey: "s-profile" },
]

export const teacherNav: LmsNavEntry[] = [
  { section: "Asosiy" },
  { icon: "layout-dashboard", label: "Bosh sahifa", href: "/teacher", pageKey: "t-dashboard" },
  { section: "O'quv boshqaruvi" },
  { icon: "books", label: "Mening kurslarim", href: "/teacher/courses", pageKey: "t-courses" },
  {
    icon: "list-tree",
    label: "Kurs va modullar",
    href: "/teacher/courses/ai-fundamentals",
    pageKey: "t-course-detail",
  },
  { icon: "calendar-time", label: "Jadval", href: "/teacher/schedule", pageKey: "t-schedule" },
  {
    icon: "user-check",
    label: "Davomat",
    href: "/teacher/attendance",
    pageKey: "t-attendance",
    badge: { kind: "amber", text: "2" },
  },
  { section: "Baholash" },
  {
    icon: "file-check",
    label: "Tekshirish navbati",
    href: "/teacher/grading",
    pageKey: "t-grading",
    badge: { kind: "red", text: "18" },
  },
  {
    icon: "sparkles",
    label: "SI baholash nazorati",
    href: "/teacher/ai-grading",
    pageKey: "t-ai-grading",
    badge: { kind: "mute", text: "SI" },
  },
  { icon: "clipboard-check", label: "Yakuniy baholar", href: "/teacher/final-grades", pageKey: "t-final" },
  { section: "Tinglovchi" },
  {
    icon: "users",
    label: "Tinglovchilar",
    href: "/teacher/students",
    pageKey: "t-students",
  },
  {
    icon: "alert-triangle",
    label: "Risk paneli",
    href: "/teacher/risk",
    pageKey: "t-risk",
    badge: { kind: "red", text: "7" },
  },
  {
    icon: "messages",
    label: "Q&A moderatsiya",
    href: "/teacher/qa",
    pageKey: "t-qa",
    badge: { kind: "amber", text: "4" },
  },
]

export const adminNav: LmsNavEntry[] = [
  { section: "Tahlil" },
  { icon: "chart-pie", label: "Tahlil markazi", href: "/admin", pageKey: "a-analytics" },
  { icon: "chart-bar", label: "Hisobotlar", href: "/admin/reports", pageKey: "a-reports" },
  { section: "O'quv boshqaruvi" },
  { icon: "presentation", label: "Kurslar", href: "/admin/courses", pageKey: "a-courses" },
  { icon: "users-group", label: "O'quv oqimi", href: "/admin/learning-streams", pageKey: "a-streams" },
  { section: "Foydalanuvchi va access" },
  { icon: "users", label: "Foydalanuvchilar", href: "/admin/users", pageKey: "a-users" },
  { icon: "lock-square", label: "Rollar va ruxsatlar", href: "/admin/roles", pageKey: "a-roles" },
  { section: "Kontent va politika" },
  { icon: "award", label: "Sertifikat shablonlari", href: "/admin/certificates", pageKey: "a-certs" },
  { icon: "clipboard-list", label: "So'rovnomalar", href: "/admin/surveys", pageKey: "a-surveys" },
  { icon: "shield-check", label: "SI boshqaruvi", href: "/admin/ai-governance", pageKey: "a-ai-gov" },
  { section: "Audit va ishonchlilik" },
  { icon: "history", label: "Audit jurnali", href: "/admin/audit", pageKey: "a-audit" },
  {
    icon: "alert-octagon",
    label: "Moderatsiya",
    href: "/admin/moderation",
    pageKey: "a-moderation",
    badge: { kind: "amber", text: "3" },
  },
]

export const superAdminNav: LmsNavEntry[] = [
  { section: "Tahlil" },
  { icon: "chart-pie", label: "Tahlil markazi", href: "/super-admin", pageKey: "sa-analytics" },
  { section: "O'quv boshqaruvi" },
  {
    icon: "presentation",
    label: "Kurslar",
    href: "/super-admin/courses",
    pageKey: "sa-courses",
  },
  {
    icon: "users-group",
    label: "O'quv oqimi",
    href: "/super-admin/learning-streams",
    pageKey: "sa-streams",
  },
  { section: "Foydalanuvchi va access" },
  { icon: "users", label: "Foydalanuvchilar", href: "/super-admin/users", pageKey: "sa-users" },
  { icon: "lock-square", label: "Rollar va ruxsatlar", href: "/super-admin/roles", pageKey: "sa-roles" },
  { section: "Kontent va politika" },
  { icon: "award", label: "Sertifikat shablonlari", href: "/super-admin/certificates", pageKey: "sa-certs" },
  { icon: "clipboard-list", label: "So'rovnomalar", href: "/super-admin/surveys", pageKey: "sa-surveys" },
  {
    icon: "shield-check",
    label: "SI boshqaruvi",
    href: "/super-admin/ai-governance",
    pageKey: "sa-ai-gov",
  },
  { section: "Audit va ishonchlilik" },
  { icon: "history", label: "Audit jurnali", href: "/super-admin/audit", pageKey: "sa-audit" },
  {
    icon: "alert-octagon",
    label: "Moderatsiya",
    href: "/super-admin/moderation",
    pageKey: "sa-moderation",
    badge: { kind: "amber", text: "3" },
  },
  { section: "Platforma" },
  { icon: "settings", label: "Sozlamalar", href: "/super-admin/settings", pageKey: "sa-settings" },
]

export const pageKeyByPath: Record<string, string> = Object.fromEntries(
  Object.entries(pagePathByKey).map(([key, path]) => [path, key]),
)

export function getRoleFromPath(pathname: string): LmsRole {
  if (pathname.startsWith("/super-admin")) return "super_admin"
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
