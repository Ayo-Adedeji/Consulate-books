/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design system tokens
        primary: "#1F3A5F",
        azure: "#007FFF",
        accent: "#F59E0B",
        bg: "#F8FAFC",
        card: "#FFFFFF",
        heading: "#0F172A",
        body: "#F5F7FA",
        // Legacy aliases — kept for backward compatibility
        primaryHover: "#2563EB",
        footerBg: "#1A2A6C",
        footerText: "#E0F2FE",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 24px rgba(0,0,0,0.08)",
        card: "0 2px 12px rgba(0,0,0,0.06)",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: 0, transform: "translateY(-24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeInLeft: {
          "0%": { opacity: 0, transform: "translateX(-24px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        fadeInRight: {
          "0%": { opacity: 0, transform: "translateX(24px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        badgePop: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.4)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.5s ease-out both",
        fadeInDown: "fadeInDown 0.5s ease-out both",
        fadeInLeft: "fadeInLeft 0.5s ease-out both",
        fadeInRight: "fadeInRight 0.5s ease-out both",
        fadeIn: "fadeIn 0.4s ease-out both",
        float: "float 3s ease-in-out infinite",
        badgePop: "badgePop 0.3s ease-out",
      },
    },
  },
  plugins: [],
}
