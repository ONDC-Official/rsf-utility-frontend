import styled from 'styled-components'
import { Paper, TableHead, TableCell, TableRow } from '@mui/material'
import colors from '@theme/colors'
import { typography } from '@theme/typography'

export const StyledTableContainer = styled(Paper)`
  background: ${colors.background.light};
  box-shadow: 6px 6px 54px 0px ${colors.shadow.main};
  border-radius: 8px;
  overflow: hidden;
`

export const StyledTableHead = styled(TableHead)`
  background: #f5f5f5;
  border-radius: 8px;

  & .MuiTableRow-root {
    & .MuiTableCell-root:first-child {
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    }
    & .MuiTableCell-root:last-child {
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }
`

export const StyledTableCell = styled(TableCell)`
  font-weight: ${({ theme }) => theme?.typography?.body5_semibold?.fontWeight || '600'};
  font-size: ${({ theme }) => theme?.typography?.body5_semibold?.fontSize || '12px'};
  color: ${colors.text.tertiary};
`

export const StyledTableBodyCell = styled(TableCell)`
  font-weight: ${({ theme }) => theme?.typography?.body2_regular?.fontWeight || '600'};
  font-size: ${({ theme }) => theme?.typography?.body2_regular?.fontSize || '14px'};
  color: ${colors.text.tertiary};
`

export const StyledTableRow = styled(TableRow)<{ isLast?: boolean }>`
  ${({ isLast }) =>
    !isLast &&
    `
    & .MuiTableCell-root {
      border-bottom: 1px solid ${colors.border.main};
    }
  `}

  & .MuiTableCell-root {
    font-family: ${typography.body2_regular.fontFamily};
    font-size: ${typography.body2_regular.fontSize};
    color: ${colors.text.tertiary};
  }
`
