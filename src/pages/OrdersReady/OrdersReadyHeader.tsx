import { FC } from 'react'
import { Box } from '@mui/material'
import { SelectChangeEvent } from '@mui/material'
import Select from '@components/common/Select'
import { PrepareButton } from '@styles/components/PrepareButton.styled'
import {
  ReceiverLabel,
  PageHeader,
  HeaderLeft,
  HeaderRight,
  PageTitle,
  PageSubtitle,
} from '@styles/pages/OrdersReady.styled'

interface OrdersReadyHeaderProps {
  receiverId: string
  selectedCount: number
  prepareButtonState: 'disabled' | 'prepare' | 'generate'
  handleReceiverChange: (e: SelectChangeEvent<unknown>) => void
  handlePrepareClick: () => void
}

const OrdersReadyHeader: FC<OrdersReadyHeaderProps> = ({
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
    <PageHeader>
      <HeaderLeft>
        <PageTitle>Orders Ready</PageTitle>
        <PageSubtitle>Select orders to prepare for settlement</PageSubtitle>
      </HeaderLeft>
      <HeaderRight>
        <ReceiverLabel>Receiver ID</ReceiverLabel>
        <Select
          value={receiverId}
          onChange={handleReceiverChange}
          options={[
            { value: 'BPP_001', label: 'BPP_001' },
            { value: 'BPP_002', label: 'BPP_002' },
            { value: 'BPP_003', label: 'BPP_003' },
          ]}
          size="small"
        />
        <Box>
          <PrepareButton
            variant="outlined"
            onClick={handlePrepareClick}
            disabled={prepareButtonState === 'disabled'}
            $isDisabled={prepareButtonState === 'disabled'}
            $isActive={prepareButtonState !== 'disabled'}
          >
            {getButtonText()}
          </PrepareButton>
        </Box>
      </HeaderRight>
    </PageHeader>
  )
}

export default OrdersReadyHeader
