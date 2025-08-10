import { FC } from 'react'
import { Box, Typography } from '@mui/material'
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
    selectedUser?.counterparty_ids.map((id) => ({
      value: id,
      label: id,
    })) || []

  const getButtonText = (): string => {
    if (prepareButtonState === PrepareButtonState.DISABLED) return ORDER_HEADER_LABELS.prepareZero
    return ORDER_HEADER_LABELS.prepareWithCount(selectedCount)
  }

  return (
    <Container>
      <HeaderLeft>
        <Typography variant={TypographyVariant.H4}>{ORDER_HEADER_LABELS.title}</Typography>
        <Typography variant={TypographyVariant.H6}>{ORDER_HEADER_LABELS.subtitle}</Typography>
      </HeaderLeft>
      <HeaderRight>
        <Typography variant={TypographyVariant.H6Bold}>{ORDER_HEADER_LABELS.receiverLabel}</Typography>
        <Select 
          value={receiverId} 
          onChange={handleReceiverChange} 
          options={counterpartyOptions} 
          size="small" 
          displayEmpty
          renderValue={(value) => (value as string) || 'Choose'}
        />
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
