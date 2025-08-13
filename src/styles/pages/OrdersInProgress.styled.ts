import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import colors from 'theme/colors'

export const Container = styled(Box)({
  background: colors.background.main,
  minHeight: '100%',
})

export const Header = styled(Box)({
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

export const Wrapper = styled(Box)({
  background: colors.background.light,
  boxShadow: `6px 6px 54px 0px ${colors.shadow.main}`,
  borderRadius: 8,
  overflow: 'hidden',
  padding: '8px',
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
