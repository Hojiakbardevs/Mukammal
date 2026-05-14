import { lazy, Suspense, useEffect } from "react"
import { BrowserRouter, Routes, Route, useLocation, Outlet } from "react-router-dom"
import { Toaster } from "sonner"
import { Navbar } from "@/components/Navbar"

const HomePage = lazy(() => import("./Pages/Homepage"))
const Register = lazy(() => import("@/Pages/Register"))
const CourseDetail = lazy(() => import("@/Pages/CourseDetail"))

function WithNav() {
  return (
    <>
      <HashScroll />
      <Navbar />
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#070b17] px-6 pt-28 text-white">
            Yuklanmoqda...
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </>
  )
}

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

export default function App() {
  return (
    <BrowserRouter>
      <Toaster richColors />
      <Routes>
        <Route element={<WithNav />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route
          path="/courses/:slug"
          element={
            <Suspense
              fallback={
                <div className="min-h-screen bg-[#f6f9ff] px-6 pt-28 text-[#071126]">
                  Yuklanmoqda...
                </div>
              }
            >
              <CourseDetail />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
