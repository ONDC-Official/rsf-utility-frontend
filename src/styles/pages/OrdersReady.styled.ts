import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import colors from 'theme/colors'
import { typography } from 'theme/typography'

export const PageContainer = styled(Box)({
  background: colors.background.main,
  minHeight: '100%',
})

export const PageHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: 24,
})

export const HeaderLeft = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
})

export const HeaderRight = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
})

export const PageTitle = styled(Typography)({
  fontFamily: typography.h3_semibold.fontFamily,
  fontWeight: typography.h3_semibold.fontWeight,
  color: colors.text.primary,
  fontSize: typography.h3_semibold.fontSize,
  lineHeight: typography.h3_semibold.lineHeight,
})

export const PageSubtitle = styled(Typography)({
  color: colors.text.secondary,
  fontFamily: typography.body1_regular.fontFamily,
  fontSize: typography.body1_regular.fontSize,
})

export const ReceiverLabel = styled(Typography)({
  color: colors.text.primary,
  fontFamily: typography.body2_medium.fontFamily,
  fontWeight: typography.body2_medium.fontWeight,
  fontSize: typography.body2_medium.fontSize,
})

export const Container = styled(Box)({
  background: colors.background.light,
  boxShadow: `6px 6px 54px 0px ${colors.shadow.main}`,
  borderRadius: 8,
  overflow: 'hidden',
})

export const Header = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 24px',
  borderBottom: `1px solid ${colors.border.main}`,
})

export const TableActions = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
})

export const TableTitle = styled(Typography)({
  fontFamily: typography.h6_semibold.fontFamily,
  fontWeight: typography.h6_semibold.fontWeight,
  color: colors.text.primary,
  fontSize: typography.h6_semibold.fontSize,
})
