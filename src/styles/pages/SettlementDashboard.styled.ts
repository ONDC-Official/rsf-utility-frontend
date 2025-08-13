import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import colors from 'theme/colors'

export const Container = styled(Box)({
  background: colors.background.main,
})

export const PageHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: 8,
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

export const TableContainer = styled(Box)({
  backgroundColor: colors.background.light,
  borderRadius: '8px',
  boxShadow: `6px 6px 54px 0px ${colors.shadow.main}`,
})

export const Wrapper = styled(Box)({
  background: colors.background.light,
  borderRadius: 8,
  padding: '0 8px',
})

export const TableHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: '8px',
})

export const Actions = styled(Box)({
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
})
