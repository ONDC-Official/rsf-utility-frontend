import { styled } from '@mui/material/styles'
import { FormControl } from '@mui/material'

export const StyledFormControl = styled(FormControl)(({ size }) => ({
  minWidth: size === 'small' ? 140 : 120,
  '& .MuiOutlinedInput-root': {
    ...(size === 'small' && {
      width: 140,
      height: 32,
      borderRadius: '8px',
      border: '1px solid #BFBFBF',
      '& .MuiSelect-select': {
        paddingTop: 8,
        paddingRight: 10,
        paddingBottom: 8,
        paddingLeft: 10,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      '&:hover': {
        borderColor: '#BFBFBF',
      },
      '&.Mui-focused': {
        borderColor: '#BFBFBF',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
    }),
  },
}))
