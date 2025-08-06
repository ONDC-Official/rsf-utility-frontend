import { BOLD, MEDIUM, REGULAR, SEMI_BOLD } from 'constants/fonts'

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h3_semibold: true
    h5_semibold: true
    h6_semibold: true
    body1_regular: true
    body1_medium: true
    body2_regular: true
    body2_semibold: true
    body2_medium: true
    body5_light: true
    body5_medium: true
    body5_regular: true
    body5_semibold: true
    caption1_semibold: true
  }
}

const body1 = { fontSize: '16px', lineHeight: '24px' }
const body2 = { fontSize: '14px', lineHeight: '20px' }
const body5 = { fontSize: '12px', lineHeight: '28px' }
const caption1 = { fontSize: '18px', lineHeight: '26px' }

export const typography = {
  h1: {
    fontSize: '52px',
    lineHeight: '64px',
    fontFamily: BOLD,
  },
  h2: {
    fontSize: '44px',
    lineHeight: '56px',
    fontFamily: BOLD,
  },
  h3: {
    fontSize: '32px',
    lineHeight: '40px',
    fontWeight: 600,
    fontFamily: BOLD,
  },
  h3_semibold: {
    fontSize: '32px',
    lineHeight: '40px',
    fontFamily: SEMI_BOLD,
    fontWeight: 600,
  },
  h4: {
    fontSize: '28px',
    lineHeight: '40px',
    fontFamily: BOLD,
  },
  h5: {
    fontSize: '24px',
    lineHeight: '36px',
    fontFamily: BOLD,
  },
  h5_semibold: {
    fontSize: '24px',
    lineHeight: '32px',
    fontFamily: SEMI_BOLD,
    fontWeight: 600,
  },
  h6: {
    fontSize: '20px',
    lineHeight: '28px',
    fontFamily: BOLD,
  },
  h6_semibold: {
    fontSize: '20px',
    lineHeight: '28px',
    fontFamily: SEMI_BOLD,
    fontWeight: 600,
  },
  body1: {
    ...body1,
    fontFamily: REGULAR,
  },
  body1_regular: {
    fontWeight: 400,
    fontFamily: REGULAR,
    ...body1,
  },
  body1_medium: {
    fontWeight: 500,
    fontFamily: MEDIUM,
    ...body1,
  },
  body2: {
    fontFamily: REGULAR,
    ...body2,
    fontWeight: 500,
  },
  body2_regular: {
    fontFamily: REGULAR,
    fontWeight: 400,
    ...body2,
  },
  body2_semibold: {
    fontFamily: SEMI_BOLD,
    fontWeight: 600,
    ...body2,
  },
  body2_medium: {
    fontFamily: MEDIUM,
    fontWeight: 500,
    ...body2,
  },
  body5_light: {
    fontFamily: REGULAR,
    fontWeight: 400,
    ...body5,
  },
  body5_medium: {
    fontFamily: MEDIUM,
    fontWeight: 500,
    ...body5,
  },
  body5_regular: {
    fontFamily: REGULAR,
    fontWeight: 400,
    ...body5,
  },
  body5_semibold: {
    fontFamily: SEMI_BOLD,
    fontWeight: 600,
    ...body5,
  },
  caption1_semibold: {
    fontFamily: SEMI_BOLD,
    fontWeight: 600,
    ...caption1,
  },
}

export default typography
