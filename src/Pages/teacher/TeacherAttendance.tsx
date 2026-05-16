import { Avatar, Btn, Card, CardHead, Heat, Icon, Pill, Stat, type PillTone } from "@/components/dashboard/LmsPrimitives"
import { ATTENDANCE_ROWS } from "@/data/lmsData"

const statusLabels: Record<string, string> = {
  present: "Keldi",
  absent: "Kelmadi",
  late: "Kechikdi",
  excused: "Sababli",
} satisfies Record<string, string>

function statusTone(status: string): PillTone {
  if (status === "present") return "green"
  if (status === "absent") return "red"
  if (status === "late") return "amber"
  return "blue"
}

export function TeacherAttendance() {
  const present = ATTENDANCE_ROWS.filter((row) => row.status === "present").length
  const absent = ATTENDANCE_ROWS.filter((row) => row.status === "absent").length
  const late = ATTENDANCE_ROWS.filter((row) => row.status === "late").length
  const excused = ATTENDANCE_ROWS.filter((row) => row.status === "excused").length

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Davomat</h1>
          <p>Present, absent, late va excused statuslari bilan sessiya davomat jadvali.</p>
        </div>
        <div className="page-actions">
          <Btn leftIcon="qr-code">QR davomat</Btn>
          <Btn variant="primary" leftIcon="device-floppy">Saqlash</Btn>
        </div>
      </div>

      <div className="stat-grid cols-5" style={{ marginBottom: 14 }}>
        <Stat tone="blue" label="Tinglovchilar" value={ATTENDANCE_ROWS.length} sub="ML-26-2A guruhi" />
        <Stat tone="green" label="Keldi" value={present} sub={`${Math.round((present / ATTENDANCE_ROWS.length) * 100)}%`} />
        <Stat tone="red" label="Kelmadi" value={absent} sub="2 ta yangi signal" />
        <Stat tone="amber" label="Kechikdi" value={late} sub="3+ marta signal" />
        <Stat tone="purple" label="Sababli" value={excused} sub="Hujjat yuklangan" />
      </div>

      <Card>
        <CardHead title="Davomat jadvali" sub="16-May · 10:00 · Lab" />
        <div className="table-wrap" style={{ border: 0, borderRadius: 0 }}>
          <table className="t">
            <thead>
              <tr>
                <th>Tinglovchi</th>
                <th>Guruh</th>
                <th>Davomat tarixi</th>
                <th className="center">Bugungi holat</th>
                <th>Izoh</th>
              </tr>
            </thead>
            <tbody>
              {ATTENDANCE_ROWS.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar name={row.student.name} tone={row.student.tone} size="sm" />
                      <b>{row.student.name}</b>
                    </div>
                  </td>
                  <td>{row.student.group}</td>
                  <td>
                    <div style={{ display: "flex", gap: 3 }}>
                      {row.history.map((value, index) => <Heat key={`${row.id}-${index}`} value={value} />)}
                    </div>
                  </td>
                  <td className="center">
                    <Pill tone={statusTone(row.status)} dot>{statusLabels[row.status]}</Pill>
                  </td>
                  <td>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-foot">
          <span><Icon name="clock" /> Auto-save 30s · oxirgi saqlash 10:42</span>
          <span>Excel import tayyor</span>
        </div>
      </Card>
    </>
  )
}
