/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'rgb(45, 48, 56)', // HSV: 217.2, 32.6%, 17.5%
        input: 'rgb(45, 48, 56)', // HSV: 217.2, 32.6%, 17.5%
        ring: 'rgb(64, 122, 255)', // HSV: 224.3, 76.3%, 48%
        background: 'rgb(20, 20, 20)', // HSV: 222.2, 84%, 4.9%
        foreground: 'rgb(220, 220, 220)', // HSV: 210, 40%, 98%
        primary: {
          DEFAULT: 'rgb(37, 99, 235)', // HSV: 217.2, 91.2%, 59.8%
          foreground: 'rgb(28, 34, 42)', // HSV: 222.2, 47.4%, 11.2%
          light: 'rgb(24, 65, 153)'
        },
        secondary: {
          DEFAULT: 'rgb(27, 30, 35)', // HSV: 217.2, 32.6%, 17.5%
          foreground: 'rgb(242, 245, 250)' // HSV: 210, 40%, 98%
        },
        destructive: {
          DEFAULT: 'rgb(128, 30, 30)', // HSV: 0, 62.8%, 30.6%
          foreground: 'rgb(242, 245, 250)' // HSV: 210, 40%, 98%
        },
        muted: {
          DEFAULT: 'rgb(27, 30, 35)', // HSV: 217.2, 32.6%, 17.5%
          foreground: 'rgb(165, 173, 193)' // HSV: 215, 20.2%, 65.1%
        },
        accent: {
          DEFAULT: 'rgb(27, 30, 35)', // HSV: 217.2, 32.6%, 17.5%
          foreground: 'rgb(242, 245, 250)' // HSV: 210, 40%, 98%
        },
        popover: {
          DEFAULT: 'rgb(5, 9, 12)', // HSV: 222.2, 84%, 4.9%
          foreground: 'rgb(242, 245, 250)' // HSV: 210, 40%, 98%
        },
        card: {
          DEFAULT: 'rgb(5, 9, 12)', // HSV: 222.2, 84%, 4.9%
          foreground: 'rgb(242, 245, 250)' // HSV: 210, 40%, 98%
        },
        success: {
          DEFAULT: '#87e6a0', // Keeping as is, since it wasn't mentioned in the dark theme.
          foreground: '#375c41' // Keeping as is.
        },
        chart1: 'rgb(64, 128, 255)', // HSV: 220, 70%, 50%
        chart2: 'rgb(72, 191, 144)', // HSV: 160, 60%, 45%
        chart3: 'rgb(255, 153, 51)', // HSV: 30, 80%, 55%
        chart4: 'rgb(178, 51, 255)', // HSV: 280, 65%, 60%
        chart5: 'rgb(255, 51, 119)' // HSV: 340, 75%, 55%
      }
    }
  },
  plugins: []
}
