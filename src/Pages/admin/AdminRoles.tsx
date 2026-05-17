import { useState } from "react"

import { Btn, Card, CardHead, Check, Icon, Pill, Stat } from "@/components/dashboard/LmsPrimitives"

type Role = "student" | "teacher" | "admin" | "reviewer"

type Permission = {
  key: string
  label: string
  desc: string
  category: string
  student: boolean
  teacher: boolean
  admin: boolean
  reviewer: boolean
}

const PERMISSIONS: Permission[] = [
  { key: "course.read", label: "Kursni ko'rish", desc: "Kurs kontentiga kirish", category: "Kurs", student: true, teacher: true, admin: true, reviewer: true },
  { key: "lesson.complete", label: "Darsni tugatish", desc: "Progress belgilash", category: "Kurs", student: true, teacher: false, admin: false, reviewer: false },
  { key: "course.create", label: "Kurs yaratish", desc: "Yangi kurs qo'shish", category: "Kurs", student: false, teacher: true, admin: true, reviewer: false },
  { key: "grade.read", label: "Baholarni ko'rish", desc: "O'z baholarini ko'rish", category: "Baholash", student: true, teacher: true, admin: true, reviewer: true },
  { key: "grade.write", label: "Baho yozish", desc: "Talabani baholash", category: "Baholash", student: false, teacher: true, admin: false, reviewer: true },
  { key: "grade.override", label: "Bahoni o'zgartirish", desc: "Tasdiqlangan bahoni qayta yozish", category: "Baholash", student: false, teacher: false, admin: true, reviewer: false },
  { key: "user.manage", label: "Foydalanuvchi boshqarish", desc: "Invite, block, role o'zgartirish", category: "Tizim", student: false, teacher: false, admin: true, reviewer: false },
  { key: "audit.read", label: "Audit ko'rish", desc: "Journal loglarini ko'rish", category: "Tizim", student: false, teacher: false, admin: true, reviewer: true },
  { key: "audit.export", label: "Audit eksport", desc: "SIEM eksport va CSV", category: "Tizim", student: false, teacher: false, admin: true, reviewer: false },
  { key: "policy.ai", label: "SI siyosatini sozlash", desc: "Model threshold, plagiat sozlamalari", category: "SI", student: false, teacher: false, admin: true, reviewer: false },
  { key: "certificate.issue", label: "Sertifikat berish", desc: "Sertifikat chiqarish va bekor qilish", category: "Sertifikat", student: false, teacher: false, admin: true, reviewer: false },
  { key: "moderation.review", label: "Moderatsiya", desc: "Flaglangan kontentni ko'rib chiqish", category: "Moderatsiya", student: false, teacher: false, admin: true, reviewer: true },
]

const CATEGORIES = [...new Set(PERMISSIONS.map((p) => p.category))]

const ROLES: { key: Role; label: string; icon: string; color: string }[] = [
  { key: "student", label: "Tinglovchi", icon: "school", color: "#3b82f6" },
  { key: "teacher", label: "Trener", icon: "chalkboard", color: "#10b981" },
  { key: "reviewer", label: "Reviewer", icon: "eye-check", color: "#0d9488" },
  { key: "admin", label: "Super Admin", icon: "shield-check", color: "#7c3aed" },
]

export function AdminRoles() {
  const [perms, setPerms] = useState<Permission[]>(PERMISSIONS)

  function toggle(key: string, role: Role) {
    setPerms((prev) =>
      prev.map((p) => (p.key === key ? { ...p, [role]: !p[role as keyof Permission] } : p))
    )
  }

  const totalPerRole: Record<Role, number> = {
    student: perms.filter((p) => p.student).length,
    teacher: perms.filter((p) => p.teacher).length,
    reviewer: perms.filter((p) => p.reviewer).length,
    admin: perms.filter((p) => p.admin).length,
  }

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Rollar va ruxsatlar</h1>
          <p>RBAC matritsasi: har bir rolga tegishli ruxsatlarni ko'rish va sozlash.</p>
        </div>
        <div className="page-actions">
          <Btn leftIcon="history">O'zgarishlar tarixi</Btn>
          <Btn variant="primary" leftIcon="device-floppy">Saqlash</Btn>
        </div>
      </div>

      <div className="stat-grid cols-4" style={{ marginBottom: 14 }}>
        {ROLES.map((role) => (
          <Stat
            key={role.key}
            tone={role.key === "student" ? "blue" : role.key === "teacher" ? "green" : role.key === "reviewer" ? "green" : "purple"}
            label={role.label}
            value={totalPerRole[role.key]}
            unit={` / ${PERMISSIONS.length}`}
            sub="ruxsat berilgan"
          />
        ))}
      </div>

      <div className="grid c-7-5">
        {/* Ruxsatlar matritsasi */}
        <Card>
          <CardHead
            title="Ruxsatlar matritsasi"
            actions={<Pill tone="purple" icon="shield-check">RBAC v3.1</Pill>}
          />
          <div style={{ overflowX: "auto" }}>
            <table className="t">
              <thead>
                <tr>
                  <th>Ruxsat</th>
                  {ROLES.map((r) => (
                    <th key={r.key} style={{ textAlign: "center" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                        <Icon name={r.icon} style={{ color: r.color }} />
                        <span style={{ fontSize: 11 }}>{r.label}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CATEGORIES.map((cat) => (
                  <>
                    <tr key={`cat-${cat}`} style={{ background: "var(--bg2)" }}>
                      <td colSpan={5} style={{ fontWeight: 700, fontSize: 11, color: "var(--text3)", textTransform: "uppercase", letterSpacing: 0.8, padding: "6px 14px" }}>
                        {cat}
                      </td>
                    </tr>
                    {perms.filter((p) => p.category === cat).map((permission) => (
                      <tr key={permission.key}>
                        <td>
                          <div style={{ fontWeight: 600 }}>{permission.label}</div>
                          <div style={{ color: "var(--text3)", fontSize: 11 }}>{permission.key}</div>
                        </td>
                        {ROLES.map((r) => (
                          <td key={r.key} style={{ textAlign: "center" }}>
                            <Check
                              value={permission[r.key] as boolean}
                              onChange={() => toggle(permission.key, r.key)}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card-foot">
            <span><Icon name="shield-lock" /> Har bir toggle o'zgarishi audit jurnaliga yoziladi</span>
            <span style={{ color: "var(--text3)", fontSize: 12 }}>Policy v3.1 · 16-May 2026</span>
          </div>
        </Card>

        {/* Rol tavsiflari */}
        <div style={{ display: "grid", gap: 12, alignContent: "start" }}>
          {ROLES.map((role) => (
            <Card key={role.key}>
              <div className="card-pad">
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span className="thumb" style={{ background: role.color + "22", color: role.color }}>
                    <Icon name={role.icon} />
                  </span>
                  <div>
                    <div style={{ fontWeight: 700 }}>{role.label}</div>
                    <div style={{ fontSize: 11, color: "var(--text3)" }}>{totalPerRole[role.key]} ta ruxsat</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {perms.filter((p) => p[role.key]).slice(0, 4).map((p) => (
                    <span key={p.key} style={{ fontSize: 11, padding: "2px 6px", borderRadius: 4, background: "var(--bg2)", color: "var(--text2)" }}>
                      {p.label}
                    </span>
                  ))}
                  {perms.filter((p) => p[role.key]).length > 4 && (
                    <span style={{ fontSize: 11, padding: "2px 6px", borderRadius: 4, background: "var(--bg2)", color: "var(--text3)" }}>
                      +{perms.filter((p) => p[role.key]).length - 4} ta
                    </span>
                  )}
                </div>
              </div>
            </Card>
          ))}

          <div className="alert amber">
            <Icon name="alert-triangle" />
            <div className="body">
              <h4>Ehtiyot bo'ling</h4>
              <p>grade.override va policy.ai ruxsatlari faqat Super Admin uchun tavsiya qilinadi.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
