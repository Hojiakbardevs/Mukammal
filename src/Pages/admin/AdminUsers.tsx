import { useMemo, useState } from "react"

import {
  Avatar,
  Btn,
  Card,
  CardHead,
  Drawer,
  Icon,
  Pill,
  Stat,
  Tabs,
  Toolbar,
  type PillTone,
} from "@/components/dashboard/LmsPrimitives"
import { USERS, type UserRecord } from "@/data/lmsData"

function statusTone(status: string): PillTone {
  if (status === "active") return "green"
  if (status === "at-risk") return "amber"
  if (status === "blocked") return "red"
  if (status === "completed") return "blue"
  return "gray"
}

function statusLabel(status: string) {
  if (status === "active") return "Faol"
  if (status === "at-risk") return "Risk ostida"
  if (status === "blocked") return "Bloklangan"
  if (status === "completed") return "Tugatgan"
  return "Nofaol"
}

function roleTone(role: string): PillTone {
  if (role === "Super Admin") return "purple"
  if (role === "Trener") return "blue"
  if (role === "Reviewer") return "teal"
  return "gray"
}

const ROLE_TABS = [
  { value: "all", label: "Barchasi" },
  { value: "Tinglovchi", label: "Tinglovchi" },
  { value: "Trener", label: "Trener" },
  { value: "Reviewer", label: "Reviewer" },
  { value: "Super Admin", label: "Admin" },
]

export function AdminUsers() {
  const [roleTab, setRoleTab] = useState("all")
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [drawer, setDrawer] = useState<UserRecord | null>(null)

  const users = useMemo(() => {
    const q = query.trim().toLowerCase()
    return USERS.filter((user) => {
      const matchRole = roleTab === "all" || user.role === roleTab
      const matchQuery = !q || user.name.toLowerCase().includes(q) || user.email.toLowerCase().includes(q)
      return matchRole && matchQuery
    })
  }, [roleTab, query])

  const totalActive = USERS.filter((u) => u.status === "active").length
  const totalRisk = USERS.filter((u) => u.status === "at-risk").length
  const totalBlocked = USERS.filter((u) => u.status === "blocked").length

  function toggleSelect(email: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(email)) next.delete(email)
      else next.add(email)
      return next
    })
  }

  function selectAll() {
    if (selected.size === users.length) setSelected(new Set())
    else setSelected(new Set(users.map((u) => u.email)))
  }

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Foydalanuvchilar</h1>
          <p>Barcha rollar bo'yicha foydalanuvchilarni qidirish, filtrlash, bloklash va taklif qilish.</p>
        </div>
        <div className="page-actions">
          <Btn leftIcon="user-plus">Taklif yuborish</Btn>
          <Btn variant="primary" leftIcon="download">Eksport</Btn>
        </div>
      </div>

      <div className="stat-grid cols-4" style={{ marginBottom: 14 }}>
        <Stat tone="blue"   label="Jami"         value={USERS.length}   sub="Barcha rollar" />
        <Stat tone="green"  label="Faol"          value={totalActive}    sub="Hozirda aktiv" />
        <Stat tone="amber"  label="Risk ostida"   value={totalRisk}      sub="Yordam kerak" />
        <Stat tone="red"    label="Bloklangan"    value={totalBlocked}   sub="Kirish yo'q" />
      </div>

      <Tabs
        value={roleTab}
        onChange={(v) => { setRoleTab(v); setSelected(new Set()) }}
        items={ROLE_TABS.map((t) => ({
          ...t,
          count: t.value === "all" ? USERS.length : USERS.filter((u) => u.role === t.value).length,
        }))}
      />

      <Card style={{ marginTop: 10 }}>
        <Toolbar>
          <div style={{ position: "relative", flex: "0 0 300px" }}>
            <Icon name="search" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text3)" }} />
            <input
              className="inp"
              style={{ paddingLeft: 34, width: "100%" }}
              placeholder="Ism yoki email..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="spacer" />
          <Btn size="sm" leftIcon="filter">Filter</Btn>
          <Btn size="sm" leftIcon="sort-ascending">Saralash</Btn>
        </Toolbar>

        {selected.size > 0 && (
          <div className="bulkbar">
            <span><b>{selected.size}</b> ta tanlangan</span>
            <Btn size="sm" variant="success" leftIcon="user-check">Faollashtirish</Btn>
            <Btn size="sm" variant="danger" leftIcon="user-off">Bloklash</Btn>
            <Btn size="sm" variant="ghost" leftIcon="mail">Xabar yuborish</Btn>
            <button type="button" className="btn btn-ghost btn-icon" onClick={() => setSelected(new Set())} aria-label="Bekor qilish">
              <Icon name="x" />
            </button>
          </div>
        )}

        <CardHead title="Foydalanuvchilar jadvali" count={users.length} />
        <div style={{ overflowX: "auto" }}>
          <table className="t">
            <thead>
              <tr>
                <th style={{ width: 40 }}>
                  <button
                    type="button"
                    className={`check ${selected.size === users.length && users.length > 0 ? "on" : ""}`}
                    onClick={selectAll}
                    aria-label="Hammasini tanlash"
                  />
                </th>
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
                <tr
                  key={user.email}
                  style={{ cursor: "pointer" }}
                  onClick={() => setDrawer(user)}
                >
                  <td onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      className={`check ${selected.has(user.email) ? "on" : ""}`}
                      onClick={() => toggleSelect(user.email)}
                      aria-label="Tanlash"
                    />
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar name={user.name} tone={user.tone} size="sm" />
                      <div>
                        <div style={{ fontWeight: 700 }}>{user.name}</div>
                        <div style={{ color: "var(--text3)", fontSize: 11 }}>{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><Pill tone={roleTone(user.role)}>{user.role}</Pill></td>
                  <td><Pill tone={statusTone(user.status)} dot>{statusLabel(user.status)}</Pill></td>
                  <td style={{ color: "var(--text2)", fontSize: 13 }}>{user.learningStream}</td>
                  <td style={{ color: "var(--text3)", fontSize: 13 }}>{user.last}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: "flex", gap: 4 }}>
                      <Btn size="icon" variant="ghost" ariaLabel="Ko'rish" onClick={() => setDrawer(user)}>
                        <Icon name="eye" />
                      </Btn>
                      <Btn
                        size="icon"
                        variant="ghost"
                        ariaLabel={user.status === "blocked" ? "Faollashtirish" : "Bloklash"}
                      >
                        <Icon name={user.status === "blocked" ? "user-check" : "user-off"} />
                      </Btn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ── Foydalanuvchi drawer ── */}
      <Drawer
        open={drawer !== null}
        onClose={() => setDrawer(null)}
        title="Foydalanuvchi profili"
        footer={
          <>
            <Btn variant={drawer?.status === "blocked" ? "success" : "danger"} leftIcon={drawer?.status === "blocked" ? "user-check" : "user-off"}>
              {drawer?.status === "blocked" ? "Faollashtirish" : "Bloklash"}
            </Btn>
            <Btn variant="ghost" onClick={() => setDrawer(null)}>Yopish</Btn>
          </>
        }
      >
        {drawer && (
          <div style={{ display: "grid", gap: 18 }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <Avatar name={drawer.name} tone={drawer.tone} size="lg" />
              <div>
                <div style={{ fontWeight: 800, fontSize: 16 }}>{drawer.name}</div>
                <div style={{ color: "var(--text2)", fontSize: 13 }}>{drawer.email}</div>
                <div style={{ marginTop: 6, display: "flex", gap: 6 }}>
                  <Pill tone={roleTone(drawer.role)}>{drawer.role}</Pill>
                  <Pill tone={statusTone(drawer.status)} dot>{statusLabel(drawer.status)}</Pill>
                </div>
              </div>
            </div>
            <dl className="kv-list">
              <div><dt>O'quv oqimi</dt><dd>{drawer.learningStream}</dd></div>
              <div><dt>Oxirgi faollik</dt><dd>{drawer.last}</dd></div>
              <div><dt>Email</dt><dd className="mono">{drawer.email}</dd></div>
            </dl>
            <div className="note">
              <Icon name="info-circle" />
              Foydalanuvchi faoliyati audit jurnaliga avtomatik yoziladi.
            </div>
          </div>
        )}
      </Drawer>
    </>
  )
}
