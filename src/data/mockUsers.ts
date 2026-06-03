import type { AuthUser } from "@/types/auth"

export type MockUserWithPassword = AuthUser & { password: string }

function getInitials(fullName: string) {
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

function withDerivedFields(
  user: Omit<MockUserWithPassword, "initials" | "title">,
): MockUserWithPassword {
  return {
    ...user,
    initials: getInitials(user.fullName),
    title: `${user.position} · ${user.organization}`,
  }
}

export const mockUsers: MockUserWithPassword[] = [
  withDerivedFields({
    id: "u-student-1",
    fullName: "Hojiakbar Abdulhakimov",
    email: "student@airi.uz",
    password: "Student@2026!",
    role: "student",
    position: "Tinglovchi",
    organization: "AIRI Training",
  }),
  withDerivedFields({
    id: "u-teacher-1",
    fullName: "Kamola Yusupova",
    email: "teacher@airi.uz",
    password: "Teacher@2026!",
    role: "teacher",
    position: "Trener",
    organization: "AIRI",
  }),
  withDerivedFields({
    id: "u-admin-1",
    fullName: "Admin Manager",
    email: "admin@airi.uz",
    password: "Admin@2026!",
    role: "admin",
    position: "Platforma administratori",
    organization: "AIRI",
  }),
  withDerivedFields({
    id: "u-superadmin-1",
    fullName: "Super Admin",
    email: "superadmin@airi.uz",
    password: "SuperAdmin@2026!",
    role: "super_admin",
    position: "Bosh administrator",
    organization: "AIRI",
  }),
]

export const MOCK_USERS = mockUsers
