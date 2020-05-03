const palette = {
  error: {
    100: 'red',
    200: 'red',
    300: 'red',
    400: 'red',
    500: 'red',
    600: 'red',
    700: 'red',
    800: 'red',
    900: 'red',
  },
  neutral: {
    100: 'white',
    200: 'hsl(0, 0%, 97%)',
    300: 'grey',
    400: 'grey',
    500: 'grey',
    600: 'grey',
    700: 'grey',
    800: 'grey',
    900: 'grey',
  },
  primary: {
    100: 'hsl(160, 40%, 92%)',
    200: 'hsl(160, 50%, 90%)',
    300: 'hsl(160, 90%, 85%)',
    400: 'hsl(160, 50%, 30%)',
    500: 'green',
    600: 'hsl(160, 40%, 15%)',
    700: 'green',
    800: 'green',
    900: 'green',
  },
};

const colours = {
  background: {
    customCard: palette.primary[100],
    order: palette.neutral[100],
    page: palette.neutral[200],
  },
  border: {
    customCard: palette.primary[100],
  },
  shadow: palette.neutral[900],
  text: {
    customCard: palette.primary[600],
  },
};

export default colours;
