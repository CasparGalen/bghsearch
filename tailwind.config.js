/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{jsx,js,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        bghlight: {
          primary: "#000000",
          "primary-content": "#ffffff",
          "primary-focus": "#000000",
          secondary: "#505050",
          "secondary-content": "#ffffff",
          "secondary-focus": "#505050",
          accent: "#c026d3",
          neutral: "#f8f8f8", // main-searchbox-button
          "base-100": "#ffffff",
          info: "#3F3FFE", // color for filter category "Dokumenttyp" // old: #3F3FFE
          "info-content": "#ffffff",
          success: "#3FFE9F", // color for filter category "Dokumentinhalt" // old: #3FFE9F
          "success-content": "#000000",
          warning: "#e9e9e9", // color for filter category "Dokumenteigenschaften"
          "warning-content": "#000000",
          "--rounded-box": "24px", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "24px", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "24px", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-text-case": "uppercase", // set default text transform for buttons
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "1px", // border width of buttons
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "0.5rem", // border radius of tabs
        },
      },
      {
        dark: {
          primary: "#9f9f9f",                                                                                                               //wierdrot
          "primary-content": "#000000",
          "primary-focus": "#a6a6a6",
          secondary: "#ff3399",                                                                                                             //pink
          "secondary-content": "#ff3399",
          "secondary-focus": "#ff3399",
          accent: "#00cc00",                                                                                                                //giftgrün
          neutral: "#262626", // main-searchbox-button                                                                                      //braun
          "base-100": "#1d1d1d",                                                                                                            //gelb #ffff00
          info: "#3F3FFE", // color for filter category "Dokumenttyp"
          "info-content": "#ffffff",
          success: "#3FFE9F", // color for filter category "Dokumentinhalt"
          "success-content": "#000000",
          warning: "#373737", // color for filter category "Dokumenteigenschaften"
          "warning-content": "#ffffff",
          "--rounded-box": "24px", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "24px", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "24px", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-text-case": "uppercase", // set default text transform for buttons
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "1px", // border width of buttons
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "0.5rem", // border radius of tabs
        },
      },
    ],
  },
};
