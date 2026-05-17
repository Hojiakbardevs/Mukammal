import { useMemo, useState } from "react"

import { Avatar, Btn, Card, Chip, Icon, Pill, Toolbar } from "@/components/dashboard/LmsPrimitives"
import { FLAGGED_CONTENT, type ModerationItem, type ModerationKind } from "@/data/lmsData"

type ModerationFilter = "all" | ModerationKind

const FILTERS: Array<{ value: ModerationFilter; label: string; icon: string }> = [
  { value: "all", label: "Hammasi", icon: "filter" },
  { value: "qa", label: "Q&A", icon: "message" },
  { value: "review", label: "Review", icon: "star" },
  { value: "submission", label: "Topshiriqlar", icon: "file-upload" },
]

function kindTone(kind: ModerationKind) {
  if (kind === "qa") return "blue"
  if (kind === "review") return "purple"
  return "amber"
}

function kindLabel(kind: ModerationKind) {
  if (kind === "qa") return "qa"
  if (kind === "review") return "review"
  return "submission"
}

export function AdminModeration() {
  const [items, setItems] = useState<ModerationItem[]>(FLAGGED_CONTENT)
  const [filter, setFilter] = useState<ModerationFilter>("all")

  const visibleItems = useMemo(
    () => items.filter((item) => filter === "all" || item.kind === filter),
    [filter, items],
  )

  function remove(id: number) {
    setItems((current) => current.filter((item) => item.id !== id))
  }

  return (
    <>
      <div className="alert amber" style={{ marginBottom: 14 }}>
        <Icon name="alert-octagon" />
        <div className="body">
          <h4>Inson hal qiladi</h4>
          <p>
            Bu yerga keladigan barcha narsa AI tomonidan <b>review trigger</b> sifatida belgilangan.
            Avtomatik o'chirish yo'q, har bir kontentni siz tasdiqlaysiz yoki rad etasiz.
          </p>
        </div>
      </div>

      <Toolbar>
        {FILTERS.map((item) => (
          <Chip key={item.value} icon={item.icon} active={filter === item.value} onClick={() => setFilter(item.value)}>
            {item.label} · {item.value === "all" ? items.length : items.filter((row) => row.kind === item.value).length}
          </Chip>
        ))}
        <div className="spacer" />
        <Btn size="sm" leftIcon="checks">Bulk tasdiqlash</Btn>
        <Btn size="sm" variant="danger" leftIcon="trash">Bulk olib tashlash</Btn>
      </Toolbar>

      <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
        {visibleItems.map((item) => (
          <Card
            key={item.id}
            className="card-pad moderation-card"
            style={{ borderColor: item.aiScore > 0.85 ? "var(--red-mid)" : "var(--border)" }}
          >
            <Avatar name={item.author} tone={item.tone} size="lg" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                <b style={{ fontSize: 13 }}>{item.author}</b>
                <span style={{ color: "var(--text3)", fontSize: 12 }}>· {item.where} · {item.age}</span>
                <Pill tone={kindTone(item.kind)}>{kindLabel(item.kind)}</Pill>
                <Pill tone="red" icon="flag-2">{item.flag}</Pill>
                <Pill tone="purple"><Icon name="sparkles" /> AI · {item.aiScore}</Pill>
              </div>
              <div className="moderation-body">"{item.body}"</div>
              <div className="moderation-actions">
                <Btn size="sm" variant="success" leftIcon="check" onClick={() => remove(item.id)}>Tasdiqlash · qoldirish</Btn>
                <Btn size="sm" variant="danger" leftIcon="trash" onClick={() => remove(item.id)}>Olib tashlash</Btn>
                <Btn size="sm" variant="amber" leftIcon="message">Muallifga ogohlantirish</Btn>
                <Btn size="sm" leftIcon="user-x">Muallifni vaqtinchalik bloklash</Btn>
                <div style={{ marginLeft: "auto" }}>
                  <Btn size="sm" variant="ghost" leftIcon="external-link">Manbaga o'tish</Btn>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {visibleItems.length === 0 && (
          <div className="empty">
            <div className="ico"><Icon name="checks" /></div>
            <h4>Hamma narsa moderatsiyadan o'tdi</h4>
            <p>Hozircha tekshirilishi kerak bo'lgan kontent yo'q. AI yangi flag yaratganda bu yerga avtomatik tushadi.</p>
          </div>
        )}
      </div>
    </>
  )
}
