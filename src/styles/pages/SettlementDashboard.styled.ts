import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import colors from 'theme/colors'
import { typography } from 'theme/typography'

export const Container = styled(Box)({
  background: colors.background.main,
})

export const PageHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: 24,
})

export const Left = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
})

export const Right = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
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

export const CounterpartyLabel = styled(Typography)({
  color: colors.text.primary,
  fontFamily: typography.body2_medium.fontFamily,
  fontWeight: typography.body2_medium.fontWeight,
  fontSize: typography.body2_medium.fontSize,
})

export const PlaceholderText = styled('span')({
  color: colors.text.secondary,
  fontFamily: typography.body2_regular.fontFamily,
  fontSize: typography.body2_regular.fontSize,
})

export const TableContainer = styled(Box)({
  backgroundColor: colors.background.light,
  borderRadius: '8px',
  boxShadow: `6px 6px 54px 0px ${colors.shadow.main}`,
})

export const Wrapper = styled(Box)({
  background: colors.background.light,
  borderRadius: 8,
  padding: '0 16px',
})

export const TableHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: '16px',
  paddingBottom: 0,
})

export const Title = styled(Typography)({
  fontFamily: typography.h5_semibold.fontFamily,
  fontSize: typography.h5_semibold.fontSize,
  fontWeight: typography.h5_semibold.fontWeight,
  color: colors.text.primary,
})

export const Actions = styled(Box)({
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
})
