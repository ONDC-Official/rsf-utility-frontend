import { FC } from 'react'
import { ListItem, ListItemIcon } from '@mui/material'
import { ExitToApp } from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'
import { sidebarMenuItems } from '@components/layout/Sidebar/sidebarMenuItems'
import {
  StyledDrawer,
  LogoContainer,
  LogoText,
  MenuList,
  LogoutContainer,
  StyledListItemButton,
  MenuItemText,
} from '@styles/layout/Sidebar.styled'

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
                <ListItemIcon style={{ color: 'inherit', minWidth: 40 }}>
                  <Icon />
                </ListItemIcon>
                <MenuItemText primary={item.text} />
              </StyledListItemButton>
            </ListItem>
          )
        })}
      </MenuList>

      <LogoutContainer>
        <StyledListItemButton onClick={handleLogout}>
          <ListItemIcon style={{ color: 'inherit', minWidth: 40 }}>
            <ExitToApp />
          </ListItemIcon>
          <MenuItemText primary="Logout" />
        </StyledListItemButton>
      </LogoutContainer>
    </StyledDrawer>
  )
}

export default Sidebar
