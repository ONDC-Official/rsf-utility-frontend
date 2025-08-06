import { styled } from '@mui/material/styles'
import { Paper, TableHead, TableCell, TableRow, TableContainer, IconButton } from '@mui/material'
import colors from 'theme/colors'
import { typography } from 'theme/typography'

export const Container = styled(Paper)({
  background: colors.background.light,
  boxShadow: `6px 6px 54px 0px ${colors.shadow.main}`,
  borderRadius: 8,
  overflow: 'hidden',
})

export const StyledTableHead = styled(TableHead)({
  background: colors.background.main,
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

export const Wrapper = styled(TableContainer)({
  padding: '0 24px',
})

export const StyledIconButton = styled(IconButton)({
  padding: '2px',
})

export const HeaderLabelContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
})

export const TableHeaderCheckboxCell = styled(TableCell)({
  fontWeight: typography.body5_semibold?.fontWeight || '600',
  fontSize: typography.body5_semibold?.fontSize || '12px',
  color: colors.text.tertiary,
})
