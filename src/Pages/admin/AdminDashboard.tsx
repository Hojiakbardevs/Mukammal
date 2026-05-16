import { BookOpen, GraduationCap, ShieldCheck, Users } from "lucide-react"

import { StatCard } from "@/components/dashboard/StatCard"
import { ListRow, PageHeader, Panel } from "@/Pages/dashboard/pageBlocks"

export function AdminDashboard() {
  return (
    <>
      <PageHeader
        eyebrow="Super Admin"
        title="Tahlil markazi"
        description="Platformadagi kurslar, foydalanuvchilar va sifat indikatorlari."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Foydalanuvchilar" value="1,284" hint="So'nggi oy +12%" icon={Users} />
        <StatCard label="Kurslar" value="18" hint="6 tasi aktiv" icon={BookOpen} />
        <StatCard label="O'quv oqimlari" value="24" hint="9 tasi joriy" icon={GraduationCap} />
        <StatCard label="Audit holati" value="99%" hint="Xatoliklar nazoratda" icon={ShieldCheck} />
      </div>
      <div className="mt-6">
        <Panel title="Operatsion holat">
          <ListRow title="AI-26 oqimi" meta="78 talaba · 4 teacher" value="Faol" />
          <ListRow title="NLP-26 oqimi" meta="34 talaba · 2 teacher" value="Faol" />
          <ListRow title="CV-26 oqimi" meta="28 talaba · 2 teacher" value="Start oldi" />
        </Panel>
      </div>
    </>
  )
}
