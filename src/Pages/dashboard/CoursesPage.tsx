import { CourseCard } from "@/components/dashboard/CourseCard"
import { courses } from "@/data/courses"
import { PageHeader } from "@/Pages/dashboard/pageBlocks"

export function CoursesPage() {
  return (
    <>
      <PageHeader
        eyebrow="O'quv"
        title="Kurslarim"
        description="Siz biriktirilgan kurslar, mentorlar va dars progressi."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </>
  )
}
