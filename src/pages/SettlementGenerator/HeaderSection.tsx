import { FC } from 'react'
import { Warning } from '@mui/icons-material'
import {
  PageHeader,
  HeaderLeft,
  HeaderRight,
  PageTitle,
  PageSubtitle,
  AlertContainer,
} from 'styles/pages/SettlementGenerator.styled'

const HeaderSection: FC = () => (
  <PageHeader>
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
  </PageHeader>
)

export default HeaderSection
