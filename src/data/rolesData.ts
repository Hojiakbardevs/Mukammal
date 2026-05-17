export type RoleId = "super-admin" | "admin" | "trainer" | "reviewer" | "student"

export type RoleDef = {
  id: RoleId
  label: string
  icon: string
  color: string
  description: string
  userCount: number
}

export type PermDef = {
  key: string
  label: string
  category: string
  critical?: boolean
}

export const ROLE_DEFS: RoleDef[] = [
  {
    id: "super-admin",
    label: "Super Admin",
    icon: "shield-check",
    color: "#7c3aed",
    description: "Platformaning to'liq governance markazi: foydalanuvchi, kurs, AI politikasi, audit.",
    userCount: 2,
  },
  {
    id: "admin",
    label: "Admin",
    icon: "settings",
    color: "#0f172a",
    description: "Operatsion boshqaruv: kurs, kohort, foydalanuvchi va schedule. AI politikani o'zgartira olmaydi.",
    userCount: 6,
  },
  {
    id: "trainer",
    label: "Trainer (Teacher)",
    icon: "chalkboard",
    color: "#10b981",
    description: "O'z kurslari ichida modul, dars, vazifa, baholash va davomatni boshqaradi.",
    userCount: 14,
  },
  {
    id: "reviewer",
    label: "Reviewer",
    icon: "eye-check",
    color: "#0891b2",
    description: "AI grading va appeal natijalarini ko'rib chiqadi. Baholarni faqat appeal flow'da o'zgartira oladi.",
    userCount: 4,
  },
  {
    id: "student",
    label: "Student",
    icon: "school",
    color: "#3b82f6",
    description: "O'qish, topshirish va sertifikat — boshqa hech narsa.",
    userCount: 1842,
  },
]

export const PERM_DEFS: PermDef[] = [
  { key: "users.read",     label: "Foydalanuvchilarni ko'rish",            category: "Foydalanuvchi va access" },
  { key: "users.write",    label: "Foydalanuvchilarni yaratish va tahrirlash", category: "Foydalanuvchi va access" },
  { key: "roles.manage",   label: "Rollar va ruxsatlarni boshqarish",       category: "Foydalanuvchi va access", critical: true },
  { key: "sessions.kick",  label: "Sessiyalarni majburan tugatish",         category: "Foydalanuvchi va access", critical: true },

  { key: "course.create",  label: "Kurs yaratish",                          category: "Kurslar va kontent" },
  { key: "course.publish", label: "Kursni publish qilish",                  category: "Kurslar va kontent" },
  { key: "module.manage",  label: "Modul va darslarni boshqarish",          category: "Kurslar va kontent" },
  { key: "content.moderate", label: "Q&A va kontent moderatsiyasi",         category: "Kurslar va kontent" },

  { key: "grade.suggest",  label: "AI grading taklif olish",                category: "Baholash" },
  { key: "grade.publish",  label: "Yakuniy bahoni publish qilish",          category: "Baholash" },
  { key: "grade.override", label: "Boshqa teacher bahosini override qilish", category: "Baholash", critical: true },
  { key: "appeal.review",  label: "Appeal'ni ko'rib chiqish",               category: "Baholash" },

  { key: "audit.view",     label: "Audit jurnalini ko'rish",                category: "Tizim va xavfsizlik" },
  { key: "ai.policy",      label: "AI siyosatini o'zgartirish",             category: "Tizim va xavfsizlik", critical: true },
  { key: "security.review", label: "Xavfsizlik ogohlantirishlarini ko'rish", category: "Tizim va xavfsizlik" },
  { key: "data.export",    label: "Ma'lumotlarni eksport qilish (PII)",      category: "Tizim va xavfsizlik", critical: true },
]

export const PERM_CATEGORIES = [...new Set(PERM_DEFS.map((p) => p.category))]

export const DEFAULT_ROLE_PERMISSIONS: Record<RoleId, Record<string, boolean>> = {
  "super-admin": Object.fromEntries(PERM_DEFS.map((p) => [p.key, true])),
  "admin": {
    "users.read": true,  "users.write": true,  "roles.manage": false, "sessions.kick": true,
    "course.create": true, "course.publish": true, "module.manage": true, "content.moderate": true,
    "grade.suggest": true, "grade.publish": true,  "grade.override": true, "appeal.review": true,
    "audit.view": true, "ai.policy": false, "security.review": true, "data.export": false,
  },
  "trainer": {
    "users.read": true,  "users.write": false, "roles.manage": false, "sessions.kick": false,
    "course.create": true, "course.publish": false, "module.manage": true, "content.moderate": true,
    "grade.suggest": true, "grade.publish": false,  "grade.override": false, "appeal.review": false,
    "audit.view": false, "ai.policy": false, "security.review": false, "data.export": false,
  },
  "reviewer": {
    "users.read": true,  "users.write": false, "roles.manage": false, "sessions.kick": false,
    "course.create": false, "course.publish": false, "module.manage": false, "content.moderate": false,
    "grade.suggest": true, "grade.publish": false,  "grade.override": false, "appeal.review": true,
    "audit.view": true, "ai.policy": false, "security.review": true, "data.export": false,
  },
  "student": {
    "users.read": false, "users.write": false, "roles.manage": false, "sessions.kick": false,
    "course.create": false, "course.publish": false, "module.manage": false, "content.moderate": false,
    "grade.suggest": false, "grade.publish": false, "grade.override": false, "appeal.review": false,
    "audit.view": false, "ai.policy": false, "security.review": false, "data.export": false,
  },
}
