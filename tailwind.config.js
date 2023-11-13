/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,svelte}",
  ],
  theme: {
    extend: {
      colors: {
        data: {
          0: "#636efa",
          1: "#ef553b",
          2: "#00cc96",
          3: "#ab63fa",
        }
      }
    },
  },
  plugins: [require('@ceol/tailwind-tooltip')],
}

