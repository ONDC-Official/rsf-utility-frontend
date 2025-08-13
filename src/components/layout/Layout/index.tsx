import { FC } from 'react'
import Sidebar from 'components/layout/Sidebar'
import Navbar from 'components/layout/Navbar'
import { ILayoutProps } from 'components/layout/Layout/types'
import { Container, Wrapper, Footer, FooterText, Content } from 'styles/layout/Layout.styled'

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <Container>
      <Sidebar />
      <Wrapper>
        <Navbar />
        <Content>
          {children}
          <Footer>
            <FooterText>© ONDC 2025, All Rights Reserved.</FooterText>
          </Footer>
        </Content>
      </Wrapper>
    </Container>
  )
}

export default Layout
