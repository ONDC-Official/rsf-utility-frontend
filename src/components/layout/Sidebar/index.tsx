import { FC } from 'react'
import { ListItem } from '@mui/material'
import { ExitToApp } from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'
import { sidebarMenuItems } from 'components/layout/Sidebar/sidebarMenuItems'
import {
  StyledDrawer,
  LogoContainer,
  LogoText,
  MenuList,
  LogoutContainer,
  StyledListItemButton,
  MenuItemText,
  StyledListItemIcon,
} from 'styles/layout/Sidebar.styled'

const Sidebar: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavigation = (path: string) => {
    navigate(path)
  }

  const handleLogout = () => {
    // TODO: Implement logout functionality
  }

  return (
    <StyledDrawer variant="permanent" anchor="left">
      <LogoContainer>
        <LogoText>ONDC</LogoText>
      </LogoContainer>

      <MenuList>
        {sidebarMenuItems.map((item) => {
          const Icon = item.icon
          return (
            <ListItem key={item.text} disablePadding>
              <StyledListItemButton
                selected={location.pathname === item.path}
                onClick={() => handleNavigation(item.path)}
              >
                <StyledListItemIcon>
                  <Icon />
                </StyledListItemIcon>
                <MenuItemText primary={item.text} />
              </StyledListItemButton>
            </ListItem>
          )
        })}
      </MenuList>

      <LogoutContainer>
        <StyledListItemButton onClick={handleLogout}>
          <StyledListItemIcon>
            <ExitToApp />
          </StyledListItemIcon>
          <MenuItemText primary="Logout" />
        </StyledListItemButton>
      </LogoutContainer>
    </StyledDrawer>
  )
}

export default Sidebar
