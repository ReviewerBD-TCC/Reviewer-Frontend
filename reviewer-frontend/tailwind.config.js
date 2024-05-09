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
      backgroundImage:{
        'login-background': "url('/src/assets/images/Login-Background.jpg')",
        'dropdown-background': "url('/src/assets/icons/wide-angled-arrow.svg')",
      },
      colors: {
        boschWhite: '#FFFFFF',
        boschBlack: '#000',
        boschGray: '#71767C',
        boschRed: '#ED0007',
        boschPurple: '#9E2896',
        boschBlue: '#007BC0',
        boschTurquoise: '#18837E',
        boschGreen: '#00884A',
        boschYellow: '#FFCF00',
        boschLightGray: '#E0E2E5',
        boschGrayText: '#808080',
        boschLightGray: '#EFF1F2'
      },
      backgroundColor:{
        '14': '14px',
      },
      backgroundPosition:{
        'drop-position': 'center right 1rem'
      },
      screens: {
        'laptop': '1024px'
      }
    },
  
  plugins: [],
}
}
