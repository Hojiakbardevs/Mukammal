import { createContext, useState, type ReactNode } from "react"

import { MOCK_USERS } from "@/data/mockUsers"
import type { AuthUser, UserRole } from "@/types/auth"

const AUTH_KEY = "airi_training_auth"

type AuthContextValue = {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  hasRole: (roles: UserRole[]) => boolean
  getDefaultRoute: (role: UserRole) => string
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async () => ({ success: false }),
  logout: () => {},
  hasRole: () => false,
  getDefaultRoute: () => "/login",
})

function readStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<AuthUser> & { password?: string }
    if (!parsed.id || !parsed.email || !parsed.fullName || !parsed.role || parsed.password) {
      localStorage.removeItem(AUTH_KEY)
      return null
    }
    return {
      id: parsed.id,
      email: parsed.email,
      fullName: parsed.fullName,
      role: parsed.role,
      position: parsed.position ?? parsed.title ?? "",
      organization: parsed.organization ?? "AIRI",
      initials: parsed.initials ?? "?",
      title: parsed.title ?? parsed.position ?? "",
    }
  } catch {
    return null
  }
}

export function getDefaultRoute(role: UserRole): string {
  switch (role) {
    case "student":
      return "/app"
    case "teacher":
      return "/teacher"
    case "admin":
      return "/admin"
    case "super_admin":
      return "/super-admin"
  }
}

type AuthProviderProps = { children: ReactNode }

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(readStoredUser)

  const isAuthenticated = user !== null

  async function login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    const found = MOCK_USERS.find(
      (u) => u.email.trim().toLowerCase() === email.trim().toLowerCase() && u.password === password,
    )
    if (!found) {
      return { success: false, error: "Email yoki parol noto'g'ri" }
    }

    const { password: _pw, ...authUser } = found
    setUser(authUser)
    localStorage.setItem(AUTH_KEY, JSON.stringify(authUser))
    return { success: true }
  }

  function logout() {
    setUser(null)
    localStorage.removeItem(AUTH_KEY)
  }

  function hasRole(roles: UserRole[]): boolean {
    return user !== null && roles.includes(user.role)
  }

  const value: AuthContextValue = {
    user,
    isAuthenticated,
    isLoading: false,
    login,
    logout,
    hasRole,
    getDefaultRoute,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
