import { Badge, Card, CardHead, Stat, Table } from "@/components/ui"
import { STUDENTS } from "@/data/lmsData"

const statuses = ["Keldi", "Kechikdi", "Keldi", "Uzrli", "Keldi", "Kelmadi", "Keldi", "Kechikdi"]

export function TeacherAttendance() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Stat label="Keldi" value="84%" sub="Bugungi dars" tone="emerald" />
        <Stat label="Kechikdi" value="6" sub="2 tasi takroriy" tone="amber" />
        <Stat label="Kelmadi" value="3" sub="Risk paneliga tushdi" tone="rose" />
        <Stat label="Uzrli" value="2" sub="Hujjat biriktirilgan" tone="blue" />
      </div>
      <Card>
        <CardHead title="Davomat jadvali" sub="Present, absent, late, excused statuslari" />
        <Table
          headers={["Tinglovchi", "O‘quv oqimi", "Davomat", "Bugungi holat", "Izoh"]}
          rows={STUDENTS.map((student, index) => {
            const status = statuses[index]
            const tone = status === "Keldi" ? "emerald" : status === "Kechikdi" ? "amber" : status === "Uzrli" ? "blue" : "rose"
            return [
              <div className="font-bold text-slate-950">{student.name}</div>,
              student.group,
              `${student.attendance}%`,
              <Badge tone={tone}>{status}</Badge>,
              status === "Kelmadi" ? "Trener bog‘lanishi kerak" : "Darsga kiritildi",
            ]
          })}
        />
      </Card>
    </div>
  )
}
