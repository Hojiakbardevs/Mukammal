export type UserRole = "student" | "teacher" | "admin" | "super_admin"

export type AuthUser = {
  id: string
  fullName: string
  email: string
  role: UserRole
  position: string
  organization: string
  initials: string
  title: string
}
