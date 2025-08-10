import { FC, useEffect } from 'react'
import { SelectChangeEvent, Typography } from '@mui/material'
import Select from 'components/common/Select'
import RequiredFieldLabel from 'components/common/RequiredFieldLabel'
import { DASHBOARD_LABELS } from 'pages/SettlementDashboard/constants'
import { IHeaderSectionProps } from 'pages/SettlementDashboard/types'
import { PageHeader as Container, Left, Right } from 'styles/pages/SettlementDashboard.styled'
import { TypographyVariant } from 'enums/typography'
import { useUserContext } from 'context/userContext'

const HeaderSection: FC<IHeaderSectionProps> = ({ counterpartyId, onCounterpartyChange }) => {
  const { selectedUser } = useUserContext()
  const handleChange = (event: SelectChangeEvent<unknown>): void => {
    onCounterpartyChange(event.target.value as string)
  }

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
        <Typography variant={TypographyVariant.H4}>{DASHBOARD_LABELS.TITLE}</Typography>
        <Typography variant={TypographyVariant.H6}>{DASHBOARD_LABELS.SUBTITLE}</Typography>
      </Left>
      <Right>
        <RequiredFieldLabel variant={TypographyVariant.Body1Medium}>
          {DASHBOARD_LABELS.COUNTERPARTY_LABEL}
        </RequiredFieldLabel>
        <Select value={counterpartyId} onChange={handleChange} options={counterpartyOptions} size="small" />
      </Right>
    </Container>
  )
}

export default HeaderSection
