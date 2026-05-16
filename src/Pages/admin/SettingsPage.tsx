import { PageHeader, ListRow, Panel } from "@/Pages/dashboard/pageBlocks"

export function SettingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tizim"
        title="Sozlamalar"
        description="Platforma konfiguratsiyasi, integratsiyalar va xavfsizlik."
      />
      <Panel title="Asosiy sozlamalar">
        <ListRow title="Auth provider" meta="Mock rejim" value="Demo" />
        <ListRow title="AI yordamchi" meta="Chat widget yoqilgan" value="Active" />
        <ListRow title="Bildirishnomalar" meta="Email va Telegram integratsiya" value="Rejada" />
      </Panel>
    </>
  )
}
