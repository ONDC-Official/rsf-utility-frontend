import { styled } from '@mui/material/styles'
import { TextField } from '@mui/material'
import colors from 'theme/colors'
import { typography } from 'theme/typography'

export const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    fontFamily: typography.body2_regular.fontFamily,
    fontSize: typography.body2_regular.fontSize,
    backgroundColor: colors.background.light,
    borderRadius: 4,

    '& fieldset': {
      borderColor: colors.border.main,
    },

    '&:hover fieldset': {
      borderColor: colors.border.primary,
    },

    '&.Mui-focused fieldset': {
      borderColor: colors.primary.main,
    },
  },

  '& .MuiInputLabel-root': {
    fontFamily: typography.body2_medium.fontFamily,
    color: colors.text.secondary,
  },
})
