import styled from 'styled-components'
import { Chip } from '@mui/material'
import colors from '@theme/colors'
import { typography } from '@theme/typography'

export const StatusChip = styled(Chip)`
  background-color: ${colors.warning.light};
  color: ${colors.warning.tertiaryMain};
  font-size: ${typography.body5_medium.fontSize};
  height: 24px;
  font-family: ${typography.body5_medium.fontFamily};
`
