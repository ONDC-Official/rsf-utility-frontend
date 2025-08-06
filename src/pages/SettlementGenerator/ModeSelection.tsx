import { FC } from 'react'
import { SelectChangeEvent } from '@mui/material'
import Switch from 'components/common/Switch'
import Select from 'components/common/Select'
import { counterpartyOptions } from 'pages/SettlementGenerator/data'
import { IModeSelectionProps } from './types'
import {
  SettlementModeContainer,
  ModeContent,
  ModeTitle,
  ModeRow,
  ModeDescription,
  ModeRight,
  CounterpartyLabel,
  PlaceholderText,
} from 'styles/pages/SettlementGenerator.styled'

const ModeSelection: FC<IModeSelectionProps> = ({ isManualMode, onToggleMode, counterpartyId, setCounterpartyId }) => (
  <SettlementModeContainer>
    <ModeContent>
      <ModeTitle>Settlement Mode</ModeTitle>
      <ModeRow>
        <Switch checked={isManualMode} onChange={(e) => onToggleMode(e.target.checked)} />
        <ModeDescription>Manual Mode Manually select orders for settlement</ModeDescription>
      </ModeRow>
    </ModeContent>

    <ModeRight>
      <CounterpartyLabel>Counterparty ID</CounterpartyLabel>
      <Select
        value={counterpartyId}
        onChange={(e: SelectChangeEvent<unknown>) => setCounterpartyId(e.target.value as string)}
        options={counterpartyOptions}
        displayEmpty
        size="small"
        renderValue={(selected) =>
          !selected ? <PlaceholderText>Choose...</PlaceholderText> : (selected as React.ReactNode)
        }
      />
    </ModeRight>
  </SettlementModeContainer>
)

export default ModeSelection
