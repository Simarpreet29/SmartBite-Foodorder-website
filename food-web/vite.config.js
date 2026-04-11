import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <--- Yeh plugin zaroori hai

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <--- Isse Tailwind active hota hai
  ],
})