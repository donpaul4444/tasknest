/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:"class",
content: [
  "./src/app/**/*.{js,ts,jsx,tsx}",
  "./src/pages/**/*.{js,ts,jsx,tsx}",
  "./src/components/**/*.{js,ts,jsx,tsx}",
]
,
  theme: {
    extend: {
      colors: {
        primary: "#64748b",
        background: "#ffffff",
        foreground: "#171717",
        title:"#2563eb",
      },
    },
  },
  plugins: [],
};
