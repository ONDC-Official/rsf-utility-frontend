import styled from 'styled-components'
import { Drawer, Box, Typography, List, ListItemButton, ListItemText } from '@mui/material'

export const StyledDrawer = styled(Drawer)`
  & .MuiDrawer-paper {
    width: 280px;
    background: #0b3352;
    color: white;
    border: none;
  }
`

export const LogoContainer = styled(Box)`
  padding: 24px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

export const LogoText = styled(Typography)`
  color: white;
  font-weight: 600;
  font-size: 20px;
  font-family: 'Inter-Bold';
`

export const MenuList = styled(List)`
  padding: 20px 16px;
  flex: 1;
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
    background: linear-gradient(90deg, #1C75BC 0%, #0D3656 100%) !important;
    width: 220px;
    
    &:hover {
      background: linear-gradient(90deg, #1C75BC 0%, #0D3656 100%) !important;
    }
  `}
`

export const MenuItemText = styled(ListItemText)`
  & .MuiTypography-root {
    font-family: 'Inter-Medium';
    font-weight: 500;
    font-size: 14px;
  }
`