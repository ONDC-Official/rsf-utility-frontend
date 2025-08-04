import styled from 'styled-components'
import { Box, Typography } from '@mui/material'
import colors from '@theme/colors'
import { typography } from '@theme/typography'

export const PaginationContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-top: 1px solid ${colors.border.main};
`

export const PaginationInfo = styled(Typography)`
  color: ${colors.text.secondary};
  font-size: ${typography.body2_regular.fontSize};
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
  color: ${colors.text.secondary};
  font-size: ${typography.body2_regular.fontSize};
`
