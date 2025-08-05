import { FC } from 'react'
import { Warning } from '@mui/icons-material'
import {
  PageHeader as Container,
  Left,
  Right,
  PageTitle,
  PageSubtitle,
  AlertContainer,
} from 'styles/pages/SettlementGenerator.styled'

const HeaderSection: FC = () => (
  <Container>
    <Left>
      <PageTitle>Settlement Generator</PageTitle>
      <PageSubtitle>Select orders to prepare for settlement</PageSubtitle>
    </Left>
    <Right>
      <AlertContainer>
        <Warning fontSize="small" />
        Settlement Window closes at 11:00 PM
      </AlertContainer>
    </Right>
  </Container>
)

export default HeaderSection
