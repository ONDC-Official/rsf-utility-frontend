import { BOLD, MEDIUM, REGULAR, SEMI_BOLD } from '@constants/fonts'

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h3_semibold: true
    h5_semibold: true
    h6_semibold: true
    body1_regular: true
    body1_medium: true
    body1_semibold: true
    body2_regular: true
    body2_semibold: true
    body2_medium: true
    body3_medium: true
    body3_regular: true
    body4_bold: true
    body4_semibold: true
    body5_light: true
    body5_medium: true
    body5_regular: true
    body5_semibold: true
    h7: true
    caption1_semibold: true
  }
}

const body1 = { fontSize: '16px', lineHeight: '24px' }
const body2 = { fontSize: '14px', lineHeight: '20px' }
const body3 = { fontSize: '10px', lineHeight: '16px' }
const body4 = { fontSize: '20px', lineHeight: '28px' }
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
  },
  h6: {
    fontSize: '20px',
    lineHeight: '28px',
    fontFamily: BOLD,
  },
  h7: {
    fontSize: '24px',
    lineHeight: '32px',
    fontFamily: SEMI_BOLD,
  },
  h6_semibold: {
    fontSize: '20px',
    lineHeight: '28px',
    fontFamily: SEMI_BOLD,
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
  body1_semibold: {
    fontWeight: 600,
    fontFamily: SEMI_BOLD,
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
    ...body2,
  },
  body2_medium: {
    fontFamily: MEDIUM,
    fontWeight: 500,
    ...body2,
  },
  body3_medium: {
    fontFamily: MEDIUM,
    fontWeight: 500,
    ...body3,
  },
  body3_regular: {
    fontFamily: REGULAR,
    fontWeight: 400,
    ...body3,
  },
  body4_bold: {
    fontFamily: BOLD,
    fontWeight: 600,
    ...body4,
  },
  body4_semibold: {
    fontFamily: SEMI_BOLD,
    fontWeight: 600,
    ...body4,
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
  subtitle1: {
    fontFamily: REGULAR,
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 400,
  },
  subtitle2: {
    fontFamily: REGULAR,
    fontSize: '10px',
    lineHeight: '14px',
  },
  caption1_semibold: {
    fontFamily: SEMI_BOLD,
    ...caption1,
  },
}

export default typography
