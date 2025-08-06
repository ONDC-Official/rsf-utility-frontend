import { FC } from 'react'
import { Box } from '@mui/material'
import Select from 'components/common/Select'
import { IOrdersReadyHeaderProps } from 'pages/OrdersReady/types'
import { RECEIVER_OPTIONS } from 'pages/OrdersReady/data'
import { ORDER_HEADER_LABELS, PrepareButtonState } from 'pages/OrdersReady/constants'
import { PrepareButton } from 'styles/components/PrepareButton.styled'
import {
  ReceiverLabel,
  PageHeader as Container,
  HeaderLeft,
  HeaderRight,
  PageTitle,
  PageSubtitle,
} from 'styles/pages/OrdersReady.styled'

const OrdersReadyHeader: FC<IOrdersReadyHeaderProps> = ({
  receiverId,
  selectedCount,
  prepareButtonState,
  handleReceiverChange,
  handlePrepareClick,
}) => {
  const getButtonText = () => {
    if (prepareButtonState === PrepareButtonState.DISABLED) return ORDER_HEADER_LABELS.prepareZero
    if (prepareButtonState === PrepareButtonState.PREPARE) return ORDER_HEADER_LABELS.prepareWithCount(selectedCount)
    return ORDER_HEADER_LABELS.generateWithCount(selectedCount)
  }

  return (
    <Container>
      <HeaderLeft>
        <PageTitle>{ORDER_HEADER_LABELS.title}</PageTitle>
        <PageSubtitle>{ORDER_HEADER_LABELS.subtitle}</PageSubtitle>
      </HeaderLeft>
      <HeaderRight>
        <ReceiverLabel>{ORDER_HEADER_LABELS.receiverLabel}</ReceiverLabel>
        <Select value={receiverId} onChange={handleReceiverChange} options={RECEIVER_OPTIONS} size="small" />
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
