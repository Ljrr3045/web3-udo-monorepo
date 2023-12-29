/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./feautures/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        zero: "0px",
        min: "281px",
        "2min": "380px",
        xs: "495px",
        sm: "640px",
        md: "768px",
        "2md": "912px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      }
    },
  },
  plugins: [],
}

