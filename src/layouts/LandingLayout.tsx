import { Outlet, useLocation } from "react-router-dom"
import { useEffect } from "react"

import { Footer } from "@/components/landing/Footer"
import { LandingNavbar } from "@/components/landing/Navbar"

function HashScroll() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (hash) {
        document.querySelector(hash)?.scrollIntoView({ block: "start" })
        return
      }

      if (pathname === "/") {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" })
      }
    })

    return () => cancelAnimationFrame(frame)
  }, [hash, pathname])

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
