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
  width: '500px',
  padding: 32,
})

export const NoticeBox = styled(Box)({
  display: 'flex',
  gap: 16,
  padding: '24px',
  background: 'rgba(245, 166, 35, 0.1)',
  border: `1px solid ${colors.warning.main}`,
  borderRadius: 8,
  marginTop: 16,
  marginBottom: 16,
})

export const NoticeIconBox = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  paddingTop: 4,
  color: colors.warning.main,
})

export const NoticeTextBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  color: colors.warning.main,
  gap: 4,
})

export const ActionButtons = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
})
