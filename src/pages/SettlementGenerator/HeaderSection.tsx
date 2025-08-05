import { FC } from 'react'
import { Warning } from '@mui/icons-material'
import {
  PageHeader as Container,
  HeaderLeft,
  HeaderRight,
  PageTitle,
  PageSubtitle,
  AlertContainer,
} from 'styles/pages/SettlementGenerator.styled'

const HeaderSection: FC = () => (
  <Container>
    <HeaderLeft>
      <PageTitle>Settlement Generator</PageTitle>
      <PageSubtitle>Select orders to prepare for settlement</PageSubtitle>
    </HeaderLeft>
    <HeaderRight>
      <AlertContainer>
        <Warning fontSize="small" />
        Settlement Window closes at 11:00 PM
      </AlertContainer>
    </HeaderRight>
  </Container>
)

export default HeaderSection
