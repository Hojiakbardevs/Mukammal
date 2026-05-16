import { useState } from "react"

import { Avatar, Btn, Card, CardHead, Icon, Pill, Tabs } from "@/components/dashboard/LmsPrimitives"
import { QA } from "@/data/lmsData"

export function TeacherQA() {
  const [tab, setTab] = useState("pending")
  const questions = tab === "answered" ? QA.filter((item) => item.state === "answered") : QA.filter((item) => item.state === "needs-reply")
  const selected = questions[0] ?? QA[0]

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Q&A moderatsiya</h1>
          <p>Savollar ro'yxati, javob editori va javoblangan deb belgilash oqimi.</p>
        </div>
      </div>

      <div className="grid c-7-5">
        <Card>
          <Tabs
            value={tab}
            onChange={setTab}
            items={[
              { value: "pending", label: "Javob kutilmoqda", icon: "messages", count: QA.filter((item) => item.state === "needs-reply").length },
              { value: "answered", label: "Javoblangan", icon: "message-check", count: QA.filter((item) => item.state === "answered").length },
            ]}
          />
          <CardHead title="Savollar ro'yxati" count={questions.length} />
          <div className="card-pad" style={{ display: "grid", gap: 10 }}>
            {questions.map((item) => (
              <div key={item.id} className="alert">
                <Avatar name={item.student.name} tone={item.student.tone} size="sm" />
                <div className="body">
                  <h4>{item.topic}</h4>
                  <p>{item.course} · {item.student.name} · {item.age} · {item.votes} ovoz</p>
                </div>
                <Pill tone={item.flagged ? "red" : item.state === "answered" ? "green" : "amber"}>
                  {item.flagged ? "Flag" : item.state === "answered" ? "Javoblangan" : "Kutilmoqda"}
                </Pill>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHead title="Javob editori" sub={selected.topic} />
          <div className="card-pad" style={{ display: "grid", gap: 12 }}>
            <div className="alert blue">
              <Icon name="quote" />
              <div className="body">
                <h4>{selected.student.name}</h4>
                <p>{selected.body}</p>
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="qa-answer">Javob</label>
              <textarea
                id="qa-answer"
                className="textarea"
                rows={7}
                defaultValue="Validation loss qayta ko'tarila boshlasa, bu overfitting signali bo'lishi mumkin. Avval train/validation split to'g'ri ajratilganini tekshiring, keyin regularization, early stopping va data leakage ehtimolini ko'rib chiqing."
              />
            </div>
            <div className="cta-row">
              <Btn variant="primary" leftIcon="send">Javob yuborish</Btn>
              <Btn variant="success" leftIcon="message-check">Javoblangan deb belgilash</Btn>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
