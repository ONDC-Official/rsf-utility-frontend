import { styled } from '@mui/material/styles'
import { FormControl, Select } from '@mui/material'
import colors from 'theme/colors'

export const StyledFormControl = styled(FormControl)({
  minWidth: 120,
})

export const NavbarSelect = styled(Select)({
  background: colors.primary.main,
  border: `1px solid ${colors.button.subHeading}`,
  borderRadius: 4,
  width: 140,

  '& .MuiSelect-select': {
    color: `${colors.primary.contrastText} !important`,
    backgroundColor: `${colors.primary.main} !important`,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    padding: '0px 12px',
  },

  '& .MuiOutlinedInput-root': {
    backgroundColor: `${colors.primary.main} !important`,
    height: 24,
  },

  '& .MuiSelect-icon': {
    color: `${colors.primary.contrastText} !important`,
  },

  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },

  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },

  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
})
