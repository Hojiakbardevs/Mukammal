import { useEffect, useRef } from "react"

type Node = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  alpha: number
  pulse: number
  pulseSpeed: number
}

export function NeuralGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)
  const nodes = useRef<Node[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const initNodes = () => {
      nodes.current = Array.from({ length: 32 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 2 + Math.random() * 2.5,
        alpha: 0.25 + Math.random() * 0.35,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.015,
      }))
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initNodes()
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const ns = nodes.current

      for (let i = 0; i < ns.length; i++) {
        for (let j = i + 1; j < ns.length; j++) {
          const dx = ns[i].x - ns[j].x
          const dy = ns[i].y - ns[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 130) {
            const lineAlpha = (1 - dist / 130) * 0.18
            ctx.beginPath()
            ctx.strokeStyle = `rgba(99,102,241,${lineAlpha})`
            ctx.lineWidth = 0.8
            ctx.moveTo(ns[i].x, ns[i].y)
            ctx.lineTo(ns[j].x, ns[j].y)
            ctx.stroke()
          }
        }
      }

      for (const n of ns) {
        n.pulse += n.pulseSpeed
        const pulsedAlpha = n.alpha * (0.7 + 0.3 * Math.sin(n.pulse))
        const pulsedR = n.r * (0.9 + 0.15 * Math.sin(n.pulse))

        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, pulsedR * 3)
        grd.addColorStop(0, `rgba(99,102,241,${pulsedAlpha})`)
        grd.addColorStop(1, `rgba(99,102,241,0)`)
        ctx.beginPath()
        ctx.arc(n.x, n.y, pulsedR * 3, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        ctx.beginPath()
        ctx.arc(n.x, n.y, pulsedR, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(99,102,241,${pulsedAlpha})`
        ctx.fill()

        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener("resize", resize)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}
