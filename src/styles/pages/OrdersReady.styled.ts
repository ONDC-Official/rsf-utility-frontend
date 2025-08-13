import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import colors from 'theme/colors'

export const PageContainer = styled(Box)({
  background: colors.background.main,
  minHeight: '100%',
})

export const PageHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: 8,
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

export const Container = styled(Box)({
  background: colors.background.light,
  borderRadius: 8,
  overflow: 'hidden',
  marginBottom: 8,
  padding: '8px',
})

export const Header = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 8,
})

export const Actions = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  marginBottom: 8,
})

export const ActionsContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
})
