import { FC } from 'react'
import { Box } from '@mui/material'
import Select from 'components/common/Select'
import { IOrdersReadyHeaderProps } from 'pages/OrdersReady/types'
import { RECEIVER_OPTIONS } from 'pages/OrdersReady/data'
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
    if (prepareButtonState === 'disabled') return 'Prepare (0 selected)'
    if (prepareButtonState === 'prepare') return `Prepare (${selectedCount} selected)`
    return `Generate (${selectedCount} selected)`
  }

  return (
    <Container>
      <HeaderLeft>
        <PageTitle>Orders Ready</PageTitle>
        <PageSubtitle>Select orders to prepare for settlement</PageSubtitle>
      </HeaderLeft>
      <HeaderRight>
        <ReceiverLabel>Receiver ID</ReceiverLabel>
        <Select value={receiverId} onChange={handleReceiverChange} options={RECEIVER_OPTIONS} size="small" />
        <Box>
          <PrepareButton
            variant="outlined"
            onClick={handlePrepareClick}
            disabled={prepareButtonState === 'disabled'}
            isDisabled={prepareButtonState === 'disabled'}
            isActive={prepareButtonState !== 'disabled'}
          >
            {getButtonText()}
          </PrepareButton>
        </Box>
      </HeaderRight>
    </Container>
  )
}

export default OrdersReadyHeader
