import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import colors from '@theme/colors'
import { typography } from '@theme/typography'

export const Container = styled(Box)({
  display: 'flex',
  minHeight: '100vh',
})

export const Wrapper = styled(Box)({
  flex: 1,
  marginLeft: 280,
  marginTop: 64,
  background: colors.background.main,
  minHeight: 'calc(100vh - 64px)',
  overflowY: 'auto',
})

export const ContentArea = styled(Box)({
  padding: 24,
  minHeight: 'calc(100vh - 112px)',
})

export const Footer = styled(Box)({
  background: colors.background.tertiary,
  padding: '16px 24px',
  borderTop: `1px solid ${colors.border.main}`,
  textAlign: 'center',
  color: colors.text.secondary,
  fontSize: typography.body2_regular.fontSize,
  fontFamily: typography.body2_regular.fontFamily,
})
