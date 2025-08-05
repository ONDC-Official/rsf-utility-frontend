import { styled } from '@mui/material/styles'
import { Chip } from '@mui/material'
import colors from '@theme/colors'
import { typography } from '@theme/typography'

export const StatusChip = styled(Chip)({
  backgroundColor: colors.warning.light,
  color: colors.warning.tertiaryMain,
  fontSize: typography.body5_medium.fontSize,
  height: 24,
  fontFamily: typography.body5_medium.fontFamily,
})
