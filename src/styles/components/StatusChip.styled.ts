import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import colors from 'theme/colors'
import { typography } from 'theme/typography'

const getStatusStyles = (status: 'Settled' | 'Not Settled' | 'Accepted' | 'Rejected') => {
  switch (status) {
    case 'Settled':
    case 'Accepted':
      return {
        background: `${colors.success.light}`,
        border: `1px solid ${colors.success.main}`,
        color: `${colors.success.main}`,
      }
    case 'Not Settled':
    case 'Rejected':
      return {
        background: `${colors.alert.light}`,
        border: `1px solid ${colors.error.dark}`,
        color: `${colors.alert.main}`,
      }
    default:
      return {
        background: `${colors.alert.light}`,
        border: `1px solid ${colors.error.dark}`,
        color: `${colors.alert.main}`,
      }
  }
}

export const Container = styled(Box)<{ status: 'Settled' | 'Not Settled' | 'Accepted' | 'Rejected' }>(({ status }) => ({
  ...getStatusStyles(status),
  width: 84,
  height: 24,
  borderRadius: 50,
  padding: '4px 8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: typography.body2_regular.fontFamily,
  fontSize: typography.body2_regular.fontSize,
  fontWeight: typography.body2_regular.fontWeight,
  textAlign: 'center',
  whiteSpace: 'nowrap',
}))
