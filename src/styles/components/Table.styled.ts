import { styled } from '@mui/material/styles'
import { Paper, TableHead, TableCell, TableRow } from '@mui/material'
import colors from 'theme/colors'
import { typography } from 'theme/typography'

export const StyledTableContainer = styled(Paper)({
  background: colors.background.light,
  boxShadow: `6px 6px 54px 0px ${colors.shadow.main}`,
  borderRadius: 8,
  overflow: 'hidden',
})

export const StyledTableHead = styled(TableHead)({
  background: '#f5f5f5',
  borderRadius: 8,

  '& .MuiTableRow-root': {
    '& .MuiTableCell-root:first-of-type': {
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
    },
    '& .MuiTableCell-root:last-of-type': {
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
    },
  },
})

export const StyledTableCell = styled(TableCell)({
  fontWeight: typography.body5_semibold?.fontWeight || '600',
  fontSize: typography.body5_semibold?.fontSize || '12px',
  color: colors.text.tertiary,
})

export const StyledTableBodyCell = styled(TableCell)({
  fontWeight: typography.body2_regular?.fontWeight || '600',
  fontSize: typography.body2_regular?.fontSize || '14px',
  color: colors.text.tertiary,
})

export const StyledTableRow = styled(TableRow)<{ isLast?: boolean }>(({ isLast }) => ({
  ...(!isLast && {
    '& .MuiTableCell-root': {
      borderBottom: `1px solid ${colors.border.main}`,
    },
  }),

  '& .MuiTableCell-root': {
    fontFamily: typography.body2_regular.fontFamily,
    fontSize: typography.body2_regular.fontSize,
    color: colors.text.tertiary,
  },
}))
