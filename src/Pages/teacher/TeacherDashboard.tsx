import { BookOpen, ClipboardCheck, Users, Video } from "lucide-react"

import { StatCard } from "@/components/dashboard/StatCard"
import { ListRow, PageHeader, Panel } from "@/Pages/dashboard/pageBlocks"

export function TeacherDashboard() {
  return (
    <>
      <PageHeader
        eyebrow="Teacher panel"
        title="Xush kelibsiz, Aziza opa"
        description="Kurslar, tekshiruv navbati va talabalar faolligi bo'yicha tezkor ko'rinish."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Kurslar" value="4" hint="2 ta aktiv modul" icon={BookOpen} />
        <StatCard label="Talabalar" value="126" hint="94% qatnashuv" icon={Users} />
        <StatCard label="Tekshiruv" value="18" hint="Bugun 6 tasini yopish kerak" icon={ClipboardCheck} />
        <StatCard label="Live darslar" value="3" hint="Shu hafta" icon={Video} />
      </div>
      <div className="mt-6">
        <Panel title="Tekshiruv navbati">
          <ListRow title="NLP laboratoriya 1" meta="32 ta topshirilgan" value="12 qoldi" />
          <ListRow title="AI etikasi esse" meta="18 ta topshirilgan" value="6 qoldi" />
          <ListRow title="CV quiz" meta="44 ta topshirilgan" value="0 qoldi" />
        </Panel>
      </div>
    </>
  )
}
