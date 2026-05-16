import { createBrowserRouter, Navigate } from "react-router-dom"

import { LmsPage } from "@/components/dashboard/LmsPage"
import { AuthLayout } from "@/layouts/AuthLayout"
import { DashboardLayout } from "@/layouts/DashboardLayout"
import { LandingLayout } from "@/layouts/LandingLayout"
import CourseDetail from "@/Pages/CourseDetail"
import Register from "@/Pages/Register"
import { LoginPage } from "@/Pages/auth/LoginPage"
import { HomePage } from "@/Pages/landing/HomePage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "courses/:slug",
        element: <CourseDetail />,
      },
    ],
  },
  {
    path: "/login",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/app",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <LmsPage /> },
      { path: "courses", element: <LmsPage /> },
      { path: "courses/:courseId", element: <LmsPage /> },
      { path: "lessons/:lessonId", element: <LmsPage /> },
      { path: "tasks", element: <LmsPage /> },
      { path: "grades", element: <LmsPage /> },
      { path: "schedule", element: <LmsPage /> },
      { path: "certificates", element: <LmsPage /> },
      { path: "profile", element: <LmsPage /> },
      { path: "*", element: <Navigate to="/app" replace /> },
    ],
  },
  {
    path: "/teacher",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <LmsPage /> },
      { path: "courses", element: <LmsPage /> },
      { path: "courses/:courseId", element: <LmsPage /> },
      { path: "schedule", element: <LmsPage /> },
      { path: "attendance", element: <LmsPage /> },
      { path: "grading", element: <LmsPage /> },
      { path: "ai-grading", element: <LmsPage /> },
      { path: "final-grades", element: <LmsPage /> },
      { path: "risk", element: <LmsPage /> },
      { path: "qa", element: <LmsPage /> },
      { path: "*", element: <Navigate to="/teacher" replace /> },
    ],
  },
  {
    path: "/admin",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <LmsPage /> },
      { path: "courses", element: <LmsPage /> },
      { path: "users", element: <LmsPage /> },
      { path: "roles", element: <LmsPage /> },
      { path: "certificates", element: <LmsPage /> },
      { path: "surveys", element: <LmsPage /> },
      { path: "ai-governance", element: <LmsPage /> },
      { path: "audit", element: <LmsPage /> },
      { path: "moderation", element: <LmsPage /> },
      { path: "learning-streams", element: <Navigate to="/admin/courses" replace /> },
      { path: "gamification", element: <Navigate to="/admin/courses" replace /> },
      { path: "reports", element: <Navigate to="/admin" replace /> },
      { path: "settings", element: <Navigate to="/admin/roles" replace /> },
      { path: "*", element: <Navigate to="/admin" replace /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
])
