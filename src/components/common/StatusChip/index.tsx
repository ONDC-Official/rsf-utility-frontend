import React from 'react'
import { IStatusChipProps } from 'components/common/StatusChip/types'
import { Container } from 'styles/components/StatusChip.styled'
import { formatSettlementStatus } from 'utils/helpers'

const StatusChip: React.FC<IStatusChipProps> = ({ status }) => (
  <Container status={status}>{formatSettlementStatus(status)}</Container>
)

export default StatusChip
