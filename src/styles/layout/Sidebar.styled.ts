import styled from 'styled-components'
import { Drawer, Box, Typography, List, ListItemButton, ListItemText } from '@mui/material'
import colors from '@theme/colors'
import { typography } from '@theme/typography'

export const StyledDrawer = styled(Drawer)`
  & .MuiDrawer-paper {
    width: 280px;
    background: ${colors.primary.main};
    color: ${colors.primary.contrastText};
  }
`

export const LogoContainer = styled(Box)`
  padding: 24px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

export const LogoText = styled(Typography)`
  color: ${colors.primary.contrastText};
  font-weight: ${typography.h6_semibold.fontWeight};
  font-size: ${typography.h6_semibold.fontSize};
  font-family: ${typography.h6_semibold.fontFamily};
`

export const MenuList = styled(List)`
  padding: 20px 16px;
  flex: 1;
  .css-1p9uxgt-MuiListItem-root {
    padding-left: 10px !important;
    padding-right: 10px !important;
  }
`

export const LogoutContainer = styled(Box)`
  padding: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`

export const StyledListItemButton = styled(ListItemButton)<{ selected?: boolean }>`
  border-radius: 100px !important;
  margin-bottom: 8px;
  padding: 10px 16px;
  min-height: 40px;

  ${({ selected }) =>
    selected &&
    `
    background: linear-gradient(90deg, ${colors.primary.light} 0%, ${colors.primary.dark} 100%) !important;
    width: 220px;
    
    
    &:hover {
      background: linear-gradient(90deg, ${colors.primary.light} 0%, ${colors.primary.dark} 100%) !important;
      
    }
  `}
`

export const MenuItemText = styled(ListItemText)`
  & .MuiTypography-root {
    font-family: ${typography.body2_medium.fontFamily};
    font-weight: ${typography.body2_medium.fontWeight};
    font-size: ${typography.body2_medium.fontSize};
  }
`
