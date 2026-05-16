import { ToggleLeft, ToggleRight } from "lucide-react"

import { Badge, Card, CardHead, Table } from "@/components/ui"

const permissions = [
  "Kurs ko‘rish",
  "Topshiriq topshirish",
  "Baholash",
  "SI override",
  "Foydalanuvchi boshqarish",
  "Audit export",
]

const roles = ["Tinglovchi", "Trener", "Admin", "Reviewer"]

const matrix: Record<string, string[]> = {
  Tinglovchi: ["Kurs ko‘rish", "Topshiriq topshirish"],
  Trener: ["Kurs ko‘rish", "Baholash", "SI override"],
  Admin: ["Kurs ko‘rish", "Baholash", "SI override", "Foydalanuvchi boshqarish", "Audit export"],
  Reviewer: ["Kurs ko‘rish", "Baholash", "Audit export"],
}

export function AdminRoles() {
  return (
    <Card>
      <CardHead title="Role permission matrix" sub="Student, Teacher, Admin va Reviewer ruxsatlari" />
      <Table
        headers={["Permission", ...roles]}
        rows={permissions.map((permission) => [
          <div className="font-bold text-slate-950">{permission}</div>,
          ...roles.map((role) => {
            const enabled = matrix[role].includes(permission)
            const Icon = enabled ? ToggleRight : ToggleLeft
            return (
              <span className="inline-flex items-center gap-2">
                <Icon className={`h-5 w-5 ${enabled ? "text-emerald-500" : "text-slate-300"}`} />
                <Badge tone={enabled ? "emerald" : "slate"}>{enabled ? "On" : "Off"}</Badge>
              </span>
            )
          }),
        ])}
      />
    </Card>
  )
}
