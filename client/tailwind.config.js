/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#cfd6ed",
          200: "#9faedb",
          300: "#7085ca",
          400: "#405db8",
          500: "#1034a6",
          600: "#0d2a85",
          700: "#0a1f64",
          800: "#061542",
          900: "#030a21",
        },
      },
    },
  },
  plugins: [],
};
