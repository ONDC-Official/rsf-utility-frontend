import { styled } from '@mui/material/styles'
import { Box, IconButton } from '@mui/material'
import colors from 'theme/colors'
import { StyledTableBodyCell } from 'styles/components/Table.styled'

export const Container = styled(Box)({
  borderBottom: `1px solid ${colors.border.main}`,
  marginBottom: '8px',
  '& .MuiTabs-root': {
    minHeight: 'auto',
  },
  '& .MuiTab-root': {
    textTransform: 'none',
    minHeight: '48px',
    padding: '4px 8px',
  },
})

export const TableContainer = styled(Box)({
  background: colors.background.light,
  boxShadow: `6px 6px 54px 0px ${colors.shadow.main}`,
  borderRadius: 8,
  overflow: 'hidden',
  marginBottom: 8,
})

export const TableHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: '8px',
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

export const ActionButtonGroup = styled(Box)({
  display: 'flex',
  gap: 8,
})

export const ModalContainer = styled(Box)({
  position: 'absolute',
  top: '10%',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '600px',
  maxWidth: '90vw',
  maxHeight: '80vh',
  display: 'flex',
  flexDirection: 'column',
})

export const Content = styled(Box)({
  background: colors.background.light,
  borderRadius: 8,
  boxShadow: `6px 6px 54px 0px ${colors.shadow.main}`,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '100%',
})

export const Header = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 24px',
  borderBottom: `1px solid ${colors.border.main}`,
  flexShrink: 0,
})

export const Wrapper = styled(Box)({
  background: colors.background.light,
  borderRadius: 8,
  padding: '0 8px',
})

export const CloseButton = styled(IconButton)({
  padding: '8px',
  color: colors.text.secondary,
})

export const StyledForm = styled(Box)({
  padding: '24px',
  flex: 1,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
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
  marginTop: 'auto',
  paddingTop: '24px',
  borderTop: `1px solid ${colors.border.main}`,
  flexShrink: 0,
})

export const ErrorCell = styled(StyledTableBodyCell)({
  color: colors.error.main,
})
