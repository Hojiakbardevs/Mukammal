import { createBrowserRouter, Navigate } from "react-router-dom"

import { AuthLayout } from "@/layouts/AuthLayout"
import { DashboardLayout } from "@/layouts/DashboardLayout"
import { LandingLayout } from "@/layouts/LandingLayout"
import { AdminAIGovernance } from "@/pages/admin/AdminAIGovernance"
import { AdminAnalytics } from "@/pages/admin/AdminAnalytics"
import { AdminAudit } from "@/pages/admin/AdminAudit"
import { AdminCertificates } from "@/pages/admin/AdminCertificates"
import { AdminCourses } from "@/pages/admin/AdminCourses"
import { AdminModeration } from "@/pages/admin/AdminModeration"
import { AdminRoles } from "@/pages/admin/AdminRoles"
import { AdminSurveys } from "@/pages/admin/AdminSurveys"
import { AdminUsers } from "@/pages/admin/AdminUsers"
import CourseDetail from "@/pages/CourseDetail"
import Register from "@/pages/Register"
import { LoginPage } from "@/pages/auth/LoginPage"
import { HomePage } from "@/pages/landing/HomePage"
import { StudentCertificates } from "@/pages/student/StudentCertificates"
import { StudentCourseDetail } from "@/pages/student/StudentCourseDetail"
import { StudentCourses } from "@/pages/student/StudentCourses"
import { StudentDashboard } from "@/pages/student/StudentDashboard"
import { StudentGrades } from "@/pages/student/StudentGrades"
import { StudentLesson } from "@/pages/student/StudentLesson"
import { StudentProfile } from "@/pages/student/StudentProfile"
import { StudentSchedule } from "@/pages/student/StudentSchedule"
import { StudentTasks } from "@/pages/student/StudentTasks"
import { TeacherAIGrading } from "@/pages/teacher/TeacherAIGrading"
import { TeacherAttendance } from "@/pages/teacher/TeacherAttendance"
import { TeacherCourseDetail } from "@/pages/teacher/TeacherCourseDetail"
import { TeacherCourses } from "@/pages/teacher/TeacherCourses"
import { TeacherDashboard } from "@/pages/teacher/TeacherDashboard"
import { TeacherFinalGrades } from "@/pages/teacher/TeacherFinalGrades"
import { TeacherGrading } from "@/pages/teacher/TeacherGrading"
import { TeacherQA } from "@/pages/teacher/TeacherQA"
import { TeacherRiskPanel } from "@/pages/teacher/TeacherRiskPanel"
import { TeacherSchedule } from "@/pages/teacher/TeacherSchedule"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "register", element: <Register /> },
      { path: "courses/:slug", element: <CourseDetail /> },
    ],
  },
  {
    path: "/login",
    element: <AuthLayout />,
    children: [{ index: true, element: <LoginPage /> }],
  },
  {
    path: "/app",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <StudentDashboard /> },
      { path: "courses", element: <StudentCourses /> },
      { path: "courses/:courseId", element: <StudentCourseDetail /> },
      { path: "lessons/:lessonId", element: <StudentLesson /> },
      { path: "tasks", element: <StudentTasks /> },
      { path: "grades", element: <StudentGrades /> },
      { path: "schedule", element: <StudentSchedule /> },
      { path: "certificates", element: <StudentCertificates /> },
      { path: "profile", element: <StudentProfile /> },
      { path: "*", element: <Navigate to="/app" replace /> },
    ],
  },
  {
    path: "/teacher",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <TeacherDashboard /> },
      { path: "courses", element: <TeacherCourses /> },
      { path: "courses/:courseId", element: <TeacherCourseDetail /> },
      { path: "schedule", element: <TeacherSchedule /> },
      { path: "attendance", element: <TeacherAttendance /> },
      { path: "grading", element: <TeacherGrading /> },
      { path: "ai-grading", element: <TeacherAIGrading /> },
      { path: "final-grades", element: <TeacherFinalGrades /> },
      { path: "risk", element: <TeacherRiskPanel /> },
      { path: "qa", element: <TeacherQA /> },
      { path: "*", element: <Navigate to="/teacher" replace /> },
    ],
  },
  {
    path: "/admin",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <AdminAnalytics /> },
      { path: "courses", element: <AdminCourses /> },
      { path: "users", element: <AdminUsers /> },
      { path: "roles", element: <AdminRoles /> },
      { path: "certificates", element: <AdminCertificates /> },
      { path: "surveys", element: <AdminSurveys /> },
      { path: "ai-governance", element: <AdminAIGovernance /> },
      { path: "audit", element: <AdminAudit /> },
      { path: "moderation", element: <AdminModeration /> },
      { path: "*", element: <Navigate to="/admin" replace /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
])
