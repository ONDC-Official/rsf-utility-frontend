import { FC, useState } from 'react'
import HeaderSection from 'pages/SettlementDashboard/HeaderSection'
import DashboardTable from 'pages/SettlementDashboard/DashboardTable'
import { Container } from 'styles/pages/SettlementDashboard.styled'
import useGetUserSettlements from 'hooks/queries/useGetUserSettlements'
import { useUserContext } from 'context/userContext'
import { SettlementStatus } from 'enums/settlement'

export const SETTLEMENT_STATUSES_PAYLOAD: SettlementStatus[] = [
  SettlementStatus.PENDING,
  SettlementStatus.SETTLED,
  SettlementStatus.NOT_SETTLED,
]

const SettlementDashboard: FC = () => {
  const { selectedUser } = useUserContext()
  const [counterpartyId, setCounterpartyId] = useState('')

  const { data: fetchedSettlements } = useGetUserSettlements(
    selectedUser?._id || '',
    {
      page: 1,
      limit: 100,
      statuses: SETTLEMENT_STATUSES_PAYLOAD,
      counterpartyId,
    },
    {
      enabled: !!selectedUser?._id,
    },
  )

  const handleCounterpartyChange = (value: string): void => {
    setCounterpartyId(value)
  }

  return (
    <Container>
      <HeaderSection counterpartyId={counterpartyId} onCounterpartyChange={handleCounterpartyChange} />
      <DashboardTable orders={fetchedSettlements?.data?.settlements || []} counterpartyId={counterpartyId} />
    </Container>
  )
}

export default SettlementDashboard
