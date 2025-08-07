import { FC } from 'react'
import { RECONCILIATION_LABELS } from 'pages/ReconciliationManager/constants'
import { IHeaderSectionProps } from 'pages/ReconciliationManager/types'
import { PageHeader as Container, Left, Right } from 'styles/pages/SettlementGenerator.styled'
import { ContainedExportButton } from 'styles/components/Button.styled'
import { Typography } from '@mui/material'
import { TypographyVariant } from 'enums/typography'

const HeaderSection: FC<IHeaderSectionProps> = ({ showGenerateButton = true }) => (
  <Container>
    <Left>
      <Typography variant={TypographyVariant.H4}>{RECONCILIATION_LABELS.TITLE}</Typography>
      <Typography variant={TypographyVariant.H6}>{RECONCILIATION_LABELS.SUBTITLE}</Typography>
    </Left>
    <Right>
      {showGenerateButton && (
        <ContainedExportButton variant="contained">{RECONCILIATION_LABELS.GENERATE_BUTTON}</ContainedExportButton>
      )}
    </Right>
  </Container>
)

export default HeaderSection
