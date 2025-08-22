import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { menuItems } from 'components/layout/Sidebar/data'
import OndcLogo from 'assets/images/svg/OndcLogo'
import { StyledIcon, MenuContainer, MenuItem, SidebarContainer, StyledText } from 'styles/layout/Layout.styled'
import { useUserContext } from 'context/userContext'

const Sidebar: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { selectedUser } = useUserContext()

  const handleNavigation = (path: string): void => {
    navigate(path)
  }

  return (
    <SidebarContainer>
      <OndcLogo />

      <MenuContainer>
        {menuItems && menuItems.length > 0 ? (
          menuItems.map(({ text, icon, path, isUserRequired }) => {
            if (isUserRequired && !selectedUser) return null

            return (
              <MenuItem key={text} onClick={() => handleNavigation(path)} active={location.pathname === path}>
                <StyledIcon>{icon}</StyledIcon>
                <StyledText>{text}</StyledText>
              </MenuItem>
            )
          })
        ) : (
          <StyledText>No menu items available</StyledText>
        )}
      </MenuContainer>
    </SidebarContainer>
  )
}

export default Sidebar
