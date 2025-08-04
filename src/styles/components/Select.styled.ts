import styled from 'styled-components'
import { FormControl, Select } from '@mui/material'
import colors from '@theme/colors'

export const StyledFormControl = styled(FormControl)`
  min-width: 120px;
`

export const NavbarSelect = styled(Select)`
  & .MuiSelect-select {
    color: ${colors.primary.contrastText};
    background-color: rgba(255, 255, 255, 0.1);
  }

  & .MuiOutlinedInput-notchedOutline {
    border-color: rgba(255, 255, 255, 0.3);
  }

  &:hover .MuiOutlinedInput-notchedOutline {
    border-color: rgba(255, 255, 255, 0.5);
  }

  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: rgba(255, 255, 255, 0.7);
  }
`
