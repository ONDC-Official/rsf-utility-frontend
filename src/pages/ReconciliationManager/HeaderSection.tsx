import { FC } from 'react'
import { RECONCILIATION_LABELS } from 'pages/ReconciliationManager/constants'
import { PageHeader as Container, Left, Right, PageTitle, PageSubtitle } from 'styles/pages/SettlementGenerator.styled'
import { ContainedExportButton } from 'styles/components/Button.styled'

const HeaderSection: FC = () => (
  <Container>
    <Left>
      <PageTitle>{RECONCILIATION_LABELS.TITLE}</PageTitle>
      <PageSubtitle>{RECONCILIATION_LABELS.SUBTITLE}</PageSubtitle>
    </Left>
    <Right>
      <ContainedExportButton variant="contained">{RECONCILIATION_LABELS.GENERATE_BUTTON}</ContainedExportButton>
    </Right>
  </Container>
)

export default HeaderSection
