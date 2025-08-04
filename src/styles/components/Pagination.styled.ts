import styled from 'styled-components'
import { Box, Typography } from '@mui/material'

export const PaginationContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-top: 1px solid #ebebeb;
`

export const PaginationInfo = styled(Typography)`
  color: #5b6578;
  font-size: 14px;
`

export const PaginationControls = styled(Box)`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const PaginationShowContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const PaginationShowText = styled(Typography)`
  color: #5b6578;
  font-size: 14px;
`
