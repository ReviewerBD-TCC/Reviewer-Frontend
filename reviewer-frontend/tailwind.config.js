/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
    //   colors: {
    //     'bosch-white': '#FFFFFF',
    //     'bosch-black': '#000000',
    //     'bosch-gray-50': '#71767C',
    //     'bosch-red-50': '#ED0007',
    //     'bosch-purple-40': '#9E2896',
    //     'bosch-blue-50': '#007BC0',
    //     'bosch-turquoise-50': '#18837E',
    //     'bosch-green-50': '#00884A',
    //     'bosch-yellow-85': '#FFCF00',
      }
    },
  
  plugins: [],
}

