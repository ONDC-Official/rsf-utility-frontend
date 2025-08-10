import { styled } from '@mui/material/styles'
import { Box, Typography, IconButton } from '@mui/material'
import colors from 'theme/colors'
import { typography } from 'theme/typography'

export const ModalContainer = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  maxWidth: '90vw',
  maxHeight: '80vh',
  overflowY: 'auto',
})

export const Content = styled(Box)({
  background: colors.background.light,
  borderRadius: 8,
  boxShadow: `6px 6px 54px 0px ${colors.shadow.main}`,
  padding: 0,
})

export const Header = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 24px',
  borderBottom: `1px solid ${colors.border.main}`,
})

export const ModalTitle = styled(Typography)({
  fontFamily: typography.h6_semibold.fontFamily,
  fontWeight: typography.h6_semibold.fontWeight,
  color: colors.text.primary,
  fontSize: typography.h6_semibold.fontSize,
})

export const CloseButton = styled(IconButton)({
  padding: '8px',
  color: colors.text.secondary,
})

export const StyledForm = styled(Box)({
  padding: '24px',
})

export const ButtonContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '12px',
  marginTop: '24px',
  paddingTop: '24px',
  borderTop: `1px solid ${colors.border.main}`,
})
