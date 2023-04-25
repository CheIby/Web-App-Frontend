/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily:{
        Kanit:['Kanit', "sans-serif"],
        Niramit:['Niramit', 'sans-serif']
      },boxShadow:{
        'bottomShadow' : '0 15px 5px -15px rgba(0, 0, 0, 0.3)'
      },gridTemplateColumns: {
        'layout':'repeat(auto-fill ,minmax(210px,1fr))',
        'inSideTable':'repeat(auto-fill ,minmax(140pxpx,1fr))',
      },backgroundImage: {
        'loginImg': "linear-gradient(rgba(4,9,30,0.7),rgba(4,9,30,0.7)),url('https://admin.adelaidecentralplaza.com.au/getattachment/b6307554-9cdc-4de2-9508-7251630e3f59/Food-web-tile.jpg?lang=en-AU&ext=.jpg')",
        'registerImg': "linear-gradient(rgba(4,9,30,0.7),rgba(4,9,30,0.7)),url('https://img.freepik.com/free-vector/restaurant-mural-wallpaper_23-2148695092.jpg')",
      }
    
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
    base:false
  },
}

