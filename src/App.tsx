import { lazy, Suspense, useEffect, type ReactNode } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { Toaster } from "sonner"
import { Navbar } from "@/components/Navbar"

const HomePage = lazy(() => import("./Pages/Homepage"))
const Register = lazy(() => import("@/Pages/Register"))
const CourseDetail = lazy(() => import("@/Pages/CourseDetail"))

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <HashScroll />
      <Navbar />
      {children}
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
      <Layout>
        <Suspense
          fallback={
            <div className="min-h-screen bg-[#070b17] px-6 pt-28 text-white">
              Yuklanmoqda...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/courses/:slug" element={<CourseDetail />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}
