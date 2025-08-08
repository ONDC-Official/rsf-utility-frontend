import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'

export const PopoverContainer = styled(Box)({
  padding: 16,
  minWidth: 300,
})

export const PopoverTitle = styled(Typography)({
  marginBottom: 16,
})

export const DateFieldsContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  marginBottom: 16,
})

export const ActionsContainer = styled(Box)({
  display: 'flex',
  gap: 8,
  justifyContent: 'flex-end',
})
