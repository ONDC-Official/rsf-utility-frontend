import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import colors from 'theme/colors'
import { typography } from 'theme/typography'

export const Container = styled(Box)<{ $isVisible: boolean }>(({ $isVisible }) => ({
  position: 'absolute',
  top: 50,
  right: 0,
  zIndex: 9999,
  transition: 'all 0.3s ease-in-out',
  opacity: $isVisible ? 1 : 0,
  visibility: $isVisible ? 'visible' : 'hidden',
}))

export const ToastContent = styled(Box)({
  background: colors.background.light,
  border: `1px solid ${colors.border.main}`,
  boxShadow: '0px 10px 40px 0px rgba(0, 0, 0, 0.12)',
  borderRadius: 8,
  padding: '16px 20px',
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  minWidth: 320,
})

export const ToastIconContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
})

export const ToastTextContainer = styled(Box)({
  flex: 1,
})

export const ToastTitle = styled(Typography)({
  fontFamily: typography.body2_semibold.fontFamily,
  fontWeight: typography.body2_semibold.fontWeight,
  fontSize: typography.body2_semibold.fontSize,
  color: colors.text.primary,
  marginBottom: 2,
})

export const ToastMessage = styled(Typography)({
  fontFamily: typography.body2_regular.fontFamily,
  fontWeight: typography.body2_regular.fontWeight,
  fontSize: typography.body2_regular.fontSize,
  color: colors.text.secondary,
})

export const ToastCloseButton = styled(Box)({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 4,
  color: colors.text.secondary,

  '&:hover': {
    color: colors.text.primary,
  },
})
