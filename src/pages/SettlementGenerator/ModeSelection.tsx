import { FC, useEffect } from 'react'
import { SelectChangeEvent } from '@mui/material'
import Switch from 'components/common/Switch'
import Select from 'components/common/Select'
import RequiredFieldLabel from 'components/common/RequiredFieldLabel'
import { useUserContext } from 'context/userContext'
import { IModeSelectionProps } from './types'
import {
  SettlementModeContainer,
  ModeContent,
  ModeTitle,
  ModeRow,
  ModeDescription,
  ModeRight,
} from 'styles/pages/SettlementGenerator.styled'

const ModeSelection: FC<IModeSelectionProps> = ({ isManualMode, onToggleMode, counterpartyId, setCounterpartyId }) => {
  const { selectedUser } = useUserContext()

  const counterpartyOptions =
    selectedUser?.counterparty_ids.map((id) => ({
      value: id,
      label: id,
    })) || []

  // Auto-select first option when counterparty options change
  useEffect(() => {
    if (counterpartyOptions.length > 0 && !counterpartyId) {
      setCounterpartyId(counterpartyOptions[0].value)
    }
  }, [counterpartyOptions, counterpartyId, setCounterpartyId])

  // Reset selection when selected user changes to ensure sync
  useEffect(() => {
    if (counterpartyOptions.length > 0) {
      const currentIsValid = counterpartyOptions.some((option) => option.value === counterpartyId)
      if (!currentIsValid) {
        setCounterpartyId(counterpartyOptions[0].value)
      }
    }
  }, [selectedUser, counterpartyOptions, counterpartyId, setCounterpartyId])

  return (
    <SettlementModeContainer>
      <ModeContent>
        <ModeTitle>Settlement Mode</ModeTitle>
        <ModeRow>
          <Switch checked={isManualMode} onChange={(e) => onToggleMode(e.target.checked)} />
          <ModeDescription>Manual Mode Manually select orders for settlement</ModeDescription>
        </ModeRow>
      </ModeContent>

      <ModeRight>
        <RequiredFieldLabel>Counterparty ID</RequiredFieldLabel>
        <Select
          value={counterpartyId}
          onChange={(e: SelectChangeEvent<unknown>) => setCounterpartyId(e.target.value as string)}
          options={counterpartyOptions}
          size="small"
        />
      </ModeRight>
    </SettlementModeContainer>
  )
}

export default ModeSelection
