import { FC } from 'react'
import { SelectChangeEvent } from '@mui/material'
import Select from 'components/common/Select'
import { counterpartyOptions } from 'pages/SettlementDashboard/data'
import { DASHBOARD_LABELS } from 'pages/SettlementDashboard/constants'
import {
  PageHeader as Container,
  Left,
  Right,
  PageTitle,
  PageSubtitle,
  CounterpartyLabel,
  PlaceholderText,
} from 'styles/pages/SettlementDashboard.styled'

interface IHeaderSectionProps {
  counterpartyId: string
  onCounterpartyChange: (value: string) => void
}

const HeaderSection: FC<IHeaderSectionProps> = ({ counterpartyId, onCounterpartyChange }) => {
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    onCounterpartyChange(event.target.value as string)
  }

  return (
    <Container>
      <Left>
        <PageTitle>{DASHBOARD_LABELS.TITLE}</PageTitle>
        <PageSubtitle>{DASHBOARD_LABELS.SUBTITLE}</PageSubtitle>
      </Left>
      <Right>
        <CounterpartyLabel>{DASHBOARD_LABELS.COUNTERPARTY_LABEL}</CounterpartyLabel>
        <Select
          value={counterpartyId}
          onChange={handleChange}
          options={counterpartyOptions}
          displayEmpty
          size="small"
          renderValue={(selected) =>
            !selected ? (
              <PlaceholderText>{DASHBOARD_LABELS.CHOOSE_PLACEHOLDER}</PlaceholderText>
            ) : (
              (selected as React.ReactNode)
            )
          }
        />
      </Right>
    </Container>
  )
}

export default HeaderSection
