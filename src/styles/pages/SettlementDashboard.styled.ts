import styled from 'styled-components'
import { Box, Typography, Card, CardContent, Chip } from '@mui/material'
import colors from '@theme/colors'
import { typography } from '@theme/typography'

export const PageContainer = styled(Box)`
  background: ${colors.background.main};
  min-height: 100%;
`

export const PageHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
`

export const HeaderLeft = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const HeaderRight = styled(Box)`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const PageTitle = styled(Typography)`
  font-family: ${typography.h3_semibold.fontFamily};
  font-weight: ${typography.h3_semibold.fontWeight};
  color: ${colors.text.primary};
  font-size: ${typography.h3_semibold.fontSize};
  line-height: ${typography.h3_semibold.lineHeight};
`

export const PageSubtitle = styled(Typography)`
  color: ${colors.text.secondary};
  font-family: ${typography.body1_regular.fontFamily};
  font-size: ${typography.body1_regular.fontSize};
`

export const ReceiverLabel = styled(Typography)`
  color: ${colors.text.primary};
  font-family: ${typography.body2_medium.fontFamily};
  font-weight: ${typography.body2_medium.fontWeight};
  font-size: ${typography.body2_medium.fontSize};
`

export const SummaryGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`

export const SummaryCard = styled(Card)`
  background: ${colors.background.light};
  box-shadow: 6px 6px 54px 0px ${colors.shadow.main};
  border-radius: 8px;
  border: 1px solid ${colors.border.main};
`

export const SummaryCardContent = styled(CardContent)`
  padding: 24px;
  
  &:last-child {
    padding-bottom: 24px;
  }
`

export const SummaryTitle = styled(Typography)`
  color: ${colors.text.secondary};
  font-family: ${typography.body2_medium.fontFamily};
  font-weight: ${typography.body2_medium.fontWeight};
  font-size: ${typography.body2_medium.fontSize};
  margin-bottom: 8px;
`

export const SummaryValue = styled(Typography)`
  font-family: ${typography.h5_semibold.fontFamily};
  font-weight: ${typography.h5_semibold.fontWeight};
  color: ${colors.text.primary};
  font-size: ${typography.h5_semibold.fontSize};
  line-height: ${typography.h5_semibold.lineHeight};
`

export const SummarySubtext = styled(Typography)`
  color: ${colors.text.secondary};
  font-family: ${typography.body2_regular.fontFamily};
  font-size: ${typography.body2_regular.fontSize};
  margin-top: 4px;
`

export const TableContainer = styled(Box)`
  background: ${colors.background.light};
  box-shadow: 6px 6px 54px 0px ${colors.shadow.main};
  border-radius: 8px;
  overflow: hidden;
`

export const TableHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid ${colors.border.main};
`

export const TableActions = styled(Box)`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const TableTitle = styled(Typography)`
  font-family: ${typography.h6_semibold.fontFamily};
  font-weight: ${typography.h6_semibold.fontWeight};
  color: ${colors.text.primary};
  font-size: ${typography.h6_semibold.fontSize};
`

export const StatusIndicator = styled(Box)<{ status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 16px;
  font-family: ${typography.body2_medium.fontFamily};
  font-weight: ${typography.body2_medium.fontWeight};
  font-size: ${typography.body2_medium.fontSize};
  
  ${({ status }) => {
    switch (status) {
      case 'Completed':
        return `
          background: ${colors.success.light};
          color: ${colors.success.main};
        `
      case 'Pending':
        return `
          background: ${colors.warning.light};
          color: ${colors.warning.main};
        `
      case 'Failed':
        return `
          background: ${colors.error.light};
          color: ${colors.error.main};
        `
      case 'In Progress':
        return `
          background: ${colors.background.light};
          color: ${colors.text.secondary};
        `
      default:
        return `
          background: ${colors.background.light};
          color: ${colors.text.secondary};
        `
    }
  }}
`

export const StatusChip = styled(Chip)<{ status: string }>`
  font-family: ${typography.body2_medium.fontFamily};
  font-weight: ${typography.body2_medium.fontWeight};
  font-size: ${typography.body2_medium.fontSize};
  height: 24px;
  
  ${({ status }) => {
    switch (status) {
      case 'Settled':
        return `
          background: #4caf50;
          color: white;
        `
      case 'Not Settled':
        return `
          background: #f44336;
          color: white;
        `
      default:
        return `
          background: ${colors.background.light};
          color: ${colors.text.secondary};
        `
    }
  }}
`

export const ErrorContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const ErrorIcon = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #9c27b0;
  color: white;
  font-size: 12px;
  font-weight: bold;
`

export const CounterpartyTag = styled(Chip)`
  background: #1976d2;
  color: white;
  font-family: ${typography.body2_medium.fontFamily};
  font-weight: ${typography.body2_medium.fontWeight};
  font-size: ${typography.body2_medium.fontSize};
  height: 24px;
`

export const FilterContainer = styled(Box)`
  margin-bottom: 24px;
`

export const FilterRow = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`

export const FilterLeft = styled(Box)`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const FilterRight = styled(Box)`
  display: flex;
  align-items: center;
  gap: 16px;
` 