module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primaryColor': '#41D673',
        'complementaryColor': '#5AD641',
        'darkBackground': '#0F0A0A',
      },
      spacing: {
        '30': '8.5rem',
      },
    },
  },
  variants: {
    extend: {},
  },
};
