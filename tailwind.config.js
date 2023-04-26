/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,svelte}",
  ],
  theme: {
    extend: {
      colors: {
        "customGreen": "#10ac84",
        "customBlue": "#033F63"
      },

      fontFamily: {
        sans: "Permanent Marker, Helvetica, Arial, sans-serif",
        serif: "Lora, serif",
        mono: "Consolas, monospace"
      }
    },
  },
  plugins: [],
}

