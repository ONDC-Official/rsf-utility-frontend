import styled from 'styled-components'
import { Button } from '@mui/material'
import colors from '@theme/colors'
import { typography } from '@theme/typography'

export const StyledButton = styled(Button)`
  text-transform: none;
  border-radius: 4px;
`

export const OutlinedFilterButton = styled(Button)`
  color: ${colors.text.tertiary} !important;
  border-color: ${colors.border.tertiary} !important;
  text-transform: none;
  font-family: ${typography.body1_medium.fontFamily};
`

export const ContainedExportButton = styled(Button)`
  color: ${colors.text.tertiary} !important;
  border-color: ${colors.border.tertiary} !important;
  text-transform: none;
  font-family: ${typography.body1_medium.fontFamily};
`
