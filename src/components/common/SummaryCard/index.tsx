import React from 'react'
import { SummaryCardContainer, SummaryCardLabel, SummaryCardValue } from '@styles/components/SummaryCard.styled'

interface SummaryCardProps {
  label: string
  value: string | number
  bgColor: string
}

const SummaryCard: React.FC<SummaryCardProps> = ({ label, value, bgColor }) => {
  return (
    <SummaryCardContainer $bgColor={bgColor}>
      <SummaryCardLabel>{label}</SummaryCardLabel>
      <SummaryCardValue>{value}</SummaryCardValue>
    </SummaryCardContainer>
  )
}

export default SummaryCard
