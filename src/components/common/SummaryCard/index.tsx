import React from 'react'
import { SummaryCardProps } from '@components/common/SummaryCard/types'
import { SummaryCardContainer, SummaryCardLabel, SummaryCardValue } from '@styles/components/SummaryCard.styled'

const SummaryCard: React.FC<SummaryCardProps> = ({ label, value, bgColor }) => (
  <SummaryCardContainer $bgColor={bgColor}>
    <SummaryCardLabel>{label}</SummaryCardLabel>
    <SummaryCardValue>{value}</SummaryCardValue>
  </SummaryCardContainer>
)

export default SummaryCard
