import { createBrowserRouter, Navigate } from "react-router-dom"

import { AuthLayout } from "@/layouts/AuthLayout"
import { DashboardLayout } from "@/layouts/DashboardLayout"
import { LandingLayout } from "@/layouts/LandingLayout"
import { AdminAIGovernance } from "@/Pages/admin/AdminAIGovernance"
import { AdminAnalytics } from "@/Pages/admin/AdminAnalytics"
import { AdminAudit } from "@/Pages/admin/AdminAudit"
import { AdminCertificates } from "@/Pages/admin/AdminCertificates"
import { AdminCourses } from "@/Pages/admin/AdminCourses"
import { AdminModeration } from "@/Pages/admin/AdminModeration"
import { AdminRoles } from "@/Pages/admin/AdminRoles"
import { AdminSurveys } from "@/Pages/admin/AdminSurveys"
import { AdminUsers } from "@/Pages/admin/AdminUsers"
import { LoginPage } from "@/Pages/auth/LoginPage"
import { HomePage } from "@/Pages/landing/HomePage"
import { StudentCertificates } from "@/Pages/student/StudentCertificates"
import { StudentCourseDetail } from "@/Pages/student/StudentCourseDetail"
import { StudentCourses } from "@/Pages/student/StudentCourses"
import { StudentDashboard } from "@/Pages/student/StudentDashboard"
import { StudentGrades } from "@/Pages/student/StudentGrades"
import { StudentLesson } from "@/Pages/student/StudentLesson"
import { StudentProfile } from "@/Pages/student/StudentProfile"
import { StudentSchedule } from "@/Pages/student/StudentSchedule"
import { StudentTasks } from "@/Pages/student/StudentTasks"
import { TeacherAIGrading } from "@/Pages/teacher/TeacherAIGrading"
import { TeacherAttendance } from "@/Pages/teacher/TeacherAttendance"
import { TeacherCourseDetail } from "@/Pages/teacher/TeacherCourseDetail"
import { TeacherCourses } from "@/Pages/teacher/TeacherCourses"
import { TeacherDashboard } from "@/Pages/teacher/TeacherDashboard"
import { TeacherFinalGrades } from "@/Pages/teacher/TeacherFinalGrades"
import { TeacherGrading } from "@/Pages/teacher/TeacherGrading"
import { TeacherQA } from "@/Pages/teacher/TeacherQA"
import { TeacherRiskPanel } from "@/Pages/teacher/TeacherRiskPanel"
import { TeacherSchedule } from "@/Pages/teacher/TeacherSchedule"
import CourseDetail from "@/Pages/CourseDetail"
import Register from "@/Pages/Register"

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
      { path: "course", element: <StudentCourseDetail /> },
      { path: "courses/:courseId", element: <StudentCourseDetail /> },
      { path: "lesson", element: <StudentLesson /> },
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
      { path: "course-detail", element: <TeacherCourseDetail /> },
      { path: "schedule", element: <TeacherSchedule /> },
      { path: "attendance", element: <TeacherAttendance /> },
      { path: "grading", element: <TeacherGrading /> },
      { path: "ai-grading", element: <TeacherAIGrading /> },
      { path: "final", element: <TeacherFinalGrades /> },
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
  { path: "*", element: <Navigate to="/" replace /> },
])
