import { styled } from '@mui/material/styles'
import { TextField, Box, Typography } from '@mui/material'
import colors from 'theme/colors'
import { typography } from 'theme/typography'

export const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
})

export const StyledLabel = styled(Typography)({
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

export const StyledDateTextField = styled(TextField)({
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
    '& input[type="date"]': {
      colorScheme: 'light',
      '&::-webkit-calendar-picker-indicator': {
        backgroundColor: colors.background.light,
        borderRadius: '4px',
        cursor: 'pointer',
        padding: '4px',
        '&:hover': {
          backgroundColor: colors.background.main,
        },
      },
      '&::-webkit-datetime-edit': {
        color: colors.text.primary,
      },
      '&::-webkit-datetime-edit-fields-wrapper': {
        color: colors.text.primary,
      },
      '&::-webkit-datetime-edit-text': {
        color: colors.text.secondary,
      },
      '&::-webkit-datetime-edit-month-field': {
        color: colors.text.primary,
      },
      '&::-webkit-datetime-edit-day-field': {
        color: colors.text.primary,
      },
      '&::-webkit-datetime-edit-year-field': {
        color: colors.text.primary,
      },
    },
  },
  '& .MuiInputLabel-root': {
    display: 'none',
  },
})
