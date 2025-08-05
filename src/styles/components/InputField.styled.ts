import styled from 'styled-components'
import { TextField } from '@mui/material'
import colors from '@theme/colors'
import { typography } from '@theme/typography'

export const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    font-family: ${typography.body2_regular.fontFamily};
    font-size: ${typography.body2_regular.fontSize};
    background-color: ${colors.background.light};
    border-radius: 4px;

    & fieldset {
      border-color: ${colors.border.main};
    }

    &:hover fieldset {
      border-color: ${colors.border.primary};
    }

    &.Mui-focused fieldset {
      border-color: ${colors.primary.main};
    }
  }

  & .MuiInputLabel-root {
    font-family: ${typography.body2_medium.fontFamily};
    color: ${colors.text.secondary};
  }
`