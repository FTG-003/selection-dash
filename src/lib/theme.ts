import { createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'blue',
  fontFamily: 'Open Sans, sans-serif',
  headings: {
    fontFamily: 'Open Sans, sans-serif',
  },
  defaultRadius: 'md',
  components: {
    Paper: {
      defaultProps: {
        shadow: 'xs',
      },
    },
  },
});