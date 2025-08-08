import { FC } from 'react'
import { Box, Typography } from '@mui/material'
import Select from 'components/common/Select'
import { IOrdersReadyHeaderProps } from 'pages/OrdersReady/types'
import { RECEIVER_OPTIONS } from 'pages/OrdersReady/data'
import { ORDER_HEADER_LABELS, PrepareButtonState } from 'pages/OrdersReady/constants'
import { PrepareButton } from 'styles/components/PrepareButton.styled'
import { PageHeader as Container, HeaderLeft, HeaderRight } from 'styles/pages/OrdersReady.styled'
import { TypographyVariant } from 'enums/typography'

const OrdersReadyHeader: FC<IOrdersReadyHeaderProps> = ({
  receiverId,
  selectedCount,
  prepareButtonState,
  handleReceiverChange,
  handlePrepareClick,
}) => {
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
