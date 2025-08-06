import React from 'react'
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import { LayoutContainer, MainContent } from '../../../styles/layout/Layout.styled'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <MainContent>{children}</MainContent>
      </div>
    </LayoutContainer>
  )
}

export default Layout
