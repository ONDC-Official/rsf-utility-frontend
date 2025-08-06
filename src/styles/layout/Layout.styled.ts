import styled from 'styled-components'
import colors from '../../theme/colors'
import { typography } from '../../theme/typography'

export const LayoutContainer = styled.div`
  display: flex;
  gap: 20px;
  height: 100vh;
  padding: 20px;
`

export const LayoutContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const FooterWrapper = styled.footer`
  display: flex;
  justify-content: center;
  padding: 16px 0;
`

export const FooterText = styled.p`
  font-size: 14px;
  color: ${colors.text.secondary};
  font-family: ${typography.body1_regular.fontFamily};
`

export const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
`

export const SidebarContainer = styled.div`
  width: 300px;
  height: 97vh;
  border-radius: 20px;
  padding: 30px 0;
  background: ${colors.primary.main};
  color: ${colors.primary.contrastText};
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const StyledText = styled.div`
  font-family: ${typography.body2_medium.fontFamily};
  font-weight: 500;
  font-style: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  vertical-align: middle;
  color: ${colors.primary.contrastText};
`

export const Logo = styled.img`
  margin-bottom: 40px;
  width: 113px;
`

export const MenuContainer = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 40px;
`

export const MenuItem = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border-radius: 100px;
  cursor: pointer;

  background: ${({ active }) =>
    active ? `linear-gradient(90deg, ${colors.primary.light} 0%, ${colors.primary.dark} 100%)` : 'transparent'};
  color: ${colors.primary.contrastText};
  opacity: 1;

  transition: background 0.3s ease;

  font-family: ${typography.body2_medium.fontFamily};
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;

  &:hover {
    background: ${({ active }) =>
      active ? `linear-gradient(90deg, ${colors.primary.light} 0%, ${colors.primary.dark} 100%)` : colors.primary.dark};
  }
`

export const Logout = styled.div`
  margin-top: auto;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${colors.text.disabled};
`

export const IconWrapper = styled.div``
