import { FC, useState } from 'react'
import HeaderSection from 'pages/SettlementDashboard/HeaderSection'
import DashboardTable from 'pages/SettlementDashboard/DashboardTable'
import { generateSettlementDashboardData } from 'data/settlementDashboardData'
import { Container } from 'styles/pages/SettlementDashboard.styled'

const SettlementDashboard: FC = () => {
  const [counterpartyId, setCounterpartyId] = useState('')
  const allOrders = generateSettlementDashboardData(256)

  const handleCounterpartyChange = (value: string) => {
    setCounterpartyId(value)
  }

  return (
    <Container>
      <HeaderSection counterpartyId={counterpartyId} onCounterpartyChange={handleCounterpartyChange} />
      <DashboardTable orders={allOrders} />
    </Container>
  )
}

export default SettlementDashboard
