import { FC, useEffect } from 'react'
import { Box, Typography, SelectChangeEvent } from '@mui/material'
import Select from 'components/common/Select'
import { IOrdersReadyHeaderProps } from 'pages/OrdersReady/types'
import { ORDER_HEADER_LABELS, PrepareButtonState } from 'pages/OrdersReady/constants'
import { PrepareButton } from 'styles/components/PrepareButton.styled'
import { PageHeader as Container, HeaderLeft, HeaderRight } from 'styles/pages/OrdersReady.styled'
import { TypographyVariant } from 'enums/typography'
import { useUserContext } from 'context/userContext'

const OrdersReadyHeader: FC<IOrdersReadyHeaderProps> = ({
  receiverId,
  // receiverOptions,
  selectedCount,
  prepareButtonState,
  handleReceiverChange,
  handlePrepareClick,
}) => {
  const { selectedUser } = useUserContext()

  const counterpartyOptions =
    selectedUser?.counterparty_infos?.map((info) => ({
      value: info.id,
      label: info.nickName,
    })) || []

  // Auto-select first option when counterparty options change and no receiver is selected
  useEffect(() => {
    if (counterpartyOptions.length > 0 && !receiverId) {
      const event = { target: { value: counterpartyOptions[0].value } } as SelectChangeEvent<unknown>
      handleReceiverChange(event)
    }
  }, [counterpartyOptions, receiverId, handleReceiverChange])

  // Reset selection when selected user changes to ensure sync
  useEffect(() => {
    if (counterpartyOptions.length > 0) {
      const currentIsValid = counterpartyOptions.some((option) => option.value === receiverId)
      if (!currentIsValid) {
        const event = { target: { value: counterpartyOptions[0].value } } as SelectChangeEvent<unknown>
        handleReceiverChange(event)
      }
    }
  }, [selectedUser, counterpartyOptions, receiverId, handleReceiverChange])

  const getButtonText = (): string => {
    if (prepareButtonState === PrepareButtonState.DISABLED) return ORDER_HEADER_LABELS.prepareZero
    return ORDER_HEADER_LABELS.prepareWithCount(selectedCount)
  }

  return (
    <Container>
      <HeaderLeft>
        <Typography variant={TypographyVariant.Body1Regular}>{ORDER_HEADER_LABELS.subtitle}</Typography>
      </HeaderLeft>
      <HeaderRight>
        <Typography variant={TypographyVariant.Body1Medium}>{ORDER_HEADER_LABELS.receiverLabel}</Typography>
        <Select value={receiverId} onChange={handleReceiverChange} options={counterpartyOptions} size="small" />
        <Box>
          <PrepareButton
            variant="outlined"
            onClick={handlePrepareClick}
            disabled={prepareButtonState === PrepareButtonState.DISABLED}
            isDisabled={prepareButtonState === PrepareButtonState.DISABLED}
            isActive={prepareButtonState !== PrepareButtonState.DISABLED}
          >
            {getButtonText()}
          </PrepareButton>
        </Box>
      </HeaderRight>
    </Container>
  )
}

export default OrdersReadyHeader
