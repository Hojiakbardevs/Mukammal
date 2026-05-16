import {
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  ClipboardCheck,
  FileBarChart,
  GraduationCap,
  LayoutDashboard,
  Settings,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react"

export type UserRole = "student" | "teacher" | "admin"

export type NavItem = {
  label: string
  href: string
  icon: LucideIcon
}

export const studentNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/app",
    icon: LayoutDashboard,
  },
  {
    label: "Kurslarim",
    href: "/app/courses",
    icon: BookOpen,
  },
  {
    label: "Topshiriqlar",
    href: "/app/tasks",
    icon: ClipboardCheck,
  },
  {
    label: "Baholar",
    href: "/app/grades",
    icon: BarChart3,
  },
  {
    label: "Dars jadvali",
    href: "/app/schedule",
    icon: Calendar,
  },
  {
    label: "Sertifikatlar",
    href: "/app/certificates",
    icon: Award,
  },
]

export const teacherNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/teacher",
    icon: LayoutDashboard,
  },
  {
    label: "Kurslar",
    href: "/teacher/courses",
    icon: BookOpen,
  },
  {
    label: "Baholash",
    href: "/teacher/grading",
    icon: ClipboardCheck,
  },
  {
    label: "Talabalar",
    href: "/teacher/students",
    icon: Users,
  },
]

export const adminNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Foydalanuvchilar",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "Kurslar",
    href: "/admin/courses",
    icon: BookOpen,
  },
  {
    label: "O'quv oqimlari",
    href: "/admin/learning-streams",
    icon: GraduationCap,
  },
  {
    label: "Gamifikatsiya",
    href: "/admin/gamification",
    icon: Sparkles,
  },
  {
    label: "Hisobotlar",
    href: "/admin/reports",
    icon: FileBarChart,
  },
  {
    label: "Sozlamalar",
    href: "/admin/settings",
    icon: Settings,
  },
]
