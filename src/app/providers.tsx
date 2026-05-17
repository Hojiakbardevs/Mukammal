import type { ReactNode } from "react"
import { Toaster } from "sonner"

import { AuthProvider } from "@/context/AuthContext"

type ProvidersProps = {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      {children}
      <Toaster richColors />
    </AuthProvider>
  )
}
