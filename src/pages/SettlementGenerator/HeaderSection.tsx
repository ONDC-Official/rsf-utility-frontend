import { FC } from 'react'
import { Warning } from '@mui/icons-material'
import { PageHeader as Container, Left, Right, AlertContainer } from 'styles/pages/SettlementGenerator.styled'
import { Typography } from '@mui/material'
import { TypographyVariant } from 'enums/typography'
import Select from 'components/common/Select'
import { useUserContext } from 'context/userContext'

interface HeaderSectionProps {
  counterpartyId: string
  onCounterpartyChange: (counterpartyId: string) => void
}

const HeaderSection: FC<HeaderSectionProps> = ({ counterpartyId, onCounterpartyChange }) => {
  const { selectedUser } = useUserContext()

  const counterpartyOptions =
    selectedUser?.counterparty_ids.map((id) => ({
      value: id,
      label: id,
    })) || []

  return (
  <Container>
    <Left>
      <Typography variant={TypographyVariant.H4}>Settlement Generator</Typography>
      <Typography variant={TypographyVariant.H6}>Select orders to prepare for settlement</Typography>
    </Left>
    <Right>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Typography variant={TypographyVariant.Body2Semibold}>Counterparty ID *</Typography>
          <Select
            value={counterpartyId}
            onChange={(e) => onCounterpartyChange(e.target.value as string)}
            options={counterpartyOptions}
            size="small"
            displayEmpty
            renderValue={(value) => (value as string) || 'Choose'}
            style={{ minWidth: '150px' }}
          />
        </div>
        <AlertContainer>
          <Warning fontSize="small" />
          Settlement Window closes at 11:00 PM
        </AlertContainer>
      </div>
    </Right>
  </Container>
  )
}

export default HeaderSection
