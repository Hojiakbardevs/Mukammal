import { Bot, Send } from "lucide-react"

export function AIChatWidget() {
  return (
    <div className="fixed right-5 bottom-5 z-50 hidden w-80 rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-950/10 xl:block">
      <div className="flex items-center gap-3 border-b border-slate-200 p-4">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-cyan-50 text-cyan-700">
          <Bot className="h-5 w-5" />
        </div>
        <div>
          <div className="text-sm font-bold text-slate-950">AIRI AI yordamchi</div>
          <div className="text-xs text-slate-500">Demo rejim</div>
        </div>
      </div>
      <div className="p-4 text-sm text-slate-600">
        Kurs, topshiriq yoki baholash bo'yicha savolingizni yozing.
      </div>
      <div className="flex items-center gap-2 border-t border-slate-200 p-3">
        <input
          className="min-w-0 flex-1 rounded-lg bg-slate-50 px-3 py-2 text-sm outline-none"
          placeholder="Savol yozing..."
        />
        <button
          type="button"
          className="grid h-9 w-9 place-items-center rounded-lg bg-cyan-500 text-white"
          aria-label="Yuborish"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
