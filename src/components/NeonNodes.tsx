import { useEffect, useRef } from "react"

type NeonNodesProps = {
  className?: string
  style?: React.CSSProperties
}

type NavigatorWithConnection = Navigator & {
  connection?: {
    effectiveType?: string
    saveData?: boolean
  }
}

class Node {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  constructor(width: number, height: number) {
    this.x = Math.random() * width
    this.y = Math.random() * height
    const speed = 0.6 + Math.random() * 0.9 // faster drift
    const angle = Math.random() * Math.PI * 2
    this.vx = Math.cos(angle) * speed
    this.vy = Math.sin(angle) * speed
    this.size = Math.random() * 2 + 1.2
  }
}
const NODE_COUNT = 220
const CONNECTION_DIST = 170
const SECONDARY_DIST = 95

const NeonNodes = ({ className, style }: NeonNodesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])
  const rafRef = useRef<number | null>(null)
  const frameSkipRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Slow network detection
    const isSlowNetwork = () => {
      const connection = (navigator as NavigatorWithConnection).connection
      if (!connection) return false
      return (
        connection.effectiveType === "slow-2g" ||
        connection.effectiveType === "2g" ||
        connection.saveData
      )
    }

    // Frame skip: sekin internet -> har 2-frame chiz (30fps), normal -> har frame (60fps)
    const frameSkip = isSlowNetwork() ? 2 : 1

    const init = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const nodes: Node[] = []
      // Sekin internet -> node sonini kamaytir
      const nodeCount = isSlowNetwork() ? 100 : NODE_COUNT
      for (let i = 0; i < nodeCount; i++)
        nodes.push(new Node(canvas.width, canvas.height))
      nodesRef.current = nodes
    }

    const update = (time: number) => {
      frameSkipRef.current++
      if (frameSkipRef.current % frameSkip !== 0) {
        rafRef.current = requestAnimationFrame(update)
        return
      }

      const nodes = nodesRef.current
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const hue = 185 + 15 * Math.sin(time * 0.00015)
      const pulse = 0.6 + 0.4 * Math.sin(time * 0.005)
      const glow = 8 + 6 * pulse

      nodes.forEach((n) => {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1

        ctx.beginPath()
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${hue}, 100%, 65%, 0.9)`
        ctx.shadowBlur = glow
        ctx.shadowColor = `hsla(${hue}, 100%, 70%, 0.9)`
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Sekin internet -> CONNECTION_DIST kichik, fewer connections
      const connectionDist = isSlowNetwork() ? 120 : CONNECTION_DIST
      const secondaryDist = isSlowNetwork() ? 60 : SECONDARY_DIST

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < connectionDist) {
            const alpha =
              0.85 * (1 - dist / connectionDist) * (0.7 + 0.3 * pulse)
            ctx.beginPath()
            ctx.strokeStyle = `hsla(${hue}, 100%, 70%, ${alpha})`
            ctx.lineWidth = 0.8 + 0.7 * (1 - dist / connectionDist) * pulse
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()

            // Secondary links - disable on slow networks
            if (!isSlowNetwork() && dist < secondaryDist) {
              const mx = (nodes[i].x + nodes[j].x) / 2
              const my = (nodes[i].y + nodes[j].y) / 2
              const offset = 12 * (1 - dist / secondaryDist)
              const cx = mx + (dy / dist) * offset
              const cy = my - (dx / dist) * offset
              ctx.beginPath()
              ctx.strokeStyle = `hsla(${hue + 12}, 100%, 75%, ${alpha * 0.7})`
              ctx.lineWidth = 0.5
              ctx.moveTo(nodes[i].x, nodes[i].y)
              ctx.quadraticCurveTo(cx, cy, nodes[j].x, nodes[j].y)
              ctx.stroke()
            }
          }
        }
      }

      rafRef.current = requestAnimationFrame(update)
    }

    init()
    update(0)

    const handleResize = () => init()
    window.addEventListener("resize", handleResize)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={
        className ?? "pointer-events-none absolute inset-0 z-0 h-full w-full"
      }
      style={{ background: "#000814", ...(style ?? {}) }}
    />
  )
}

export default NeonNodes
