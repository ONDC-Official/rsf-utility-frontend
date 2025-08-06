import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'
import colors from 'theme/colors'
import { typography } from 'theme/typography'

export const StyledButton = styled(Button)({
  textTransform: 'none',
  borderRadius: 4,
  fontFamily: typography.body1_medium.fontFamily,

  '&.MuiButton-contained': {
    color: colors.text.light,
    backgroundColor: colors.primary.main,
    borderColor: colors.border.tertiary,
  },

  '&.MuiButton-outlined': {
    color: colors.text.tertiary,
    backgroundColor: 'transparent',
    borderColor: colors.border.tertiary,
  },
})

export const OutlinedFilterButton = styled(Button)({
  color: `${colors.text.tertiary} `,
  borderColor: `${colors.border.tertiary} `,
  textTransform: 'none',
  fontFamily: typography.body1_medium.fontFamily,
})

export const ContainedExportButton = styled(Button)({
  color: `${colors.text.light} `,
  borderColor: `${colors.border.tertiary} `,
  textTransform: 'none',
  fontFamily: typography.body1_medium.fontFamily,
})
