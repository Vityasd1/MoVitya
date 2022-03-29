const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    mode: 'jit',
    theme: {
        "xs": "475px",
        ...defaultTheme,
        extend: {
            screens: {
                "3xl": "2000px",
            }
        },
    },
    plugins: [
        require('tailwind-scrollbar-hide'),
        require('tailwind-scrollbar'),
    ],
    variants: {
        scrollbar: ['rounded']
    }
}
