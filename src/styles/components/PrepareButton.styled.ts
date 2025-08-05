import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'
import colors from '@theme/colors'
import { typography } from '@theme/typography'

export const PrepareButton = styled(Button)<{
  $isDisabled?: boolean
  $isActive?: boolean
}>(({ $isDisabled, $isActive }) => ({
  textTransform: 'none',
  fontFamily: typography.body2_medium.fontFamily,
  fontWeight: typography.body2_medium.fontWeight,
  fontSize: typography.body2_medium.fontSize,
  borderRadius: 4,
  padding: '8px 16px',
  minHeight: 36,

  ...($isDisabled && {
    background: colors.background.light,
    border: `1px solid ${colors.border.tertiary}`,
    color: colors.button.subHeading,

    '&:hover': {
      background: colors.background.light,
      border: `1px solid ${colors.border.tertiary}`,
    },
  }),

  ...($isActive && {
    background: colors.primary.main,
    border: `1px solid ${colors.border.tertiary}`,
    color: colors.primary.contrastText,

    '&:hover': {
      background: colors.primary.dark,
      border: `1px solid ${colors.border.tertiary}`,
    },
  }),
}))
