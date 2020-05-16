const palette = {
  error: {
    100: 'hsl(0, 95%, 95%)',
    200: 'hsl(0, 90%, 87%)',
    300: 'hsl(0, 90%, 78%)',
    400: 'hsl(0, 90%, 72%)',
    500: 'hsl(0, 90%, 65%)',
    600: 'hsl(0, 65%, 49%)',
    700: 'hsl(0, 70%, 35%)',
    800: 'hsl(0, 50%, 28%)',
    900: 'hsl(0, 50%, 15%)',
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
    buttonPrimary: palette.primary[100],
    buttonSecondary: palette.neutral[200],
    customCard: palette.primary[100],
    footer: palette.neutral[100],
    header: palette.neutral[100],
    order: palette.neutral[100],
    page: palette.neutral[200],
    panel: palette.neutral[100],
    toggle: {
      off: palette.error[200],
      on: palette.primary[600],
    },
  },
  border: {
    buttonPrimary: palette.neutral[200],
    buttonSecondary: palette.neutral[200],
    customCard: palette.primary[100],
    error: palette.error[400],
    normal: palette.neutral[400],
    pin: {
      active: palette.primary[500],
      disabled: palette.error[500],
    },
    toggle: {
      off: palette.error[200],
      on: palette.primary[600],
    },
  },
  fill: {
    icon: palette.neutral[700],
    toggle: {
      off: palette.neutral[100],
      on: palette.neutral[100],
    },
  },
  shadow: palette.neutral[500],
  text: {
    buttonPrimary: palette.primary[900],
    buttonSecondary: palette.neutral[900],
    body: palette.neutral[900],
    customCard: palette.primary[900],
    error: palette.error[500],
    label: palette.neutral[700],
    subtitle: palette.neutral[600],
  },
};

export default colours;
