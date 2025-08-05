import React from 'react'
import { SummaryCardProps } from 'components/common/SummaryCard/types'
import { Container, SummaryCardLabel, SummaryCardValue } from 'styles/components/SummaryCard.styled'

const SummaryCard: React.FC<SummaryCardProps> = ({ label, value, bgColor }) => (
  <Container $bgColor={bgColor}>
    <SummaryCardLabel>{label}</SummaryCardLabel>
    <SummaryCardValue>{value}</SummaryCardValue>
  </Container>
)

export default SummaryCard
