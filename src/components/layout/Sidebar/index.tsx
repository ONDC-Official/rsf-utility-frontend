import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { menuItems } from './data'
import OndcLogo from 'assets/images/svg/OndcLogo'
import { StyledIcon, MenuContainer, MenuItem, SidebarContainer, StyledText } from 'styles/layout/Layout.styled'

const Sidebar: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavigation = (path: string): void => {
    navigate(path)
  }

  return (
    <SidebarContainer>
      <OndcLogo />

      <MenuContainer>
        {menuItems && menuItems.length > 0 ? (
          menuItems.map(({ text, icon, path }) => (
            <MenuItem key={text} onClick={() => handleNavigation(path)} active={location.pathname === path}>
              <StyledIcon>{icon}</StyledIcon>
              <StyledText>{text}</StyledText>
            </MenuItem>
          ))
        ) : (
          <StyledText>No menu items available</StyledText>
        )}
      </MenuContainer>
    </SidebarContainer>
  )
}

export default Sidebar
