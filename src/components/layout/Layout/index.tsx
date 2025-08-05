import { FC } from 'react'
import Sidebar from 'components/layout/Sidebar'
import Navbar from 'components/layout/Navbar'
import { LayoutProps } from 'components/layout/Layout/types'
import { Container, Wrapper, ContentArea, Footer } from 'styles/layout/Layout.styled'

const Layout: FC<LayoutProps> = ({ children }) => (
  <Container>
    <Sidebar />
    <Navbar />
    <Wrapper>
      <ContentArea>{children}</ContentArea>
      <Footer>© ONDC 2025, All Rights Reserved.</Footer>
    </Wrapper>
  </Container>
)

export default Layout
