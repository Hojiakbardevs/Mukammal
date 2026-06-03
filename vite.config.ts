import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "request-logger",
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          const ip = req.socket.remoteAddress?.replace("::ffff:", "") ?? "unknown"
          const time = new Date().toLocaleTimeString()
          if (!req.url?.includes("@vite") && !req.url?.includes("node_modules")) {
            console.log(`\x1b[36m[${time}]\x1b[0m \x1b[33m${ip}\x1b[0m → ${req.method} ${req.url}`)
          }
          next()
        })
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
  },
})
