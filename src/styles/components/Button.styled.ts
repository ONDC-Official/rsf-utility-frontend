import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'
import colors from 'theme/colors'
import { typography } from 'theme/typography'

export const StyledButton = styled(Button)({
  textTransform: 'none',
  borderRadius: 8,
  fontFamily: typography.body1_medium.fontFamily,
  whiteSpace: 'nowrap',

  '&.MuiButton-contained': {
    color: colors.text.light,
    backgroundColor: colors.primary.main,
    borderColor: colors.border.tertiary,

    '&:hover': {
      backgroundColor: colors.primary.dark,
    },

    '&.Mui-disabled': {
      opacity: 0.5,
      pointerEvents: 'none',
    },
  },

  '&.MuiButton-outlined': {
    color: colors.text.tertiary,
    backgroundColor: 'transparent',
    borderColor: colors.border.tertiary,

    '&:hover': {
      backgroundColor: colors.border.tertiary + '10',
    },

    '&.Mui-disabled': {
      opacity: 0.5,
      pointerEvents: 'none',
    },
  },
})

export const OutlinedFilterButton = styled(Button)({
  color: `${colors.text.tertiary} `,
  borderColor: `${colors.border.tertiary} `,
  textTransform: 'none',
  fontFamily: typography.body1_medium.fontFamily,
})

export const ContainedExportButton = styled(Button)({
  borderColor: `${colors.border.tertiary} `,
  textTransform: 'none',
  fontFamily: typography.body1_medium.fontFamily,
})
