import { Link } from "react-router-dom"

import type { Course } from "@/data/courses"

type CourseCardProps = {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wide text-cyan-700">
        {course.stream}
      </div>
      <h3 className="mt-2 text-lg font-bold text-slate-950">{course.title}</h3>
      <p className="mt-2 text-sm text-slate-500">
        Keyingi dars: {course.nextLesson}
      </p>
      <div className="mt-5">
        <div className="mb-2 flex justify-between text-sm">
          <span className="font-medium text-slate-600">Progress</span>
          <span className="font-semibold text-slate-950">{course.progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-cyan-500"
            style={{ width: `${course.progress}%` }}
          />
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between gap-4">
        <span className="text-sm text-slate-500">{course.mentor}</span>
        <Link
          to={`/app/courses/${course.id}`}
          className="rounded-lg bg-slate-950 px-3 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700"
        >
          Ochish
        </Link>
      </div>
    </article>
  )
}
