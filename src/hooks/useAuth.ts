import { mockUsers } from "@/data/mockUser"
import { useRole } from "@/hooks/useRole"

export function useAuth() {
  const role = useRole()

  return {
    isAuthenticated: true,
    user: mockUsers[role],
  }
}
