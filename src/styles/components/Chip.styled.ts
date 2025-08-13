import { styled } from '@mui/material/styles'
import { Chip } from '@mui/material'
import colors from 'theme/colors'
import { typography } from 'theme/typography'

export const StatusChip = styled(Chip)<{ color?: 'error' | 'warning' | 'success' | 'default' }>(
  ({ color = 'warning' }) => {
    const getChipColors = () => {
      switch (color) {
        case 'error':
          return {
            backgroundColor: colors.error.light,
            color: colors.error.main,
          }
        case 'success':
          return {
            backgroundColor: colors.success.light,
            color: colors.success.main,
          }
        case 'warning':
          return {
            backgroundColor: colors.warning.light,
            color: colors.warning.tertiaryMain,
          }
        default:
          return {
            backgroundColor: colors.warning.light,
            color: colors.warning.tertiaryMain,
          }
      }
    }

    return {
      ...getChipColors(),
      fontSize: typography.Body3_medium.fontSize,
      height: 24,
      fontFamily: typography.Body3_medium.fontFamily,
    }
  },
)
