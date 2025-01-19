/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "auth": "url('./assets/img/bg-auth.jpg')",
      },
      fontFamily: {
        jura: ["Jura", "serif"], // heading
        rajdhani: ["Rajdhani", "serif"], // subheading
        'public-sans': ['Public Sans', 'sans-serif'], // body
      },
    },
  },
  plugins: [],
};
