import styled from 'styled-components'
import { Paper, TableHead, TableCell } from '@mui/material'

export const StyledTableContainer = styled(Paper)`
  background: #ffffff;
  box-shadow: 6px 6px 54px 0px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  overflow: hidden;
`

export const StyledTableHead = styled(TableHead)`
  background-color: transparent;
`

export const StyledTableCell = styled(TableCell)`
  font-weight: 500;
  font-size: 14px;
  color: #5b6578;
`