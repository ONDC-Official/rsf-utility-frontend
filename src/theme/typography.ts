const FONT_FAMILY = 'Inter'

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h1_regular: true
    h1_medium: true
    h1_bold: true
    h2_regular: true
    h2_medium: true
    h2_bold: true
    h3_regular: true
    h3_medium: true
    h3_bold: true
    h4_regular: true
    h4_medium: true
    h4_bold: true
    h5_regular: true
    h5_medium: true
    h5_bold: true
    h6_regular: true
    h6_medium: true
    h6_bold: true
    body1_regular: true
    body1_medium: true
    body1_bold: true
    body2_regular: true
    body2_medium: true
    body2_bold: true
    body3_regular: true
    body3_medium: true
    body3_bold: true
    caption1_regular: true
    caption1_medium: true
    caption1_bold: true
  }
}

const sizes = {
  h1: { fontSize: '42px', lineHeight: '52px' },
  h2: { fontSize: '36px', lineHeight: '46px' },
  h3: { fontSize: '32px', lineHeight: '40px' },
  h4: { fontSize: '26px', lineHeight: '34px' },
  h5: { fontSize: '24px', lineHeight: '32px' },
  h6: { fontSize: '18px', lineHeight: '24px' },
  body1: { fontSize: '14px', lineHeight: '20px' },
  body2: { fontSize: '12px', lineHeight: '20px' },
  body3: { fontSize: '10px', lineHeight: '28px' },
  caption1: { fontSize: '12px', lineHeight: '16px' },
} as const

const weights = {
  regular: { fontWeight: 400, fontFamily: FONT_FAMILY },
  medium: { fontWeight: 500, fontFamily: FONT_FAMILY },
  bold: { fontWeight: 700, fontFamily: FONT_FAMILY },
} as const

const generateVariants = () => {
  const variants: Record<string, any> = {}
  for (const [name, size] of Object.entries(sizes)) {
    variants[`${name}_regular`] = { ...size, ...weights.regular }
    variants[`${name}_medium`] = { ...size, ...weights.medium }
    variants[`${name}_bold`] = { ...size, ...weights.bold }
  }

  return variants
}

export const typography = generateVariants()
export default typography
