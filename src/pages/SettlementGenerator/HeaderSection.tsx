import { FC, useEffect } from 'react'
import { Warning } from '@mui/icons-material'
import { PageHeader as Container, Left, Right, AlertContainer } from 'styles/pages/SettlementGenerator.styled'
import { Typography } from '@mui/material'
import { TypographyVariant } from 'enums/typography'
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

  // Auto-select first option when counterparty options change
  useEffect(() => {
    if (counterpartyOptions.length > 0 && !counterpartyId) {
      onCounterpartyChange(counterpartyOptions[0].value)
    }
  }, [counterpartyOptions, counterpartyId, onCounterpartyChange])

  // Reset selection when selected user changes to ensure sync
  useEffect(() => {
    if (counterpartyOptions.length > 0) {
      const currentIsValid = counterpartyOptions.some((option) => option.value === counterpartyId)
      if (!currentIsValid) {
        onCounterpartyChange(counterpartyOptions[0].value)
      }
    }
  }, [selectedUser, counterpartyOptions, counterpartyId, onCounterpartyChange])

  return (
    <Container>
      <Left>
        <Typography variant={TypographyVariant.H5Bold}>Settlement Generator</Typography>
        <Typography variant={TypographyVariant.Body1Regular}>Select orders to prepare for settlement</Typography>
      </Left>
      <Right>
        <AlertContainer>
          <Warning fontSize="small" />
          Settlement Window closes at 11:00 PM
        </AlertContainer>
      </Right>
    </Container>
  )
}

export default HeaderSection
