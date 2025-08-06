import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { menuItems } from './data'
import OndcLogo from 'assets/images/svg/OndcLogo'
import { StyledIcon, MenuContainer, MenuItem, SidebarContainer, StyledText } from 'styles/layout/Layout.styled'

const Sidebar: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavigation = (path: string) => {
    navigate(path)
  }

  return (
    <SidebarContainer>
      <OndcLogo />

      <MenuContainer>
        {menuItems.map(({ text, icon, path }) => (
          <MenuItem key={text} onClick={() => handleNavigation(path)} active={location.pathname === path}>
            <StyledIcon>{icon}</StyledIcon>
            <StyledText>{text}</StyledText>
          </MenuItem>
        ))}
      </MenuContainer>
    </SidebarContainer>
  )
}

export default Sidebar
