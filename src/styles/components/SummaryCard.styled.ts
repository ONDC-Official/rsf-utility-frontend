import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import colors from '@theme/colors'
import { typography } from '@theme/typography'

export const SummaryCardContainer = styled(Box)<{ $bgColor: string }>(({ $bgColor }) => ({
  background: `linear-gradient(135deg, ${$bgColor} 0%, rgba(255, 255, 255, 0.1) 100%)`,
  borderRadius: 8,
  padding: 20,
  position: 'relative',
  overflow: 'hidden',
  minHeight: 80,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: 100,
    height: 100,
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
    transform: 'translate(30px, -30px)',
  },
}))

export const SummaryCardLabel = styled(Typography)({
  fontFamily: typography.body2_medium.fontFamily,
  fontWeight: typography.body2_medium.fontWeight,
  fontSize: typography.body2_medium.fontSize,
  color: colors.background.light,
  marginBottom: 4,
})

export const SummaryCardValue = styled(Typography)({
  fontFamily: typography.h5_semibold.fontFamily,
  fontWeight: typography.h5_semibold.fontWeight,
  fontSize: typography.h5_semibold.fontSize,
  color: colors.background.light,
})
