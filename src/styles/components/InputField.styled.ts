import { styled } from '@mui/material/styles'
import { TextField, Box, Typography } from '@mui/material'
import colors from 'theme/colors'
import { typography } from 'theme/typography'

export const InputContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
})

export const InputLabel = styled(Typography)({
  fontFamily: typography.body2_medium.fontFamily,
  fontSize: typography.body2_medium.fontSize,
  fontWeight: typography.body2_medium.fontWeight,
  color: colors.text.primary,
})

export const StyledTextField = styled(TextField)({
  width: '100%',
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
    display: 'none',
  },
})
