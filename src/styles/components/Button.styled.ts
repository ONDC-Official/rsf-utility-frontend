import styled from 'styled-components'
import { Button } from '@mui/material'

export const StyledButton = styled(Button)`
  text-transform: none;
  border-radius: 4px;
`

export const OutlinedFilterButton = styled(Button)`
  color: #5b6578;
  border-color: #ebebeb;
  text-transform: none;
  font-family: 'Inter-Medium';
  
  &:hover {
    border-color: #5b6578;
  }
`

export const ContainedExportButton = styled(Button)`
  background-color: #0b3352;
  text-transform: none;
  font-family: 'Inter-Medium';
  
  &:hover {
    background-color: #0d3656;
  }
`