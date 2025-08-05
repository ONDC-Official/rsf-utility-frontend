import styled from 'styled-components'
import { Box, Typography } from '@mui/material'
import colors from '@theme/colors'
import { typography } from '@theme/typography'

export const Container = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
`

export const PaginationInfo = styled(Typography)`
  color: ${colors.text.tertiary};
  font-size: ${typography.body2_regular.fontSize};
  flex: 1;
`

export const PaginationControls = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex: 1;
`

export const PaginationShowContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  justify-content: flex-end;
`

export const PaginationShowText = styled(Typography)`
  color: ${colors.text.tertiary};
  font-size: ${typography.body2_regular.fontSize};
`
