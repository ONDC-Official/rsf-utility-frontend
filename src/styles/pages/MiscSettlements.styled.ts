import { styled } from '@mui/material/styles'
import { Box, Typography, Card, CardContent, TextField, Button } from '@mui/material'
import colors from '../../theme/colors'
import { typography } from '../../theme/typography'

export const Container = styled(Box)`
  background: ${colors.background.main};
  min-height: 100%;
  padding: 24px;
`

export const Header = styled(Box)`
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

export const BulkUploadButton = styled(Button)`
  background: ${colors.primary.main};
  color: white;
  text-transform: none;
  font-family: ${typography.body2_medium.fontFamily};
  font-weight: ${typography.body2_medium.fontWeight};
  font-size: ${typography.body2_medium.fontSize};
  padding: 8px 16px;
  border-radius: 6px;

  &:hover {
    background: ${colors.primary.dark};
  }
`

export const Wrapper = styled(Card)`
  background: ${colors.background.light};
  box-shadow: 6px 6px 54px 0px ${colors.shadow.main};
  border-radius: 8px;
  border: 1px solid ${colors.border.main};
  margin-bottom: 24px;
`

export const SettlementDetailsContent = styled(CardContent)`
  padding: 24px;

  &:last-child {
    padding-bottom: 24px;
  }
`

export const CardTitle = styled(Typography)`
  font-family: ${typography.h6_semibold.fontFamily};
  font-weight: ${typography.h6_semibold.fontWeight};
  color: ${colors.text.primary};
  font-size: ${typography.h6_semibold.fontSize};
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`

export const FormGrid = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
`

export const AmountSection = styled(Box)`
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
`

export const AmountLabel = styled(Typography)`
  color: ${colors.text.primary};
  font-family: ${typography.body2_medium.fontFamily};
  font-weight: ${typography.body2_medium.fontWeight};
  font-size: ${typography.body2_medium.fontSize};
  margin-bottom: 8px;
`

export const AmountInput = styled(TextField)`
  .MuiOutlinedInput-root {
    background: ${colors.background.light};
    border-radius: 6px;

    .MuiOutlinedInput-input {
      font-family: ${typography.body1_regular.fontFamily};
      font-size: ${typography.body1_regular.fontSize};
      color: ${colors.text.primary};
    }
  }
`

export const IconContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`

export const IconCircle = styled(Box)<{ color: string }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 12px;
`

export const CreateSettlementButton = styled(Button)`
  background: ${colors.primary.main};
  color: white;
  text-transform: none;
  font-family: ${typography.body2_medium.fontFamily};
  font-weight: ${typography.body2_medium.fontWeight};
  font-size: ${typography.body2_medium.fontSize};
  padding: 12px 24px;
  border-radius: 6px;

  &:hover {
    background: ${colors.primary.dark};
  }
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

export const TableTitle = styled(Typography)`
  font-family: ${typography.h6_semibold.fontFamily};
  font-weight: ${typography.h6_semibold.fontWeight};
  color: ${colors.text.primary};
  font-size: ${typography.h6_semibold.fontSize};
`

export const FilterContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const FilterButton = styled(Button)`
  border: 1px solid ${colors.border.main};
  color: ${colors.text.primary};
  text-transform: none;
  font-family: ${typography.body2_medium.fontFamily};
  font-weight: ${typography.body2_medium.fontWeight};
  font-size: ${typography.body2_medium.fontSize};
  padding: 8px 16px;
  border-radius: 6px;

  &:hover {
    border-color: ${colors.primary.main};
    background: rgba(11, 51, 82, 0.04);
  }
`

export const ExportButton = styled(Button)`
  background: ${colors.primary.main};
  color: white;
  text-transform: none;
  font-family: ${typography.body2_medium.fontFamily};
  font-weight: ${typography.body2_medium.fontWeight};
  font-size: ${typography.body2_medium.fontSize};
  padding: 8px 16px;
  border-radius: 6px;

  &:hover {
    background: ${colors.primary.dark};
  }
`
