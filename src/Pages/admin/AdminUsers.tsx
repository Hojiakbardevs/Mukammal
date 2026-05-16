import { Search, ShieldOff, UserCheck } from "lucide-react"

import { Badge, Button, Card, CardHead, Table, Toolbar } from "@/components/ui"
import { USERS } from "@/data/lmsData"

export function AdminUsers() {
  return (
    <Card>
      <CardHead title="Foydalanuvchilar" sub="Role, status, qidiruv va aktivatsiya amallari" />
      <Toolbar>
        <label className="flex h-10 min-w-64 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-500">
          <Search className="h-4 w-4" />
          <input className="w-full bg-transparent outline-none" placeholder="Ism yoki email bo‘yicha qidirish" />
        </label>
        {["Barcha", "Tinglovchi", "Trener", "Super Admin", "Reviewer"].map((role) => (
          <Button key={role} size="sm" variant="default">{role}</Button>
        ))}
      </Toolbar>
      <Table
        headers={["Ism", "Email", "Role", "Status", "O‘quv oqimi", "Oxirgi kirish", "Amal"]}
        rows={USERS.map((user) => [
          <div className="font-bold text-slate-950">{user.name}</div>,
          user.email,
          <Badge tone={user.role === "Super Admin" ? "violet" : user.role === "Trener" ? "cyan" : "slate"}>{user.role}</Badge>,
          <Badge tone={user.status === "Riskda" ? "rose" : "emerald"}>{user.status}</Badge>,
          user.stream,
          user.last,
          <div className="flex gap-2">
            <Button size="xs" variant="success" icon={UserCheck}>Activate</Button>
            <Button size="xs" variant="danger" icon={ShieldOff}>Block</Button>
          </div>,
        ])}
      />
    </Card>
  )
}
