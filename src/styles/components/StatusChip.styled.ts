import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import colors from 'theme/colors'
import { typography } from 'theme/typography'
import { SettlementStatus } from 'enums/settlement'
import { ReconStatus } from 'enums/recon'

const getStatusStyles = (
  status: SettlementStatus | string,
): {
  background: string
  border: string
  color: string
} => {
  switch (status) {
    case SettlementStatus.PENDING:
    case SettlementStatus.PREPARED:
    case ReconStatus.RECEIVED_PENDING:
    case ReconStatus.SENT_PENDING:
      return {
        background: `${colors.warning.light}`,
        border: `1px solid ${colors.warning.main}`,
        color: `${colors.warning.main}`,
      }
    case SettlementStatus.SETTLED:
    case ReconStatus.SENT_ACCEPTED:
    case ReconStatus.RECEIVED_ACCEPTED:
      return {
        background: `${colors.success.light}`,
        border: `1px solid ${colors.success.dark}`,
        color: `${colors.success.main}`,
      }
    case SettlementStatus.NOT_SETTLED:
    case 'SENT_REJECTED':
    case 'RECEIVED_REJECTED':
    case 'ERROR':
      return {
        background: `${colors.error.light}`,
        border: `1px solid ${colors.error.dark}`,
        color: `${colors.error.main}`,
      }
    default:
      return {
        background: `${colors.warning.light}`,
        border: `1px solid ${colors.warning.dark}`,
        color: `${colors.warning.main}`,
      }
  }
}

export const Container = styled(Box)<{ status: SettlementStatus | string }>(({ status }) => ({
  ...getStatusStyles(status),
  borderRadius: 50,
  height: 24,
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
