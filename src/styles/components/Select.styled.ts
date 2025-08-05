import styled from 'styled-components'
import { FormControl, Select } from '@mui/material'
import colors from '@theme/colors'

export const StyledFormControl = styled(FormControl)`
  min-width: 120px;
`

export const NavbarSelect = styled(Select)`
  background: ${colors.primary.main};
  border: 1px solid ${colors.button.subHeading};
  border-radius: 4px;

  & .MuiSelect-select {
    color: ${colors.primary.contrastText} !important;
    background-color: ${colors.primary.main} !important;
    padding: 8px 12px;
  }

  & .MuiOutlinedInput-root {
    background-color: ${colors.primary.main} !important;
  }

  & .MuiSelect-icon {
    color: ${colors.primary.contrastText} !important;
  }

  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  &:hover .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`
