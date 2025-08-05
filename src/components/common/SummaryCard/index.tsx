import React from 'react'
import { ISummaryCardProps } from 'components/common/SummaryCard/types'
import { Container, SummaryCardLabel, SummaryCardValue } from 'styles/components/SummaryCard.styled'

const SummaryCard: React.FC<ISummaryCardProps> = ({ label, value, bgColor }) => (
  <Container bgColor={bgColor}>
    <SummaryCardLabel>{label}</SummaryCardLabel>
    <SummaryCardValue>{value}</SummaryCardValue>
  </Container>
)

export default SummaryCard
