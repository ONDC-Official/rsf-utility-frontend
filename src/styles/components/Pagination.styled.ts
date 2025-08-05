import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import colors from 'theme/colors'
import { typography } from 'theme/typography'

export const Container = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 20px',
})

export const PaginationInfo = styled(Typography)({
  color: colors.text.tertiary,
  fontSize: typography.body2_regular.fontSize,
  flex: 1,
})

export const Wrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 16,
  flex: 1,
})

export const PaginationShowContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  flex: 1,
  justifyContent: 'flex-end',
})

export const PaginationShowText = styled(Typography)({
  color: colors.text.tertiary,
  fontSize: typography.body2_regular.fontSize,
})
