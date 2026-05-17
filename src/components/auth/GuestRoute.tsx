import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"

import { getDefaultRoute } from "@/context/AuthContext"
import { useAuth } from "@/hooks/useAuth"

type GuestRouteProps = { children: ReactNode }

export function GuestRoute({ children }: GuestRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth()

  if (isLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#070b17] text-white">
        <div className="flex items-center gap-3 text-sm text-white/70">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/25 border-t-sky-400" />
          Yuklanmoqda...
        </div>
      </div>
    )
  }

  if (isAuthenticated && user) {
    return <Navigate to={getDefaultRoute(user.role)} replace />
  }

  return <>{children}</>
}
