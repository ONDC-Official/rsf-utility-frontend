import React from 'react'
import Sidebar from '@components/layout/Sidebar'
import Navbar from '@components/layout/Navbar'
import { LayoutContainer, MainContent, ContentArea, Footer } from '@styles/layout/Layout.styled'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Sidebar />
      <Navbar />
      <MainContent>
        <ContentArea>{children}</ContentArea>
        <Footer>© ONDC 2025, All Rights Reserved.</Footer>
      </MainContent>
    </LayoutContainer>
  )
}

export default Layout
