import React from 'react'
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import {
  LayoutContainer,
  LayoutContentWrapper,
  FooterWrapper,
  FooterText,
  MainContent,
} from '../../../styles/layout/Layout.styled'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Sidebar />
      <LayoutContentWrapper>
        <Navbar />
        <MainContent>{children}</MainContent>
        <FooterWrapper>
          <FooterText>© ONDC 2025, All Rights Reserved.</FooterText>
        </FooterWrapper>
      </LayoutContentWrapper>
    </LayoutContainer>
  )
}

export default Layout
