import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'
import colors from 'theme/colors'
import { typography } from 'theme/typography'

export const StyledButton = styled(Button)({
  textTransform: 'none',
  borderRadius: 4,
})

export const OutlinedFilterButton = styled(Button)({
  color: `${colors.text.tertiary} !important`,
  borderColor: `${colors.border.tertiary} !important`,
  textTransform: 'none',
  fontFamily: typography.body1_medium.fontFamily,
})

export const ContainedExportButton = styled(Button)({
  color: `${colors.text.tertiary} !important`,
  borderColor: `${colors.border.tertiary} !important`,
  textTransform: 'none',
  fontFamily: typography.body1_medium.fontFamily,
})

export const PrimaryButton = styled(Button)({
  color: `${colors.text.light} !important`,
  borderColor: `${colors.border.tertiary} !important`,
  textTransform: 'none',
  fontFamily: typography.body1_medium.fontFamily,
  backgroundColor: colors.primary.main,
})

export const SecondaryButton = styled(Button)({
  color: `${colors.text.tertiary} !important`,
  borderColor: `${colors.border.tertiary} !important`,
  textTransform: 'none',
  fontFamily: typography.body1_medium.fontFamily,
})
