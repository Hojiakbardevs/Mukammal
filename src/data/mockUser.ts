import type { UserRole } from "@/data/navItems"

export type MockUser = {
  name: string
  title: string
  initials: string
  role: UserRole
}

export const mockUsers: Record<UserRole, MockUser> = {
  student: {
    name: "Aziza Mahmudova",
    title: "NLP-26 · Level 4",
    initials: "AM",
    role: "student",
  },
  teacher: {
    name: "Aziza Tursunova",
    title: "Lead Trener · ML Track",
    initials: "AT",
    role: "teacher",
  },
  admin: {
    name: "Rustam Abdullaev",
    title: "Super Admin · AIRI",
    initials: "RA",
    role: "admin",
  },
}
