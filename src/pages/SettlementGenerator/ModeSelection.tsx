import { FC, useEffect } from 'react'
import { SelectChangeEvent, Typography } from '@mui/material'
import Switch from 'components/common/Switch'
import Select from 'components/common/Select'
import { useUserContext } from 'context/userContext'
import { IModeSelectionProps } from 'pages/SettlementGenerator/types'
import { SettlementModeContainer, ModeContent, ModeRow, ModeRight } from 'styles/pages/SettlementGenerator.styled'
import { TypographyVariant } from 'enums/typography'

const ModeSelection: FC<IModeSelectionProps> = ({ isManualMode, onToggleMode, counterpartyId, setCounterpartyId }) => {
  const { selectedUser } = useUserContext()

  const counterpartyOptions =
    selectedUser?.counterparty_infos?.map((info) => ({
      value: info.id,
      label: info.nickName,
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
        <Typography variant={TypographyVariant.H6Bold}>Settlement Mode</Typography>
        <ModeRow>
          <Switch checked={isManualMode} onChange={(e) => onToggleMode(e.target.checked)} />
          <Typography variant={TypographyVariant.Body1Regular}>
            Manual Mode Manually select orders for settlement
          </Typography>
        </ModeRow>
      </ModeContent>

      <ModeRight>
        <Typography variant={TypographyVariant.Body1Medium}>Counterparty</Typography>
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
