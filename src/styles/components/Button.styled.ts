import styled from 'styled-components'
import { Button } from '@mui/material'
import colors from '@theme/colors'
import { typography } from '@theme/typography'

export const StyledButton = styled(Button)`
  text-transform: none;
  border-radius: 4px;
`

export const OutlinedFilterButton = styled(Button)`
  color: ${colors.text.secondary};
  border-color: ${colors.border.main};
  text-transform: none;
  font-family: ${typography.body1_medium.fontFamily};

  &:hover {
    border-color: ${colors.text.secondary};
  }
`

export const ContainedExportButton = styled(Button)`
  background-color: ${colors.primary.main};
  text-transform: none;
  font-family: ${typography.body1_medium.fontFamily};

  &:hover {
    background-color: ${colors.primary.dark};
  }
`
