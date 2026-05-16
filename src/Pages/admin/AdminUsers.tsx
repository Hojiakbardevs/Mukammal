import { useMemo, useState } from "react"

import { Avatar, Btn, Card, CardHead, Icon, Pill, Toolbar, type PillTone } from "@/components/dashboard/LmsPrimitives"
import { USERS } from "@/data/lmsData"

function statusTone(status: string): PillTone {
  if (status === "active") return "green"
  if (status === "at-risk") return "amber"
  if (status === "blocked") return "red"
  if (status === "completed") return "blue"
  return "gray"
}

function roleTone(role: string): PillTone {
  if (role === "Super Admin") return "purple"
  if (role === "Trener") return "blue"
  if (role === "Reviewer") return "teal"
  return "gray"
}

export function AdminUsers() {
  const [query, setQuery] = useState("")
  const [role, setRole] = useState("all")
  const users = useMemo(() => {
    const q = query.trim().toLowerCase()
    return USERS.filter((user) => {
      const matchesQuery = !q || user.name.toLowerCase().includes(q) || user.email.toLowerCase().includes(q)
      const matchesRole = role === "all" || user.role === role
      return matchesQuery && matchesRole
    })
  }, [query, role])

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Foydalanuvchilar</h1>
          <p>Users table, role badge, status, search/filter va activate/block amallari.</p>
        </div>
      </div>

      <Card>
        <Toolbar>
          <div className="tb-search-wrap" style={{ flex: "0 0 320px" }}>
            <Icon name="search" />
            <input className="tb-search" style={{ width: "100%" }} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ism yoki email bo'yicha qidirish" />
          </div>
          <select className="select" style={{ width: 220 }} value={role} onChange={(event) => setRole(event.target.value)}>
            <option value="all">Barcha rollar</option>
            <option value="Tinglovchi">Tinglovchi</option>
            <option value="Trener">Trener</option>
            <option value="Reviewer">Reviewer</option>
            <option value="Super Admin">Super Admin</option>
          </select>
          <div className="spacer" />
          <Btn size="sm" leftIcon="user-plus">Invite</Btn>
          <Btn size="sm" leftIcon="download">Eksport</Btn>
        </Toolbar>
        <CardHead title="Users table" count={users.length} />
        <div className="table-wrap" style={{ border: 0, borderRadius: 0 }}>
          <table className="t">
            <thead>
              <tr>
                <th>Foydalanuvchi</th>
                <th>Rol</th>
                <th>Status</th>
                <th>O'quv oqimi</th>
                <th>Oxirgi faollik</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.email}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar name={user.name} tone={user.tone} size="sm" />
                      <div>
                        <b>{user.name}</b>
                        <div style={{ color: "var(--text3)", fontSize: 11 }}>{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><Pill tone={roleTone(user.role)}>{user.role}</Pill></td>
                  <td><Pill tone={statusTone(user.status)} dot>{user.status}</Pill></td>
                  <td>{user.learningStream}</td>
                  <td>{user.last}</td>
                  <td className="right">
                    <Btn size="sm" variant={user.status === "blocked" ? "success" : "danger"} leftIcon={user.status === "blocked" ? "user-check" : "user-off"}>
                      {user.status === "blocked" ? "Faollashtirish" : "Bloklash"}
                    </Btn>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  )
}
