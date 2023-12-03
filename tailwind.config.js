/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        fontFamily: {
            sans: [
                "Poppins"
            ]
        },
        extend: {
            colors: {
                radioDefault: "#FFFFFF",
                radioSelected: "#6741D9",
                disabled: "#C2C2C2",
                graphBars: "#F0C3F1",
                fieldBorder: "FFFFFF",
                barAxis: "#FFFFFF",
                buttonColor: "#6741D9",
            },
        },
    },
    plugins: [],
}
