import { useEffect, useRef } from "react"

const vertShaderSrc = `
precision mediump float;
attribute vec2 a_position;
varying vec2 vUv;
void main() {
  vUv = 0.5 * (a_position + 1.0);
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

const fragShaderSrc = `
precision mediump float;
varying vec2 vUv;
uniform float u_time;
uniform float u_ratio;
uniform vec2 u_pointer_position;
uniform float u_scroll_progress;

vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

float neuro_shape(vec2 uv, float t, float p) {
  vec2 sine_acc = vec2(0.0);
  vec2 res = vec2(0.0);
  float scale = 8.0;
  for (int j = 0; j < 15; j++) {
    uv = rotate(uv, 1.0);
    sine_acc = rotate(sine_acc, 1.0);
    vec2 layer = uv * scale + float(j) + sine_acc - t;
    sine_acc += sin(layer);
    res += (0.5 + 0.5 * cos(layer)) / scale;
    scale *= (1.2 - 0.07 * p);
  }
  return res.x + res.y;
}

void main() {
  vec2 uv = 0.5 * vUv;
  uv.x *= u_ratio;
  vec2 pointer = vUv - u_pointer_position;
  pointer.x *= u_ratio;
  float p = clamp(length(pointer), 0.0, 1.0);
  p = 0.5 * pow(1.0 - p, 2.0);
  float t = 0.001 * u_time;
  vec3 color = vec3(0.0);
  float noise = neuro_shape(uv, t, p);
  noise = 1.2 * pow(noise, 3.0);
  noise += pow(noise, 10.0);
  noise = max(0.0, noise - 0.5);
  noise *= (1.0 - length(vUv - 0.5));
  // Blue-forward palette responding to scroll
  color = normalize(vec3(
    0.15 + 0.05 * sin(2.0 * u_scroll_progress),
    0.35 + 0.25 * cos(2.5 * u_scroll_progress),
    0.7 + 0.2 * sin(3.0 * u_scroll_progress)
  ));
  color = color * noise;
  gl_FragColor = vec4(color, noise);
}
`

type GLPointer = { x: number; y: number; tX: number; tY: number }

type GLUniforms = {
  u_time: WebGLUniformLocation | null
  u_ratio: WebGLUniformLocation | null
  u_pointer_position: WebGLUniformLocation | null
  u_scroll_progress: WebGLUniformLocation | null
}

type NavigatorWithConnection = Navigator & {
  connection?: {
    effectiveType?: string
    saveData?: boolean
  }
}

const NeuralNoise = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)
  const pointer = useRef<GLPointer>({ x: 0, y: 0, tX: 0, tY: 0 })
  const frameCountRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl", {
      premultipliedAlpha: false,
      powerPreference: "high-performance",
    })
    if (!gl) return

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

    // Reduced resolution for slow networks (30% less pixel rendering)
    const dpr = isSlowNetwork()
      ? Math.min(window.devicePixelRatio || 1, 1.5)
      : Math.min(window.devicePixelRatio || 1, 2)
    const program = createProgram(gl, vertShaderSrc, fragShaderSrc)
    if (!program) return
    gl.useProgram(program)

    const uniforms: GLUniforms = {
      u_time: gl.getUniformLocation(program, "u_time"),
      u_ratio: gl.getUniformLocation(program, "u_ratio"),
      u_pointer_position: gl.getUniformLocation(program, "u_pointer_position"),
      u_scroll_progress: gl.getUniformLocation(program, "u_scroll_progress"),
    }

    const vertexBuffer = gl.createBuffer()
    if (!vertexBuffer) return
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    )

    const positionLocation = gl.getAttribLocation(program, "a_position")
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform1f(uniforms.u_ratio, canvas.width / canvas.height)
    }

    const updatePointer = (x: number, y: number) => {
      pointer.current.tX = x
      pointer.current.tY = y
    }

    const handlePointerMove = (e: PointerEvent) =>
      updatePointer(e.clientX, e.clientY)
    const handleTouchMove = (e: TouchEvent) => {
      if (e.targetTouches[0])
        updatePointer(e.targetTouches[0].clientX, e.targetTouches[0].clientY)
    }
    const handleClick = (e: MouseEvent) => updatePointer(e.clientX, e.clientY)

    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("click", handleClick)
    window.addEventListener("resize", resize)

    resize()

    // Frame skip for slow networks (har 2-frame chiz)
    const frameSkip = isSlowNetwork() ? 2 : 1

    const render = () => {
      frameCountRef.current++
      if (frameCountRef.current % frameSkip !== 0) {
        rafRef.current = requestAnimationFrame(render)
        return
      }

      const p = pointer.current
      p.x += (p.tX - p.x) * 0.1
      p.y += (p.tY - p.y) * 0.1

      gl.uniform1f(uniforms.u_time, performance.now())
      gl.uniform2f(
        uniforms.u_pointer_position,
        p.x / window.innerWidth,
        1 - p.y / window.innerHeight
      )
      gl.uniform1f(
        uniforms.u_scroll_progress,
        window.scrollY / (2 * window.innerHeight)
      )

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      rafRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("click", handleClick)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  )
}

export default NeuralNoise

function compileShader(
  gl: WebGLRenderingContext,
  source: string,
  type: number
) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader) || "Shader compile error")
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function createProgram(
  gl: WebGLRenderingContext,
  vertSrc: string,
  fragSrc: string
) {
  const v = compileShader(gl, vertSrc, gl.VERTEX_SHADER)
  const f = compileShader(gl, fragSrc, gl.FRAGMENT_SHADER)
  if (!v || !f) return null
  const program = gl.createProgram()
  if (!program) return null
  gl.attachShader(program, v)
  gl.attachShader(program, f)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program) || "Program link error")
    return null
  }
  return program
}
