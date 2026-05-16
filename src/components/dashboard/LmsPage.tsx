import { useOutletContext } from "react-router-dom"

type LmsPageContext = {
  isReady: boolean
  pageKey: string
  setPage: (pageKey: string) => void
}

type LegacyPagesWindow = Window & {
  __PAGES__?: Record<string, React.ComponentType<{ setPage: (pageKey: string) => void }>>
}

export function LmsPage() {
  const { isReady, pageKey, setPage } = useOutletContext<LmsPageContext>()
  const Page = (window as LegacyPagesWindow).__PAGES__?.[pageKey]

  if (!isReady || !Page) {
    return (
      <div className="empty">
        <div className="ico">
          <i className="ti ti-loader-2" />
        </div>
        <h4>Dashboard yuklanmoqda</h4>
        <p>Original AIRI LMS komponentlari tayyorlanmoqda.</p>
      </div>
    )
  }

  return <Page setPage={setPage} />
}
