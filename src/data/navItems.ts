import {
  AlertTriangle,
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  ClipboardCheck,
  FileCheck2,
  FileText,
  History,
  LayoutDashboard,
  ListTree,
  LockKeyhole,
  MessageSquare,
  Presentation,
  ShieldCheck,
  Sparkles,
  Stamp,
  User,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react"

export type UserRole = "student" | "teacher" | "admin"

export type NavItem = {
  label: string
  href: string
  icon: LucideIcon
  section?: string
  badge?: string
}

export const studentNavItems: NavItem[] = [
  { section: "Asosiy", label: "Bosh sahifa", href: "/app", icon: LayoutDashboard },
  { section: "Asosiy", label: "Mening kurslarim", href: "/app/courses", icon: BookOpen },
  { section: "Dars", label: "Joriy dars", href: "/app/lesson", icon: FileText },
  { section: "Dars", label: "Kurs tafsiloti", href: "/app/course", icon: Presentation },
  { section: "Akademik", label: "Topshiriqlar", href: "/app/tasks", icon: ClipboardCheck, badge: "3" },
  { section: "Akademik", label: "Mening baholarim", href: "/app/grades", icon: Stamp },
  { section: "Akademik", label: "Dars jadvali", href: "/app/schedule", icon: Calendar },
  { section: "Muvaffaqiyat", label: "Sertifikatlar", href: "/app/certificates", icon: Award, badge: "2" },
  { section: "Muvaffaqiyat", label: "Mening profilim", href: "/app/profile", icon: User },
]

export const teacherNavItems: NavItem[] = [
  { section: "Asosiy", label: "Bosh sahifa", href: "/teacher", icon: LayoutDashboard },
  { section: "O‘quv boshqaruvi", label: "Mening kurslarim", href: "/teacher/courses", icon: BookOpen },
  { section: "O‘quv boshqaruvi", label: "Kurs va modullar", href: "/teacher/course-detail", icon: ListTree },
  { section: "O‘quv boshqaruvi", label: "Jadval", href: "/teacher/schedule", icon: Calendar },
  { section: "O‘quv boshqaruvi", label: "Davomat", href: "/teacher/attendance", icon: UserCheck, badge: "2" },
  { section: "Baholash", label: "Tekshirish navbati", href: "/teacher/grading", icon: FileCheck2, badge: "18" },
  { section: "Baholash", label: "SI baholash nazorati", href: "/teacher/ai-grading", icon: Sparkles, badge: "SI" },
  { section: "Baholash", label: "Yakuniy baholar", href: "/teacher/final", icon: Stamp },
  { section: "Tinglovchi", label: "Risk paneli", href: "/teacher/risk", icon: AlertTriangle, badge: "7" },
  { section: "Tinglovchi", label: "Q&A moderatsiya", href: "/teacher/qa", icon: MessageSquare, badge: "4" },
]

export const adminNavItems: NavItem[] = [
  { section: "Governance", label: "Tahlil markazi", href: "/admin", icon: BarChart3 },
  { section: "Governance", label: "Kurslar va o‘quv oqimlari", href: "/admin/courses", icon: Presentation },
  { section: "Foydalanuvchi va ruxsat", label: "Foydalanuvchilar", href: "/admin/users", icon: Users },
  { section: "Foydalanuvchi va ruxsat", label: "Rollar va ruxsatlar", href: "/admin/roles", icon: LockKeyhole },
  { section: "Kontent va siyosat", label: "Sertifikat shablonlari", href: "/admin/certificates", icon: Award },
  { section: "Kontent va siyosat", label: "So‘rovnomalar", href: "/admin/surveys", icon: ClipboardCheck },
  { section: "Kontent va siyosat", label: "SI boshqaruvi", href: "/admin/ai-governance", icon: ShieldCheck },
  { section: "Audit va ishonchlilik", label: "Audit jurnali", href: "/admin/audit", icon: History },
  { section: "Audit va ishonchlilik", label: "Moderatsiya", href: "/admin/moderation", icon: AlertTriangle, badge: "3" },
]
