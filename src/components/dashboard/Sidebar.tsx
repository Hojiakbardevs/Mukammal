import { NavLink } from "react-router-dom"
import { Icon } from "@/components/dashboard/LmsPrimitives"
import { cn } from "@/lib/utils"
import { adminNav, studentNav, teacherNav, type LmsNavEntry, type LmsRole } from "@/data/navItems"
import TrainingLogo from "@/assets/training.png"

const roleUsers = {
  student: { name: "Aziza Mahmudova", title: "NLP-26 · Level 4", init: "AM" },
  teacher: { name: "Shukrullo Sadullayev", title: "Lead Trener · AI/ML", init: "SS" },
  admin: { name: "Anvarxo'dja Kadirov", title: "Super Admin · Direktor", init: "AK" },
} satisfies Record<LmsRole, { name: string; title: string; init: string }>

function navForRole(role: LmsRole) {
  if (role === "admin") return adminNav
  if (role === "teacher") return teacherNav
  return studentNav
}

type SidebarProps = {
  role: LmsRole
  collapsed: boolean
  onToggle: () => void
  mobileOpen: boolean
  onMobileClose: () => void
}

export function Sidebar({ role, collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const user = roleUsers[role]
  const nav = navForRole(role)

  return (
    <>
      {mobileOpen && (
        <div
          className="sb-overlay"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      <aside className={cn("sb", collapsed && "sb-collapsed", mobileOpen && "sb-mobile-open")}>
        <div className="sb-brand">
          <div className={cn("sb-logo", collapsed && "sb-logo-sm")}>
            <img src={TrainingLogo} alt="AIRI Training" />
          </div>
          {!collapsed && (
            <div className="sb-brand-text">
              <span className="sb-brand-name">AIRI Training</span>
              <div className="sb-brand-sub">
                {role === "student" ? "O'qish · O'sish" : "Ta'lim operatsiyalari"}
              </div>
            </div>
          )}
          <button className="sb-collapse-btn" onClick={onToggle} aria-label="Sidebar toggle">
            <Icon name={collapsed ? "chevron-right" : "chevron-left"} />
          </button>
        </div>

        {!collapsed && (
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
        )}

        <nav className="sb-nav">
          {nav.map((item, index) => {
            if ("section" in item) {
              return (
                <div
                  key={`${item.section}-${index}`}
                  className={cn("sb-section", collapsed && "sb-section-divider")}
                >
                  {!collapsed && item.section}
                </div>
              )
            }
            return <SidebarItem key={item.pageKey} item={item} collapsed={collapsed} />
          })}
        </nav>

        <div className={cn("sb-foot", collapsed && "sb-foot-sm")}>
          <div className="sb-foot-avatar">{user.init}</div>
          {!collapsed && (
            <>
              <div className="sb-foot-info">
                <div className="sb-foot-name">{user.name}</div>
                <div className="sb-foot-sub">{user.title}</div>
              </div>
              <Icon name="chevron-up-down" style={{ color: "rgba(255,255,255,0.4)", fontSize: 16, flexShrink: 0 }} />
            </>
          )}
        </div>
      </aside>
    </>
  )
}

type SidebarItemProps = {
  item: Extract<LmsNavEntry, { pageKey: string }>
  collapsed: boolean
}

function SidebarItem({ item, collapsed }: SidebarItemProps) {
  const badgeClass =
    item.badge?.kind === "amber" ? "b-amber"
    : item.badge?.kind === "mute" ? "b-mute"
    : ""

  const link = (
    <NavLink
      className={({ isActive }) => cn("sb-item", isActive && "active")}
      to={item.href}
      end
      title={collapsed ? item.label : undefined}
      aria-label={collapsed ? item.label : undefined}
    >
      <Icon name={item.icon} />
      {!collapsed && <span className="sb-item-label">{item.label}</span>}
      {!collapsed && item.badge ? (
        <span className={cn("sb-badge", badgeClass)}>{item.badge.text}</span>
      ) : null}
      {collapsed && item.badge ? <span className="sb-badge-dot" /> : null}
    </NavLink>
  )

  return link
}
