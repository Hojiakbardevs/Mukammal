import { createBrowserRouter, Navigate } from "react-router-dom"

import { AuthLayout } from "@/layouts/AuthLayout"
import { DashboardLayout } from "@/layouts/DashboardLayout"
import { LandingLayout } from "@/layouts/LandingLayout"
import { LoginPage } from "@/Pages/auth/LoginPage"
import { CertificatesPage } from "@/Pages/dashboard/CertificatesPage"
import { CourseDetailPage } from "@/Pages/dashboard/CourseDetailPage"
import { CoursesPage } from "@/Pages/dashboard/CoursesPage"
import { DashboardHome } from "@/Pages/dashboard/DashboardHome"
import { GradesPage } from "@/Pages/dashboard/GradesPage"
import { LessonPage } from "@/Pages/dashboard/LessonPage"
import { SchedulePage } from "@/Pages/dashboard/SchedulePage"
import { TasksPage } from "@/Pages/dashboard/TasksPage"
import { HomePage } from "@/Pages/landing/HomePage"
import { AdminCoursesPage } from "@/Pages/admin/AdminCoursesPage"
import { AdminDashboard } from "@/Pages/admin/AdminDashboard"
import { GamificationPage } from "@/Pages/admin/GamificationPage"
import { LearningStreamsPage } from "@/Pages/admin/LearningStreamsPage"
import { ReportsPage } from "@/Pages/admin/ReportsPage"
import { SettingsPage } from "@/Pages/admin/SettingsPage"
import { UsersPage } from "@/Pages/admin/UsersPage"
import { TeacherCourses } from "@/Pages/teacher/TeacherCourses"
import { TeacherDashboard } from "@/Pages/teacher/TeacherDashboard"
import { TeacherGrading } from "@/Pages/teacher/TeacherGrading"
import { TeacherStudents } from "@/Pages/teacher/TeacherStudents"
import Register from "@/Pages/Register"
import CourseDetail from "@/Pages/CourseDetail"

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
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "courses",
        element: <CoursesPage />,
      },
      {
        path: "courses/:courseId",
        element: <CourseDetailPage />,
      },
      {
        path: "lessons/:lessonId",
        element: <LessonPage />,
      },
      {
        path: "tasks",
        element: <TasksPage />,
      },
      {
        path: "grades",
        element: <GradesPage />,
      },
      {
        path: "schedule",
        element: <SchedulePage />,
      },
      {
        path: "certificates",
        element: <CertificatesPage />,
      },
      {
        path: "*",
        element: <Navigate to="/app" replace />,
      },
    ],
  },
  {
    path: "/teacher",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <TeacherDashboard />,
      },
      {
        path: "courses",
        element: <TeacherCourses />,
      },
      {
        path: "grading",
        element: <TeacherGrading />,
      },
      {
        path: "students",
        element: <TeacherStudents />,
      },
      {
        path: "*",
        element: <Navigate to="/teacher" replace />,
      },
    ],
  },
  {
    path: "/admin",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "courses",
        element: <AdminCoursesPage />,
      },
      {
        path: "learning-streams",
        element: <LearningStreamsPage />,
      },
      {
        path: "gamification",
        element: <GamificationPage />,
      },
      {
        path: "reports",
        element: <ReportsPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "*",
        element: <Navigate to="/admin" replace />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
])
