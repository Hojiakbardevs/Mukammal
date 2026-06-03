import { NavLink, useNavigate } from "react-router-dom"

import { Icon } from "@/components/dashboard/LmsPrimitives"
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"
import {
  adminNav,
  studentNav,
  superAdminNav,
  teacherNav,
  type LmsNavEntry,
  type LmsRole,
} from "@/data/navItems"
import TrainingLogo from "@/assets/training.png"

function navForRole(role: LmsRole) {
  if (role === "super_admin") return superAdminNav
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
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const effectiveRole = user?.role ?? role
  const nav = navForRole(effectiveRole)

  const displayName = user?.fullName ?? "Foydalanuvchi"
  const displayTitle = user?.position ?? user?.title ?? ""
  const displayInit = user?.initials ?? "?"

  function handleLogout() {
    logout()
    navigate("/login")
  }

  return (
    <>
      {mobileOpen && (
        <div className="sb-overlay" onClick={onMobileClose} aria-hidden="true" />
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
                {effectiveRole === "student" ? "O'qish · O'sish" : "Ta'lim operatsiyalari"}
              </div>
            </div>
          )}
          <button className="sb-collapse-btn" onClick={onToggle} aria-label="Sidebar toggle">
            <Icon name={collapsed ? "chevron-right" : "chevron-left"} />
          </button>
        </div>

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

        <div
          className={cn("sb-foot", collapsed && "sb-foot-sm")}
          role="button"
          tabIndex={0}
          onClick={!collapsed ? handleLogout : undefined}
          onKeyDown={(e) => e.key === "Enter" && !collapsed && handleLogout()}
          title={collapsed ? "Chiqish" : undefined}
          style={{ cursor: "pointer" }}
        >
          <div className="sb-foot-avatar">{displayInit}</div>
          {!collapsed && (
            <>
              <div className="sb-foot-info">
                <div className="sb-foot-name">{displayName}</div>
                <div className="sb-foot-sub">{displayTitle}</div>
              </div>
              <Icon
                name="logout"
                style={{ color: "rgba(255,255,255,0.4)", fontSize: 16, flexShrink: 0 }}
              />
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

  return (
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
}
