import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import colors from 'theme/colors'
import { Delete, SendRounded } from '@mui/icons-material'

export const Container = styled(Box)({
  background: colors.background.main,
  minHeight: '100%',
})

export const Header = styled(Box)({
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

export const Wrapper = styled(Box)({
  background: colors.background.light,
  boxShadow: `6px 6px 54px 0px ${colors.shadow.main}`,
  borderRadius: 8,
  overflow: 'hidden',
  padding: '16px',
})

export const TableHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
})

export const TableActions = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
})

export const SettlementDetailsContainer = styled(Container)({
  background: colors.background.light,
  border: `1px solid ${colors.neutral?.main || '#DFE0E5'}`,
  borderRadius: 8,
  padding: '20px 24px',
  marginBottom: 24,
})

export const FieldRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  marginBottom: 16,
})

export const FieldLabelBox = styled(Box)({
  flex: 0.7,
})

export const FieldInputBox = styled(Box)({
  flex: 0.3,
})

export const FieldBox = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
})

export const ActionButtons = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
})

export const Divider = styled(Box)({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  color: colors.text.secondary,
  marginBottom: 16,

  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    height: '1px',
    backgroundColor: colors.neutral?.main || '#DFE0E5',
    top: '50%',
    width: '45%',
  },

  '&::before': {
    left: 0,
  },

  '&::after': {
    right: 0,
  },
})

export const RotatedSendIcon = styled(SendRounded)({
  transform: 'rotate(-45deg)',
  margin: '0 8px',
})

export const FormsContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  marginBottom: 24,
})

export const FormWrapper = styled(Box)({
  position: 'relative',
})

export const DeleteButton = styled(Delete)({
  cursor: 'pointer',
  color: 'red',
})

export const SettleHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 16,
})
