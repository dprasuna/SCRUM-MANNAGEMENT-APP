/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
     colors: {
        bgc: "var(--color-grey-100)",
        contentBgc: "var(--color-grey-50)",
        textColor: "var(--color-grey-600)",
        blue: "var(--color-blue)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
