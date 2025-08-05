import styled from 'styled-components'

export const LayoutContainer = styled.div`
  display: flex;
  gap: 20px;
  height: 100vh;
  padding: 20px;
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
  background: #0b3352;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const StyledText = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-style: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  vertical-align: middle;
  color: #ffffff;
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

  background: ${({ active }) => (active ? 'linear-gradient(90deg, #1C75BC 0%, #0D3656 100%)' : 'transparent')};
  color: #ffffff;
  opacity: 1;

  transition: background 0.3s ease;

  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;

  &:hover {
    background: ${({ active }) => (active ? 'linear-gradient(90deg, #1C75BC 0%, #0D3656 100%)' : '#1E4C7A')};
  }
`

export const Logout = styled.div`
  margin-top: auto;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #d3d3d3;
`

export const IconWrapper = styled.div``
