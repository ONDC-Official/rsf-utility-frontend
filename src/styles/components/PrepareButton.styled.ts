import styled from 'styled-components'
import { Button } from '@mui/material'
import colors from '@theme/colors'
import { typography } from '@theme/typography'

export const PrepareButton = styled(Button)<{ 
  $isDisabled?: boolean
  $isActive?: boolean 
}>`
  text-transform: none;
  font-family: ${typography.body2_medium.fontFamily};
  font-weight: ${typography.body2_medium.fontWeight};
  font-size: ${typography.body2_medium.fontSize};
  border-radius: 4px;
  padding: 8px 16px;
  min-height: 36px;

  ${({ $isDisabled }) =>
    $isDisabled &&
    `
    background: ${colors.background.light};
    border: 1px solid ${colors.border.tertiary};
    color: ${colors.button.subHeading};
    
    &:hover {
      background: ${colors.background.light};
      border: 1px solid ${colors.border.tertiary};
    }
  `}

  ${({ $isActive }) =>
    $isActive &&
    `
    background: ${colors.primary.main};
    border: 1px solid ${colors.border.tertiary};
    color: ${colors.primary.contrastText};
    
    &:hover {
      background: ${colors.primary.dark};
      border: 1px solid ${colors.border.tertiary};
    }
  `}
`