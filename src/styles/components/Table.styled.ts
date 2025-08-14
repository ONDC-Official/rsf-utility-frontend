import { styled } from '@mui/material/styles'
import { Paper, TableHead, TableCell, TableRow, TableContainer, IconButton } from '@mui/material'
import colors from 'theme/colors'
import { typography } from 'theme/typography'

export const Container = styled(Paper)({
  background: colors.background.light,
  borderRadius: 8,
  overflow: 'hidden',
})

export const StyledTableHead = styled(TableHead)({
  background: '#f5f5f5',
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
  fontWeight: typography.body3_semibold?.fontWeight || '600',
  fontSize: typography.body3_semibold?.fontSize || '12px',
  color: colors.text.tertiary,
  padding: '4px 8px',
  height: '40px',
  verticalAlign: 'middle',
  whiteSpace: 'nowrap',
})

export const StyledTableBodyCell = styled(TableCell)({
  fontWeight: typography.body2_regular?.fontWeight || '400',
  fontSize: typography.body2_regular?.fontSize || '14px',
  color: colors.text.tertiary,
  fontFamily: typography.body2_regular.fontFamily,
  padding: '4px 8px',
  height: '64px',
  verticalAlign: 'middle',
  borderBottom: `1px solid ${colors.border.main}`,

  '&.highlight': {
    backgroundColor: colors.background.dark,
  },
})

export const StyledTableRow = styled(TableRow, {
  shouldForwardProp: (prop) => prop !== 'isLast',
})<{ isLast?: boolean }>(({ isLast }) => ({
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  ...(isLast && {
    '& .MuiTableCell-root': {
      borderBottom: 'none',
    },
  }),
}))

export const Wrapper = styled(TableContainer)({})

export const StyledIconButton = styled(IconButton)({
  padding: '2px',
  marginLeft: '4px',
})

export const HeaderLabelContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
})

export const TableHeaderCheckboxCell = styled(TableCell)({
  fontWeight: typography.body3_semibold?.fontWeight || '600',
  fontSize: typography.body3_semibold?.fontSize || '12px',
  color: colors.text.tertiary,
  padding: '4px 8px',
  width: '60px',
  minWidth: '60px',
  maxWidth: '60px',
  height: '56px',
  verticalAlign: 'middle',
  '& .MuiCheckbox-root': {
    padding: '4px',
  },
})

export const TableBodyCheckboxCell = styled(TableCell)({
  fontWeight: typography.body2_regular?.fontWeight || '400',
  fontSize: typography.body2_regular?.fontSize || '14px',
  color: colors.text.tertiary,
  fontFamily: typography.body2_regular.fontFamily,
  padding: '4px 18x',
  width: '60px',
  minWidth: '60px',
  maxWidth: '60px',
  height: '64px',
  verticalAlign: 'middle',
  borderBottom: `1px solid ${colors.border.main}`,
  '& .MuiCheckbox-root': {
    padding: '4px',
  },
  '&.highlight': {
    backgroundColor: colors.background.dark,
  },
})

export const ExpandableCell = styled(StyledTableBodyCell)<{ expanded?: boolean }>(() => ({
  width: '40px',
  padding: '8px',
  backgroundColor: 'inherit',
  textAlign: 'center',
  '&:hover': {
    backgroundColor: 'transparent !important',
  },
}))

export const ExpandedRow = styled(TableCell)({
  padding: '4px 8px',
  backgroundColor: '#F5F5F5',
  borderBottom: 'none',
  '& > div': {
    padding: '12px 0',
    color: colors.text.secondary,
    fontSize: typography.body2_regular.fontSize,
    fontFamily: typography.body2_regular.fontFamily,
  },
})

export const ActionIconButton = styled(IconButton)<{
  acceptButton?: boolean
  rejectButton?: boolean
}>(({ acceptButton, rejectButton }) => ({
  width: 36,
  height: 32,
  borderRadius: 8,
  padding: '8px 10px',
  gap: 4,
  border: '1px solid',
  backgroundColor: acceptButton ? `${colors.success.main}` : rejectButton ? `${colors.error.dark}` : 'inherit',
  borderColor: acceptButton ? `${colors.success.main}` : rejectButton ? `${colors.error.dark}` : colors.border.main,
  color: acceptButton || rejectButton ? '#FFFFFF' : colors.text.primary,
}))

export const ActionButton = styled('button')({
  backgroundColor: colors.background.light,
  border: colors.background.primary,
  borderRadius: 8,
  padding: '10px 12px',
  fontSize: typography.body3_medium.fontSize,
  fontWeight: typography.body3_medium.fontWeight,
  textTransform: 'none',
  minWidth: 'auto',
  cursor: 'pointer',
})

export const ErrorInfoContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
})
