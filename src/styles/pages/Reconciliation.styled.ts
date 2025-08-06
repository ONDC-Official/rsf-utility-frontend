import styled from '@emotion/styled'
import { Box, Button, Chip, Typography } from '@mui/material'
import colors from '../../theme/colors'

export const ReconciliationContainer = styled(Box)`
  padding: 24px;
  background-color: ${colors.background.main};
  min-height: 100vh;
`

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 8px;
`

export const TabContainer = styled(Box)`
  display: flex;
  gap: 8px;
`

export const TabButton = styled(Button)`
  text-transform: none;
  font-weight: 500;
  border-radius: 6px;
  padding: 8px 16px;
  min-width: auto;
`

export const GenerateButton = styled(Button)`
  text-transform: none;
  font-weight: 500;
  border-radius: 6px;
  padding: 8px 16px;
  background-color: ${colors.primary.main};
  color: ${colors.primary.contrastText};
  &:hover {
    background-color: ${colors.primary.dark};
  }
`

export const TableSection = styled(Box)`
  background: ${colors.background.light};
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 4px ${colors.shadow.main};
  margin-bottom: 24px;
`

export const TableHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

export const TableTitle = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.text.primary};
`

export const TableControls = styled(Box)`
  display: flex;
  gap: 12px;
  align-items: center;
`

export const ExportButton = styled(Button)`
  text-transform: none;
  font-weight: 500;
  border-radius: 6px;
  padding: 6px 12px;
  border-color: ${colors.primary.main};
  color: ${colors.primary.main};
  &:hover {
    border-color: ${colors.primary.dark};
    background-color: rgba(25, 118, 210, 0.04);
  }
`

export const FilterButton = styled(Button)`
  text-transform: none;
  font-weight: 500;
  border-radius: 6px;
  padding: 6px 12px;
  border-color: ${colors.text.secondary};
  color: ${colors.text.secondary};
  &:hover {
    border-color: ${colors.text.primary};
    background-color: rgba(102, 102, 102, 0.04);
  }
`

export const PaginationContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid ${colors.border.main};
`

export const EntriesContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const StatusChip = styled(Chip)`
  font-weight: 500;
  border-radius: 12px;
  height: 24px;
  font-size: 12px;
`

export const ActionButton = styled(Button)`
  text-transform: none;
  font-weight: 500;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  min-width: auto;
`
