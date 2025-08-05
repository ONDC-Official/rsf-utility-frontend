import { FC } from 'react'
import { SelectChangeEvent } from '@mui/material'
import Switch from 'components/common/Switch'
import Select from 'components/common/Select'
import { counterpartyOptions } from 'pages/SettlementGenerator/data'
import { ModeSelectionProps } from '@pages/SettlementGenerator/types'
import {
  SettlementModeContainer,
  ModeContent,
  ModeTitle,
  ModeRow,
  ModeDescription,
  ModeRight,
  CounterpartyLabel,
} from 'styles/pages/SettlementGenerator.styled'

const ModeSelection: FC<ModeSelectionProps> = ({ isManualMode, onToggleMode, counterpartyId, setCounterpartyId }) => (
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
          !selected ? <span style={{ color: '#9CA3AF' }}>Choose...</span> : (selected as React.ReactNode)
        }
      />
    </ModeRight>
  </SettlementModeContainer>
)

export default ModeSelection
