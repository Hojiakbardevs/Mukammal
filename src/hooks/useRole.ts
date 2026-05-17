import { useLocation } from "react-router-dom"

import type { UserRole } from "@/data/navItems"

export function useRole(): UserRole {
  const { pathname } = useLocation()

  if (pathname.startsWith("/admin")) return "admin"
  if (pathname.startsWith("/teacher")) return "teacher"

  return "student"
}
