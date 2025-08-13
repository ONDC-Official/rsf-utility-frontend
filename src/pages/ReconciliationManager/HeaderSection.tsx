import { FC } from 'react'
import { RECONCILIATION_LABELS } from 'pages/ReconciliationManager/constants'
import { IHeaderSectionProps } from 'pages/ReconciliationManager/types'
import { PageHeader as Container, Left, Right } from 'styles/pages/SettlementGenerator.styled'
import { Typography } from '@mui/material'
import { TypographyVariant } from 'enums/typography'
import Button from 'components/common/Button'

const HeaderSection: FC<IHeaderSectionProps> = ({
  showGenerateButton = true,
  isGenerateButtonDisabled = false,
  onGenerateClick,
}) => (
  <Container>
    <Left>
      <Typography variant={TypographyVariant.Body1Regular}>{RECONCILIATION_LABELS.SUBTITLE}</Typography>
    </Left>
    <Right>
      {showGenerateButton && (
        <Button variant="contained" disabled={isGenerateButtonDisabled} onClick={onGenerateClick}>
          {RECONCILIATION_LABELS.GENERATE_BUTTON}
        </Button>
      )}
    </Right>
  </Container>
)

export default HeaderSection
