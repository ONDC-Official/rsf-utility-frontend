import styled from 'styled-components'
import { Paper, TableHead, TableCell } from '@mui/material'
import colors from '@theme/colors'
import { typography } from '@theme/typography'

export const StyledTableContainer = styled(Paper)`
  background: ${colors.background.light};
  box-shadow: 6px 6px 54px 0px ${colors.shadow.main};
  border-radius: 8px;
  overflow: hidden;
`

export const StyledTableHead = styled(TableHead)`
  background-color: transparent;
`

export const StyledTableCell = styled(TableCell)`
  font-weight: ${typography.body2_medium.fontWeight};
  font-size: ${typography.body2_medium.fontSize};
  color: ${colors.text.secondary};
`
