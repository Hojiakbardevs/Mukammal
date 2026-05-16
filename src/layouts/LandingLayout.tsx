import { Outlet, useLocation } from "react-router-dom"
import { useEffect } from "react"

import { Footer } from "@/components/landing/Footer"
import { LandingNavbar } from "@/components/landing/Navbar"

function HashScroll() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return

    const frame = requestAnimationFrame(() => {
      document.querySelector(hash)?.scrollIntoView({ block: "start" })
    })

    return () => cancelAnimationFrame(frame)
  }, [hash])

  return null
}

export function LandingLayout() {
  return (
    <div className="min-h-screen bg-[#070b17] text-white">
      <HashScroll />
      <LandingNavbar />
      <Outlet />
      <Footer />
    </div>
  )
}
