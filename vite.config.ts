import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Vercel serves the app from the domain root, while the GitHub Pages
// workflow serves it from /todo/ (this repo's project page path).
// Vercel sets VERCEL=1 during builds, so use it to pick the right base.
export default defineConfig({
  base: process.env.VERCEL ? '/' : '/todo/',
  plugins: [react()],
})
