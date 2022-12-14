import { extendTheme } from '@chakra-ui/react'
// import { createBreakpoints } from "@chakra-ui/theme-tools";


// const breakpoints = ['576px', '768px', '992px', '1200px']

// add an alias for object responsive prop
// breakpoints.sm = breakpoints[0]
// breakpoints.md = breakpoints[1]
// breakpoints.md = breakpoints[2]
// breakpoints.md = breakpoints[3]

const customTheme = extendTheme({
  // styles: {
  //   global: {
  //     body: {
  //       backgroundColor: "orange.50",
  //       color: "gray.800",
  //     },
  //     p: {
  //       fontSize: { base: "md", md: "lg" },
  //       lineHeight: "tall",
  //     },
  //   },
  // },
  // breakpoints: createbreakpoints({
  //   sm: "48em",
  //   md: "48em",
  //   lg: "62em",
  //   xl: "62em",
  //   // mycustomone: "50em"
  // }),
  textStyles: {
    h1: {
      // you can also use responsive styles
      fontSize: ['48px', '72px'],
      fontWeight: 'bold',
      lineHeight: '110%',
      letterSpacing: '-2%',
    },
    h2: {
      fontSize: ['36px', '48px'],
      fontWeight: 'semibold',
      lineHeight: '110%',
      letterSpacing: '-1%',
    },
  },
  colors: {
    transparent: 'transparent',
    black: '#333',
    white: '#fff',
    brand: '#fd91ab',
    gray: {
      50: '#f7fafc',
      900: '#171923',
    },
  },
  fonts: {
    // body: "system-ui, sans-serif",
    body: "Helvetica Neue, Arial,Hiragino Kaku Gothic ProN,Hiragino Sans,Meiryo,sans-serif",
    heading: "Georgia, serif",
    mono: "Menlo, monospace",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  lineHeights: {
    normal: "normal",
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: "2",
    "3": ".75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem",
  },
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
  sizes: {
    max: 'max-content',
    min: 'min-content',
    full: '100%',
    '3xs': '14rem',
    '2xs': '16rem',
    xs: '20rem',
    sm: '24rem',
    md: '28rem',
    lg: '32rem',
    xl: '36rem',
    '2xl': '42rem',
    '3xl': '48rem',
    '4xl': '56rem',
    '5xl': '64rem',
    '6xl': '72rem',
    '7xl': '80rem',
    '8xl': '90rem',
    container: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
});

export default customTheme