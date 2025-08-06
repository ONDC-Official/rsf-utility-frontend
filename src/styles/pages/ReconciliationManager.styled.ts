import { styled } from '@mui/material/styles'
import { Box, Typography, IconButton, Button } from '@mui/material'
import colors from 'theme/colors'
import { typography } from 'theme/typography'

export const Container = styled(Box)({
  borderBottom: `1px solid ${colors.border.main}`,
  marginBottom: '24px',
  '& .MuiTabs-root': {
    minHeight: 'auto',
  },
  '& .MuiTab-root': {
    fontFamily: typography.body2_medium.fontFamily,
    fontSize: typography.body2_medium.fontSize,
    fontWeight: typography.body2_medium.fontWeight,
    textTransform: 'none',
    minHeight: '48px',
    padding: '12px 24px',
  },
})

export const TableContainer = styled(Box)({
  background: colors.background.light,
  boxShadow: `6px 6px 54px 0px ${colors.shadow.main}`,
  borderRadius: 8,
  overflow: 'hidden',
  marginBottom: 24,
})

export const TableHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 24px',
})

export const TableTitle = styled(Typography)({
  fontFamily: typography.h6_semibold.fontFamily,
  fontWeight: typography.h6_semibold.fontWeight,
  color: colors.text.primary,
  fontSize: typography.h6_semibold.fontSize,
})

export const TableActions = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
})

export const TableReceiverSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
})

export const ReceiverLabel = styled(Typography)({
  color: colors.text.primary,
  fontFamily: typography.body2_medium.fontFamily,
  fontWeight: typography.body2_medium.fontWeight,
  fontSize: typography.body2_medium.fontSize,
  whiteSpace: 'nowrap',
})

export const PlaceholderText = styled('span')({
  color: colors.text.secondary,
  fontFamily: typography.body2_regular.fontFamily,
  fontSize: typography.body2_regular.fontSize,
})

export const ActionButtonGroup = styled(Box)({
  display: 'flex',
  gap: 8,
})

export const ActionButton = styled(Button)({
  fontFamily: typography.body2_regular.fontFamily,
  fontSize: typography.body2_regular.fontSize,
  fontWeight: typography.body2_regular.fontWeight,
  textTransform: 'none',
  minWidth: 'auto',
  padding: '4px 8px',
  height: '28px',
})

export const ModalContainer = styled(Box)({
  position: 'absolute',
  top: '10%',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '600px',
  maxWidth: '90vw',
  maxHeight: '80vh',
  overflowY: 'auto',
})

export const ModalContent = styled(Box)({
  background: colors.background.light,
  borderRadius: 8,
  boxShadow: `6px 6px 54px 0px ${colors.shadow.main}`,
  padding: 0,
})

export const ModalHeader = styled(Box)({
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

export const FormContainer = styled(Box)({
  padding: '24px',
})

export const FormRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '16px',
  marginBottom: '16px',
})

export const ButtonContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '12px',
  marginTop: '24px',
  paddingTop: '24px',
  borderTop: `1px solid ${colors.border.main}`,
})
