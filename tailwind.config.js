/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        main: "GeneralSans",
      },
      backgroundImage: {
        'videoGradient': 'linear-gradient(0, #0f0f0f 18%, rgba(15,15,15,0) 50%, #0f0f0f 92%)'
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
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
