import { FC } from 'react'
import { SelectChangeEvent, Typography } from '@mui/material'
import Select from 'components/common/Select'
import { counterpartyOptions } from 'pages/SettlementDashboard/data'
import { DASHBOARD_LABELS } from 'pages/SettlementDashboard/constants'
import { IHeaderSectionProps } from 'pages/SettlementDashboard/types'
import {
  PageHeader as Container,
  Left,
  Right,
  CounterpartyLabel,
  PlaceholderText,
} from 'styles/pages/SettlementDashboard.styled'
import { TypographyVariant } from 'enums/typography'

const HeaderSection: FC<IHeaderSectionProps> = ({ counterpartyId, onCounterpartyChange }) => {
  const handleChange = (event: SelectChangeEvent<unknown>): void => {
    onCounterpartyChange(event.target.value as string)
  }

  return (
    <Container>
      <Left>
        <Typography variant={TypographyVariant.H4}>{DASHBOARD_LABELS.TITLE}</Typography>
        <Typography variant={TypographyVariant.H6}>{DASHBOARD_LABELS.SUBTITLE}</Typography>
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
