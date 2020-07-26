module.exports = {
  theme: {
    extend: {
      gridTemplateColumns: {
        '15': 'repeat(15, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        '15': 'repeat(15, minmax(0, 1fr))',
      },
      gridColumnStart: {
        '13': '13',
        '14': '14',
        '15': '15',
        '16': '16',
        '17': '17',
      },
      gridColumnEnd: {
        '13': '13',
        '14': '14',
        '15': '15',
        '16': '16',
        '17': '17',
      },

      gridRowStart: {
        '8': '8',
        '9': '9',
        '10': '10',
        '11': '11',
        '12': '12',
        '13': '13',
        '14': '14',
        '15': '15',
      },

      gridRowEnd: {
        '8': '8',
        '9': '9',
        '10': '10',
        '11': '11',
        '12': '12',
        '13': '13',
        '14': '14',
        '15': '15',
      },
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding',
      },
      width: {
        '1/16': '6.25%',
        hscreen: '100vh',
      },
      height: {
        '1/16': '6.25%',
        '1/6': '16.66666%',
        wscreen: '100vw',
      },
      spacing: {
        '96': '24rem',
        '128': '32rem',
      },
    },
  },
  variants: {
    outline: ['focus', 'responsive', 'hover'],
    transitionProperty: ['responsive', 'hover', 'focus'],
    scale: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
  },
  plugins: [],
};
