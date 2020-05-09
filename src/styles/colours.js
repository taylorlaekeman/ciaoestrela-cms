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
    200: 'hsl(160, 3%, 95%)',
    300: 'hsl(160, 3%, 90%)',
    400: 'hsl(160, 2%, 78%)',
    500: 'hsl(160, 3%, 70%)',
    600: 'hsl(160, 2%, 56%)',
    700: 'hsl(160, 3%, 38%)',
    800: 'hsl(160, 4%, 27%)',
    900: 'hsl(160, 7%, 20%)',
  },
  primary: {
    100: 'hsl(160, 60%, 95%)',
    200: 'hsl(160, 64%, 93%)',
    300: 'hsl(160, 64%, 90%)',
    400: 'hsl(160, 60%, 85%)',
    500: 'hsl(160, 60%, 80%)',
    600: 'hsl(160, 45%, 72%)',
    700: 'hsl(160, 35%, 60%)',
    800: 'hsl(160, 25%, 48%)',
    900: 'hsl(160, 25%, 40%)',
  },
};

const colours = {
  background: {
    customCard: palette.primary[100],
    header: palette.neutral[100],
    order: palette.neutral[100],
    page: palette.neutral[200],
    panel: palette.neutral[100],
    primaryButton: palette.neutral[200],
  },
  border: {
    customCard: palette.primary[100],
    normal: palette.neutral[400],
    primaryButton: palette.neutral[200],
  },
  shadow: palette.neutral[900],
  text: {
    body: palette.neutral[900],
    customCard: palette.primary[900],
    label: palette.neutral[700],
  },
};

export default colours;
