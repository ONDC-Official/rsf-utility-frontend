import { FC } from 'react'
import Sidebar from 'components/layout/Sidebar'
import Navbar from 'components/layout/Navbar'
import { ILayoutProps } from 'components/layout/Layout/types'
import { Container, Wrapper, ContentArea, Footer } from 'styles/layout/Layout.styled'

const Layout: FC<ILayoutProps> = ({ children }) => (
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
