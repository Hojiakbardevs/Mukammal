import { Card, CardHead, Check, Icon, Pill } from "@/components/dashboard/LmsPrimitives"

const permissions = [
  { key: "course.read", label: "Kurslarni ko'rish", student: true, teacher: true, admin: true, reviewer: true },
  { key: "lesson.complete", label: "Darsni tugatish", student: true, teacher: false, admin: false, reviewer: false },
  { key: "grade.write", label: "Bahoni yozish", student: false, teacher: true, admin: false, reviewer: true },
  { key: "grade.override", label: "Bahoni override qilish", student: false, teacher: true, admin: true, reviewer: false },
  { key: "user.manage", label: "Foydalanuvchini boshqarish", student: false, teacher: false, admin: true, reviewer: false },
  { key: "audit.export", label: "Audit eksporti", student: false, teacher: false, admin: true, reviewer: true },
  { key: "policy.ai", label: "SI siyosatini sozlash", student: false, teacher: false, admin: true, reviewer: false },
]

export function AdminRoles() {
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Rollar va ruxsatlar</h1>
          <p>Tinglovchi, Trener, Admin va Reviewer ruxsatlar matritsasi rasmiy access nazoratini ko'rsatadi.</p>
        </div>
      </div>

      <Card>
        <CardHead title="Rollar ruxsatlari matritsasi" actions={<Pill tone="blue" icon="lock">RBAC</Pill>} />
        <div className="table-wrap" style={{ border: 0, borderRadius: 0 }}>
          <table className="t">
            <thead>
              <tr>
                <th>Ruxsat</th>
                <th className="center">Tinglovchi</th>
                <th className="center">Trener</th>
                <th className="center">Admin</th>
                <th className="center">Reviewer</th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((permission) => (
                <tr key={permission.key}>
                  <td><b>{permission.label}</b><div style={{ color: "var(--text3)", fontSize: 11 }}>{permission.key}</div></td>
                  <td className="center"><Check value={permission.student} /></td>
                  <td className="center"><Check value={permission.teacher} /></td>
                  <td className="center"><Check value={permission.admin} /></td>
                  <td className="center"><Check value={permission.reviewer} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-foot">
          <span><Icon name="shield-check" /> Toggle mock: o'zgarishlar audit jurnaliga yozilishi kerak.</span>
          <span>Policy v3.1</span>
        </div>
      </Card>
    </>
  )
}
