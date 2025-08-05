import styled from 'styled-components'
import { Box, Typography } from '@mui/material'
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

export const AlertContainer = styled(Box)`
  background: ${colors.alert?.light || '#FCEBEC'};
  border: 1px solid ${colors.alert?.main || '#DC3545'};
  color: ${colors.alert?.main || '#DC3545'};
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: ${typography.body2_medium.fontFamily};
  font-size: ${typography.body2_medium.fontSize};
`

export const SettlementModeContainer = styled(Box)`
  background: ${colors.background.light};
  border: 1px solid ${colors.neutral?.main || '#DFE0E5'};
  border-radius: 8px;
  padding: 20px 24px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ModeLeft = styled(Box)`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const ModeRight = styled(Box)`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const ModeContent = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const ModeRow = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const CustomDateLabel = styled(Typography)`
  font-family: ${typography.body2_medium.fontFamily};
  font-weight: ${typography.body2_medium.fontWeight};
  color: ${colors.text.primary};
  font-size: ${typography.body2_medium.fontSize};
  margin-bottom: 8px;
`

export const ModeTitle = styled(Typography)`
  font-family: ${typography.h6_semibold.fontFamily};
  font-weight: ${typography.h6_semibold.fontWeight};
  color: ${colors.text.primary};
  font-size: ${typography.h6_semibold.fontSize};
`

export const ModeDescription = styled(Typography)`
  font-family: ${typography.body2_regular.fontFamily};
  color: ${colors.text.secondary};
  font-size: ${typography.body2_regular.fontSize};
`

export const CounterpartyLabel = styled(Typography)`
  color: ${colors.text.primary};
  font-family: ${typography.body2_medium.fontFamily};
  font-weight: ${typography.body2_medium.fontWeight};
  font-size: ${typography.body2_medium.fontSize};
`

export const OrderSelectionContainer = styled(Box)`
  background: ${colors.background.light};
  box-shadow: 6px 6px 54px 0px ${colors.shadow.main};
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 24px;
`

export const OrderSelectionHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid ${colors.border.main};
`

export const SectionTitle = styled(Typography)`
  font-family: ${typography.h6_semibold.fontFamily};
  font-weight: ${typography.h6_semibold.fontWeight};
  color: ${colors.text.primary};
  font-size: ${typography.h6_semibold.fontSize};
`

export const ActionButtons = styled(Box)`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const SummaryContainer = styled(Box)`
  background: ${colors.background.light};
  box-shadow: 6px 6px 54px 0px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
`

export const SummaryHeader = styled(Typography)`
  font-family: ${typography.h6_semibold.fontFamily};
  font-weight: ${typography.h6_semibold.fontWeight};
  color: ${colors.text.primary};
  font-size: ${typography.h6_semibold.fontSize};
  margin-bottom: 20px;
`

export const SummaryCards = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
`

export const Divider = styled(Box)`
  height: 1px;
  background: ${colors.border.main};
  margin: 24px 0;
`

export const CustomDateSection = styled(Box)`
  margin-bottom: 24px;
`

export const ButtonSection = styled(Box)`
  display: flex;
  gap: 16px;
`

export const PayloadPreviewContainer = styled(Box)`
  background: ${colors.background.light};
  box-shadow: 6px 6px 54px 0px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 24px;
`

export const PayloadHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

export const PayloadActions = styled(Box)`
  display: flex;
  gap: 16px;
`

export const JsonPreview = styled(Box)`
  background: ${colors.background.main};
  border-radius: 8px;
  padding: 16px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 12px;
  line-height: 1.4;
  color: ${colors.text.primary};
  white-space: pre-wrap;
  overflow-x: auto;
  max-height: 400px;
  overflow-y: auto;
`
