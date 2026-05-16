import { BarChart, Card, CardHead, Donut, GroupBarChart, Icon, Legend, LineChart, Pill, Stat } from "@/components/dashboard/LmsPrimitives"
import { COURSES, LEARNING_STREAMS, STUDENTS, SURVEYS } from "@/data/lmsData"

export function AdminAnalytics() {
  const totalStudents = COURSES.reduce((sum, course) => sum + course.studentsTotal, 0)
  const completion = Math.round(COURSES.reduce((sum, course) => sum + course.progress, 0) / COURSES.length)
  const certificates = 298
  const riskCount = STUDENTS.filter((student) => student.risk >= 55).length
  const activeSurvey = SURVEYS.find((survey) => survey.status === "active")

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Tahlil markazi</h1>
          <p>Ro'yxatdan o'tish grafigi, tugatish grafigi, sertifikat statistikasi, risk voronkasi va NPS monitoring.</p>
        </div>
      </div>

      <div className="stat-grid cols-5" style={{ marginBottom: 14 }}>
        <Stat tone="blue" label="Ro'yxatdan o'tgan" value={totalStudents} sub="Barcha kurslar" trend={{ dir: "up", label: "+18%" }} />
        <Stat tone="green" label="Completion" value={completion} unit="%" sub="O'rtacha" />
        <Stat tone="purple" label="Sertifikat" value={certificates} sub="Berilgan jami" />
        <Stat tone="red" label="Risk funnel" value={riskCount} sub="Yordam signali" />
        <Stat tone="amber" label="NPS" value={activeSurvey?.nps ?? 0} sub={activeSurvey?.title ?? "So'rovnoma"} />
      </div>

      <div className="grid c-7-5">
        <Card>
          <CardHead title="Ro'yxatdan o'tish grafigi" actions={<Pill tone="blue">6 oy</Pill>} />
          <div className="card-pad">
            <LineChart data={[126, 148, 176, 224, 310, totalStudents]} height={220} ariaLabel="Ro'yxatdan o'tish grafigi" />
          </div>
        </Card>

        <Card>
          <CardHead title="Tugatish grafigi" />
          <div className="card-pad">
            <BarChart data={COURSES.map((course) => course.progress)} labels={COURSES.map((course) => course.title.split(" ")[0])} height={220} color="#16a34a" />
          </div>
        </Card>
      </div>

      <div className="grid c-3" style={{ marginTop: 14 }}>
        <Card>
          <CardHead title="Sertifikat statistikasi" />
          <div className="card-pad" style={{ display: "grid", placeItems: "center", gap: 12 }}>
            <Donut
              value={74}
              tone="#7c3aed"
              center={
                <div>
                  <div className="num" style={{ fontSize: 22, fontWeight: 800 }}>74%</div>
                  <div style={{ color: "var(--text3)", fontSize: 11 }}>eligible</div>
                </div>
              }
            />
            <div className="note">Sertifikat shartlari bajarilishida final loyiha asosiy bottleneck bo'lib turibdi.</div>
          </div>
        </Card>

        <Card>
          <CardHead title="Risk voronkasi" />
          <div className="card-pad">
            <GroupBarChart
              groups={[[12, 7, 3], [9, 5, 2], [7, 4, 1], [5, 2, 1]]}
              labels={LEARNING_STREAMS.map((stream) => stream.name)}
              series={[
                { label: "Low", color: "#60a5fa" },
                { label: "Medium", color: "#f59e0b" },
                { label: "High", color: "#ef4444" },
              ]}
            />
            <Legend items={[{ label: "Low", color: "#60a5fa" }, { label: "Medium", color: "#f59e0b" }, { label: "High", color: "#ef4444" }]} />
          </div>
        </Card>

        <Card>
          <CardHead title="NPS statistikasi" actions={<Icon name="chart-bar" />} />
          <div className="card-pad" style={{ display: "grid", gap: 10 }}>
            {SURVEYS.map((survey) => (
              <div key={survey.id} className="alert">
                <Icon name="clipboard-list" />
                <div className="body">
                  <h4>{survey.title}</h4>
                  <p>{survey.responses} javob · completion {survey.completion}%</p>
                </div>
                <Pill tone={survey.nps >= 60 ? "green" : survey.nps > 0 ? "amber" : "gray"}>{survey.nps || "Qoralama"}</Pill>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}
