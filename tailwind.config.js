/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
colors: {
        primary: "#60A5FA",      // Light Blue
        primaryHover: "#2563EB", // Deeper Blue
        footerBg: "#0F172A",     // Dark blue / slate
        footerText: "#E0F2FE"    // Soft light blue
      }
    },
  },
  plugins: [],
}