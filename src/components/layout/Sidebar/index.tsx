import React from 'react'
import { List, ListItem, ListItemIcon } from '@mui/material'
import {
  Settings,
  Assignment,
  CheckCircle,
  Dashboard,
  Assessment,
  AccountBalance,
  Receipt,
  Description,
  ExitToApp,
} from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  StyledDrawer,
  LogoContainer,
  LogoText,
  MenuList,
  LogoutContainer,
  StyledListItemButton,
  MenuItemText,
} from '@styles/layout/Sidebar.styled'

const menuItems = [
  { text: 'Configuration', icon: Settings, path: '/configuration' },
  { text: 'Orders In Progress', icon: Assignment, path: '/orders-progress' },
  { text: 'Orders Ready', icon: CheckCircle, path: '/orders-ready' },
  { text: 'Settlement Generator', icon: Dashboard, path: '/settlement-generator' },
  { text: 'Settlement Dashboard', icon: Assessment, path: '/settlement-dashboard' },
  { text: 'Reconciliation', icon: AccountBalance, path: '/reconciliation' },
  { text: 'Misc Settlements', icon: Receipt, path: '/misc-settlements' },
  { text: 'Nil Settlement', icon: Description, path: '/nil-settlement' },
]

const Sidebar: React.FC = () => {
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
        {menuItems.map((item) => {
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
