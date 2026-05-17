import { useMemo, useState } from "react"

import {
  Avatar,
  Btn,
  Card,
  CardHead,
  Drawer,
  Icon,
  Pill,
  Tabs,
  Toolbar,
  type PillTone,
} from "@/components/dashboard/LmsPrimitives"
import { USERS, type UserRecord } from "@/data/lmsData"

// ── Helpers ──────────────────────────────────────────────────────────────────

function statusTone(status: string): PillTone {
  if (status === "active")    return "green"
  if (status === "at-risk")   return "amber"
  if (status === "blocked")   return "red"
  if (status === "completed") return "blue"
  return "gray"
}

function roleTone(role: string): PillTone {
  if (role === "Super Admin") return "purple"
  if (role === "Admin")       return "solid-blue"
  if (role === "Teacher")     return "blue"
  if (role === "Reviewer")    return "teal"
  return "gray"
}

const ROLE_DESCRIPTIONS: Record<string, string> = {
  "Super Admin": "Platformaning to'liq governance markazi: foydalanuvchi, kurs, AI politikasi, audit.",
  "Admin":       "Operatsion boshqaruv: kurs, o'quv oqimi, foydalanuvchi va jadval. AI politikani o'zgartira olmaydi.",
  "Teacher":     "O'z kurslari ichida modul, dars, vazifa, baholash va davomatni boshqaradi.",
  "Reviewer":    "AI baholash va appeal natijalarini ko'rib chiqadi. Baholarni faqat appeal flow'da o'zgartira oladi.",
  "Student":     "O'qish, topshirish va sertifikat olish — boshqa hech narsa.",
}

// ── Constants ─────────────────────────────────────────────────────────────────

const ROLE_TABS = [
  { value: "all",            label: "Hammasi" },
  { value: "student",        label: "Talabalar" },
  { value: "teacher",        label: "O'qituvchilar" },
  { value: "admin-reviewer", label: "Admin & Reviewers" },
  { value: "inactive-risk",  label: "Inaktiv / Risk" },
]

function isAdminOrReviewer(role: string) {
  return role === "Super Admin" || role === "Admin" || role === "Reviewer"
}

function countByTab(value: string) {
  if (value === "all")            return USERS.length
  if (value === "student")        return USERS.filter((u) => u.role === "Student").length
  if (value === "teacher")        return USERS.filter((u) => u.role === "Teacher").length
  if (value === "admin-reviewer") return USERS.filter((u) => isAdminOrReviewer(u.role)).length
  if (value === "inactive-risk")  return USERS.filter((u) => u.status !== "active").length
  return 0
}

// ── Sub-components ────────────────────────────────────────────────────────────

function TwoFaBadge({ on }: { on: boolean }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 99,
      background: on ? "rgba(22,163,74,0.12)" : "rgba(217,119,6,0.12)",
      color: on ? "var(--green)" : "var(--amber)",
      border: `1px solid ${on ? "rgba(22,163,74,0.25)" : "rgba(217,119,6,0.25)"}`,
    }}>
      <Icon name={on ? "lock" : "alert-triangle"} style={{ width: 11, height: 11 }} />
      {on ? "on" : "off"}
    </span>
  )
}

function ModeBadge({ mode }: { mode: "offline" | "online" }) {
  const isOffline = mode === "offline"
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 99,
      background: isOffline ? "rgba(99,102,241,0.12)" : "rgba(14,165,233,0.12)",
      color: isOffline ? "#818cf8" : "#38bdf8",
      border: `1px solid ${isOffline ? "rgba(99,102,241,0.25)" : "rgba(14,165,233,0.25)"}`,
    }}>
      <Icon name={isOffline ? "building" : "wifi"} style={{ width: 11, height: 11 }} />
      {isOffline ? "Offline" : "Online"}
    </span>
  )
}

// Profile info row
function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {label}
      </span>
      <span style={{ fontSize: 13, color: "var(--text1)", fontWeight: 500 }}>
        {children}
      </span>
    </div>
  )
}

// ── CSV export ────────────────────────────────────────────────────────────────

function exportCSV(rows: UserRecord[]) {
  const headers = ["Ism", "Email", "Rol", "Status", "O'quv oqimi", "Oxirgi faollik", "2FA", "Ishtirok shakli"]
  const lines = rows.map((u) => [
    u.name, u.email, u.role, u.status, u.learningStream, u.last,
    u.twoFa ? "on" : "off", u.mode,
  ].map((v) => `"${v}"`).join(","))
  const csv = [headers.join(","), ...lines].join("\n")
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `foydalanuvchilar_${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

// ── Main component ────────────────────────────────────────────────────────────

type ModeFilter = "all" | "offline" | "online"

const MODE_CYCLE: ModeFilter[] = ["all", "offline", "online"]
const MODE_LABEL: Record<ModeFilter, string> = {
  all: "Barcha rejim",
  offline: "Offline",
  online: "Online",
}
const MODE_ICON: Record<ModeFilter, string> = {
  all: "layout-grid",
  offline: "building",
  online: "wifi",
}

export function AdminUsers() {
  const [roleTab,    setRoleTab]    = useState("all")
  const [query,      setQuery]      = useState("")
  const [modeFilter, setModeFilter] = useState<ModeFilter>("all")
  const [selected,   setSelected]   = useState<Set<string>>(new Set())
  const [drawer,     setDrawer]     = useState<UserRecord | null>(null)

  function cycleMode() {
    setModeFilter((cur) => {
      const idx = MODE_CYCLE.indexOf(cur)
      return MODE_CYCLE[(idx + 1) % MODE_CYCLE.length]
    })
  }

  const users = useMemo(() => {
    const q = query.trim().toLowerCase()
    return USERS.filter((user) => {
      const matchRole =
        roleTab === "all" ||
        (roleTab === "student"        && user.role === "Student") ||
        (roleTab === "teacher"        && user.role === "Teacher") ||
        (roleTab === "admin-reviewer" && isAdminOrReviewer(user.role)) ||
        (roleTab === "inactive-risk"  && user.status !== "active")
      const matchMode  = modeFilter === "all" || user.mode === modeFilter
      const matchQuery = !q || user.name.toLowerCase().includes(q) || user.email.toLowerCase().includes(q)
      return matchRole && matchMode && matchQuery
    })
  }, [roleTab, modeFilter, query])

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

  const offlineCount = USERS.filter((u) => u.mode === "offline").length
  const onlineCount  = USERS.filter((u) => u.mode === "online").length

  return (
    <>
      {/* ── Page head ── */}
      <div className="page-head">
        <div>
          <h1>Foydalanuvchilar</h1>
          <p>Barcha rollar bo'yicha foydalanuvchilarni qidirish, filtrlash va boshqarish.</p>
        </div>
        <div className="page-actions">
          <Btn leftIcon="upload">CSV import</Btn>
          <Btn leftIcon="download" onClick={() => exportCSV(users)}>Eksport</Btn>
          <Btn variant="primary" leftIcon="user-plus">Yangi foydalanuvchi</Btn>
        </div>
      </div>

      {/* ── Table card ── */}
      <Card>
        <Toolbar>
          {/* Search */}
          <div style={{ position: "relative", flex: "1 1 240px", maxWidth: 320 }}>
            <Icon name="search" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text3)" }} />
            <input
              className="inp"
              style={{ paddingLeft: 34, width: "100%" }}
              placeholder="Ism, email, ID bo'yicha qidirish..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Filter chips */}
          <div style={{ display: "flex", gap: 6 }}>
            {/* O'quv oqimlari stat chip */}
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              fontSize: 12, padding: "0 10px", height: 32, borderRadius: 8,
              background: "var(--bg3)", color: "var(--text2)",
              border: "1px solid var(--border)",
            }}>
              <Icon name="books" style={{ width: 13, height: 13, color: "var(--text3)" }} />
              Offline: <b>{offlineCount}</b>&nbsp;·&nbsp;Online: <b>{onlineCount}</b>
            </span>

            {/* Mode filter chip — clickable, cycles */}
            <button
              type="button"
              onClick={cycleMode}
              title="Ishtirok rejimi bo'yicha filtrlash"
              style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                fontSize: 12, padding: "0 10px", height: 32, borderRadius: 8,
                background: modeFilter !== "all" ? "rgba(99,102,241,0.12)" : "var(--bg3)",
                color: modeFilter !== "all" ? "#818cf8" : "var(--text2)",
                border: `1px solid ${modeFilter !== "all" ? "rgba(99,102,241,0.3)" : "var(--border)"}`,
                cursor: "pointer", transition: "all 0.15s",
              }}
            >
              <Icon name={MODE_ICON[modeFilter]} style={{ width: 13, height: 13 }} />
              {MODE_LABEL[modeFilter]}
            </button>
          </div>
        </Toolbar>

        {/* Tabs */}
        <Tabs
          value={roleTab}
          onChange={(v) => { setRoleTab(v); setSelected(new Set()) }}
          items={ROLE_TABS.map((t) => ({ ...t, count: countByTab(t.value) }))}
        />

        {/* Bulk actions bar */}
        {selected.size > 0 && (
          <div className="bulkbar">
            <span><b>{selected.size}</b> ta tanlangan</span>
            <Btn size="sm" variant="success" leftIcon="user-check">Faollashtirish</Btn>
            <Btn size="sm" variant="danger"  leftIcon="user-off">Bloklash</Btn>
            <Btn size="sm" variant="ghost"   leftIcon="mail">Xabar yuborish</Btn>
            <button type="button" className="btn btn-ghost btn-icon" onClick={() => setSelected(new Set())} aria-label="Bekor qilish">
              <Icon name="x" />
            </button>
          </div>
        )}

        <CardHead title="Foydalanuvchilar jadvali" count={users.length} />

        {/* Table */}
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
                <th>Ishtirok</th>
                <th>Oxirgi faollik</th>
                <th>2FA</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.email} style={{ cursor: "pointer" }} onClick={() => setDrawer(user)}>
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
                  <td><Pill tone={statusTone(user.status)} dot>{user.status}</Pill></td>
                  <td style={{ color: "var(--text2)", fontSize: 13 }}>{user.learningStream}</td>
                  <td><ModeBadge mode={user.mode} /></td>
                  <td style={{ color: "var(--text3)", fontSize: 13 }}>{user.last}</td>
                  <td><TwoFaBadge on={user.twoFa} /></td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                      <Btn size="icon" variant="ghost" ariaLabel="Parol tiklash">
                        <Icon name="key" />
                      </Btn>
                      <Btn size="sm" variant="ghost" onClick={() => setDrawer(user)}>
                        → Profil
                      </Btn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ── Profile Drawer ── */}
      <Drawer
        open={drawer !== null}
        onClose={() => setDrawer(null)}
        title="Foydalanuvchi profili"
        footer={
          <>
            <Btn
              variant={drawer?.status === "blocked" ? "success" : "danger"}
              leftIcon={drawer?.status === "blocked" ? "user-check" : "user-off"}
            >
              {drawer?.status === "blocked" ? "Faollashtirish" : "Bloklash"}
            </Btn>
            <Btn variant="ghost" onClick={() => setDrawer(null)}>Yopish</Btn>
          </>
        }
      >
        {drawer && <UserProfile user={drawer} />}
      </Drawer>
    </>
  )
}

// ── UserProfile (drawer content) ──────────────────────────────────────────────

function UserProfile({ user }: { user: UserRecord }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>

      {/* ── Hero header ── */}
      <div style={{
        background: "linear-gradient(135deg, var(--bg3) 0%, var(--bg2) 100%)",
        borderRadius: 14,
        padding: "28px 20px 24px",
        textAlign: "center",
        border: "1px solid var(--border)",
        marginBottom: 16,
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Subtle glow behind avatar */}
        <div style={{
          position: "absolute", top: -30, left: "50%", transform: "translateX(-50%)",
          width: 160, height: 160, borderRadius: "50%",
          background: "rgba(99,102,241,0.08)", filter: "blur(40px)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative" }}>
          <Avatar name={user.name} tone={user.tone} size="lg" />
        </div>

        <div style={{ marginTop: 14, fontWeight: 800, fontSize: 17, color: "var(--text1)" }}>
          {user.name}
        </div>
        <div style={{ color: "var(--text3)", fontSize: 13, marginTop: 3, fontFamily: "monospace" }}>
          {user.email}
        </div>

        {/* Badges */}
        <div style={{ marginTop: 14, display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
          <Pill tone={roleTone(user.role)}>{user.role}</Pill>
          <Pill tone={statusTone(user.status)} dot>{user.status}</Pill>
        </div>

        {/* Role description */}
        {ROLE_DESCRIPTIONS[user.role] && (
          <div style={{
            marginTop: 14,
            padding: "8px 14px",
            borderRadius: 8,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            fontSize: 12,
            lineHeight: 1.6,
            color: "var(--text3)",
            textAlign: "left",
          }}>
            {ROLE_DESCRIPTIONS[user.role]}
          </div>
        )}
      </div>

      {/* ── Info grid ── */}
      <div style={{
        background: "var(--bg2)",
        borderRadius: 12,
        border: "1px solid var(--border)",
        overflow: "hidden",
        marginBottom: 12,
      }}>
        {/* Section label */}
        <div style={{
          padding: "10px 16px",
          borderBottom: "1px solid var(--border)",
          fontSize: 11,
          fontWeight: 700,
          color: "var(--text3)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          background: "var(--bg3)",
        }}>
          Asosiy ma'lumotlar
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
          {[
            { label: "O'quv oqimi",     value: user.learningStream },
            { label: "Oxirgi faollik",  value: user.last },
            { label: "Ishtirok shakli", value: <ModeBadge mode={user.mode} /> },
            { label: "2FA holati",      value: <TwoFaBadge on={user.twoFa} /> },
          ].map((item, i) => (
            <div key={item.label} style={{
              padding: "14px 16px",
              borderBottom: i < 2 ? "1px solid var(--border)" : "none",
              borderRight: i % 2 === 0 ? "1px solid var(--border)" : "none",
            }}>
              <InfoRow label={item.label}>{item.value}</InfoRow>
            </div>
          ))}
        </div>
      </div>

      {/* ── Contact ── */}
      <div style={{
        background: "var(--bg2)",
        borderRadius: 12,
        border: "1px solid var(--border)",
        overflow: "hidden",
        marginBottom: 12,
      }}>
        <div style={{
          padding: "10px 16px",
          borderBottom: "1px solid var(--border)",
          fontSize: 11, fontWeight: 700,
          color: "var(--text3)", letterSpacing: "0.08em", textTransform: "uppercase",
          background: "var(--bg3)",
        }}>
          Aloqa
        </div>
        <div style={{ padding: "14px 16px" }}>
          <InfoRow label="Email">
            <span style={{ fontFamily: "monospace", fontSize: 13 }}>{user.email}</span>
          </InfoRow>
        </div>
      </div>

      {/* ── Quick actions ── */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8,
        marginBottom: 12,
      }}>
        <button type="button" style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
          height: 38, borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: "pointer",
          background: "var(--bg3)", color: "var(--text2)",
          border: "1px solid var(--border)", transition: "all 0.15s",
        }}>
          <Icon name="key" style={{ width: 14, height: 14 }} />
          Parol tiklash
        </button>
        <button type="button" style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
          height: 38, borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: "pointer",
          background: "var(--bg3)", color: "var(--text2)",
          border: "1px solid var(--border)", transition: "all 0.15s",
        }}>
          <Icon name="mail" style={{ width: 14, height: 14 }} />
          Xabar yuborish
        </button>
        <button type="button" style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
          height: 38, borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: "pointer",
          background: "var(--bg3)", color: "var(--text2)",
          border: "1px solid var(--border)", transition: "all 0.15s",
        }}>
          <Icon name="shield-check" style={{ width: 14, height: 14 }} />
          2FA boshqarish
        </button>
        <button type="button" style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
          height: 38, borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: "pointer",
          background: "var(--bg3)", color: "var(--text2)",
          border: "1px solid var(--border)", transition: "all 0.15s",
        }}>
          <Icon name="history" style={{ width: 14, height: 14 }} />
          Audit log
        </button>
      </div>

      {/* ── Note ── */}
      <div className="note">
        <Icon name="info-circle" />
        Foydalanuvchi faoliyati audit jurnaliga avtomatik yoziladi.
      </div>
    </div>
  )
}
