import { NavLink } from "react-router-dom"

import { Icon } from "@/components/dashboard/LmsPrimitives"
import { adminNav, studentNav, teacherNav, type LmsNavEntry, type LmsRole } from "@/data/navItems"

const roleUsers = {
  student: { name: "Aziza Mahmudova", title: "NLP-26 · Level 4", init: "AM" },
  teacher: { name: "Aziza Tursunova", title: "Lead Trener · AI/ML", init: "AT" },
  admin: { name: "Rustam Abdullaev", title: "Super Admin · AIRI", init: "RA" },
} satisfies Record<LmsRole, { name: string; title: string; init: string }>

function navForRole(role: LmsRole) {
  if (role === "admin") return adminNav
  if (role === "teacher") return teacherNav
  return studentNav
}

type SidebarProps = {
  role: LmsRole
  pageKey: string
}

export function Sidebar({ role, pageKey }: SidebarProps) {
  const user = roleUsers[role]
  const nav = navForRole(role)

  return (
    <aside className="sb">
      <div className="sb-brand">
        <div className="sb-logo">AI</div>
        <div>
          <span className="sb-brand-name">AIRI Training</span>
          <div className="sb-brand-sub">{role === "student" ? "O'qish · O'sish" : "Ta'lim operatsiyalari"}</div>
        </div>
      </div>

      <div className="sb-role-switch">
        <NavLink to="/app" className={`sb-role-btn ${role === "student" ? "active" : ""}`}>
          <Icon name="school" /> Tinglovchi
        </NavLink>
        <NavLink to="/teacher" className={`sb-role-btn ${role === "teacher" ? "active" : ""}`}>
          <Icon name="chalkboard" /> Trener
        </NavLink>
        <NavLink to="/admin" className={`sb-role-btn ${role === "admin" ? "active" : ""}`}>
          <Icon name="shield-half" /> Admin
        </NavLink>
      </div>

      <nav className="sb-nav">
        {nav.map((item, index) => {
          if ("section" in item) {
            return (
              <div key={`${item.section}-${index}`} className="sb-section">
                {item.section}
              </div>
            )
          }

          return <SidebarItem key={item.pageKey} item={item} active={pageKey === item.pageKey} />
        })}
      </nav>

      <div className="sb-foot">
        <div className="sb-foot-avatar">{user.init}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="sb-foot-name">{user.name}</div>
          <div className="sb-foot-sub">{user.title}</div>
        </div>
        <Icon name="chevron-up-down" style={{ color: "rgba(255,255,255,0.4)", fontSize: 16 }} />
      </div>
    </aside>
  )
}

type SidebarItemProps = {
  item: Extract<LmsNavEntry, { pageKey: string }>
  active: boolean
}

function SidebarItem({ item, active }: SidebarItemProps) {
  const badgeClass = item.badge?.kind === "amber" ? "b-amber" : item.badge?.kind === "mute" ? "b-mute" : ""

  return (
    <NavLink className={`sb-item ${active ? "active" : ""}`} to={item.href}>
      <Icon name={item.icon} />
      <span>{item.label}</span>
      {item.badge ? <span className={`sb-badge ${badgeClass}`.trim()}>{item.badge.text}</span> : null}
    </NavLink>
  )
}
