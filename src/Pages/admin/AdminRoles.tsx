import { useState } from "react"
import { Btn, Card, CardHead, Icon, Pill, Toggle } from "@/components/dashboard/LmsPrimitives"
import {
  ROLE_DEFS,
  PERM_DEFS,
  PERM_CATEGORIES,
  DEFAULT_ROLE_PERMISSIONS,
  type RoleId,
} from "@/data/rolesData"

type PermState = Record<RoleId, Record<string, boolean>>

export function AdminRoles() {
  const [selected, setSelected] = useState<RoleId>("trainer")
  const [perms, setPerms] = useState<PermState>(DEFAULT_ROLE_PERMISSIONS)

  function toggle(key: string) {
    setPerms((prev) => ({
      ...prev,
      [selected]: { ...prev[selected], [key]: !prev[selected][key] },
    }))
  }

  const activeRole = ROLE_DEFS.find((r) => r.id === selected)!
  const activePerms = perms[selected]
  const enabledCount = Object.values(activePerms).filter(Boolean).length

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Rollar va ruxsatlar</h1>
          <p>Har bir rol uchun aniq permission matritsasi. Critical ruxsatlar majburiy ravishda audit jurnaliga yoziladi va Super Admin tasdig'ini talab qiladi.</p>
        </div>
        <div className="page-actions">
          <Btn leftIcon="history">O'zgarishlar tarixi</Btn>
          <Btn variant="primary" leftIcon="device-floppy">Saqlash</Btn>
        </div>
      </div>

      <div className="alert blue" style={{ marginBottom: 16 }}>
        <Icon name="shield-lock" />
        <div className="body">
          <h4>RBAC: rol-ga asoslangan boshqaruv</h4>
          <p>
            Har bir rol uchun aniq permission matritsasi. Critical ruxsatlar (qizil{" "}
            <Icon name="alert-triangle" style={{ fontSize: 12 }} />) majburiy ravishda audit
            jurnaliga yoziladi va Super Admin tasdig'ini talab qiladi.
          </p>
        </div>
      </div>

      <div className="roles-split">
        {/* Left panel — role list */}
        <Card>
          <CardHead
            title="Rollar"
            count={ROLE_DEFS.length}
            actions={
              <Btn variant="primary" size="sm" leftIcon="plus">
                Yangi rol
              </Btn>
            }
          />
          <div className="roles-list">
            {ROLE_DEFS.map((role) => {
              return (
                <div
                  key={role.id}
                  className={`role-item ${selected === role.id ? "active" : ""}`}
                  onClick={() => setSelected(role.id)}
                >
                  <span
                    className="role-item-icon"
                    style={{ background: role.color + "18", color: role.color }}
                  >
                    <Icon name={role.icon} />
                  </span>
                  <div className="role-item-body">
                    <b>{role.label}</b>
                    <p>{role.description}</p>
                  </div>
                  <span className="role-item-count num">{role.userCount}</span>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Right panel — permission detail */}
        <Card>
          <div className="card-head" style={{ borderBottom: "1px solid var(--border)" }}>
            <div>
              <h3 style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: activeRole.color + "18", color: activeRole.color,
                    display: "inline-grid", placeItems: "center", fontSize: 15,
                  }}
                >
                  <Icon name={activeRole.icon} />
                </span>
                {activeRole.label}
                <span className="muted">— ruxsatlar</span>
              </h3>
              <p style={{ fontSize: 12, color: "var(--text3)", marginTop: 2 }}>
                · {enabledCount} ta ruxsat &nbsp;·&nbsp; {activeRole.userCount} ta foydalanuvchi
              </p>
            </div>
            <div className="cta-row">
              <Btn size="sm" leftIcon="copy">Boshqa roldan ko'chir</Btn>
              <Btn size="sm" variant="primary" leftIcon="device-floppy">Saqlash</Btn>
            </div>
          </div>

          <div style={{ maxHeight: 540, overflowY: "auto" }}>
            {PERM_CATEGORIES.map((cat) => (
              <div key={cat}>
                <div className="perm-group-label">{cat}</div>
                {PERM_DEFS.filter((p) => p.category === cat).map((perm) => (
                  <div key={perm.key} className="perm-row">
                    <div className="perm-row-body">
                      <b>{perm.label}</b>
                      <code>{perm.key}</code>
                    </div>
                    {perm.critical && (
                      <span className="perm-critical" title="Critical — audit jurnaliga yoziladi">
                        <Icon name="alert-triangle" />
                      </span>
                    )}
                    <Toggle
                      value={activePerms[perm.key]}
                      onChange={() => toggle(perm.key)}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="card-foot">
            <span>
              <Icon name="clock" /> Oxirgi o'zgartirish: R. Abdullaev · 16-May 09:47
            </span>
            <Pill tone="purple" icon="shield-check">v3.1</Pill>
          </div>
        </Card>
      </div>
    </>
  )
}
