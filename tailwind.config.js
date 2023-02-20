module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primaryColor': '#41D673',
        'complementaryColor': '#5AD641',
        'primaryColorShadow': '#00C170',
        'darkBackground': '#0F0A0A',
      },
      spacing: {
        '30': '8.5rem',
      },
      gridTemplateRows: {
        '11': 'repeat(11, minmax(0, 1fr))',
      },
    },
  },
  variants: {
    extend: {},
  },
};
