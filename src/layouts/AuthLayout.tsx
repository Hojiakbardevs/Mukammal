import { Outlet } from "react-router-dom"

export function AuthLayout() {
  return (
    <main className="min-h-screen bg-[#070b17] text-white">
      <Outlet />
    </main>
  )
}
