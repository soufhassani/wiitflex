/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        main: "GeneralSans",
      },
      animation: {
        fadeOut: "fadeOut .5s ease-in-out forwards",
      },
      keyframes: {
        fadeOut: {
          "0%, 100%": {
            opacity: "0",
            transform: "scale(1)",
            trransformOrigin: "center center",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.2)",
            trransformOrigin: "center center",
          },
        },
      },
    },
  },
  plugins: [],
};
