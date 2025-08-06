import React from 'react'
import { IStatusChipProps } from 'components/common/StatusChip/types'
import { Container } from 'styles/components/StatusChip.styled'

const StatusChip: React.FC<IStatusChipProps> = ({ status }) => <Container status={status}>{status}</Container>

export default StatusChip
