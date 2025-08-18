import { FC, useState } from 'react'
import HeaderSection from 'pages/SettlementDashboard/HeaderSection'
import DashboardTable from 'pages/SettlementDashboard/DashboardTable'
import { Container } from 'styles/pages/SettlementDashboard.styled'
import useGetUserSettlements from 'hooks/queries/useGetUserSettlements'
import { useUserContext } from 'context/userContext'
import { SettlementStatus } from 'enums/settlement'
import { IDateRange } from 'components/common/DateRangePickerButton/types'

export const SETTLEMENT_STATUSES_PAYLOAD: SettlementStatus[] = [
  SettlementStatus.PENDING,
  SettlementStatus.SETTLED,
  SettlementStatus.NOT_SETTLED,
]

const SettlementDashboard: FC = () => {
  const { selectedUser } = useUserContext()
  const [counterpartyId, setCounterpartyId] = useState('')
  const [dateRange, setDateRange] = useState<IDateRange>({ startDate: null, endDate: null })

  const { data: fetchedSettlements } = useGetUserSettlements(
    selectedUser?._id || '',
    {
      page: 1,
      limit: 100,
      statuses: SETTLEMENT_STATUSES_PAYLOAD,
      counterpartyId,
      dueDateFrom: dateRange.startDate ? dateRange.startDate.toISOString().split('T')[0] : undefined,
      dueDateTo: dateRange.endDate ? dateRange.endDate.toISOString().split('T')[0] : undefined,
    },
    {
      enabled: !!selectedUser?._id,
    },
  )

  const handleCounterpartyChange = (value: string): void => {
    setCounterpartyId(value)
  }

  const handleDateRangeChange = (newDateRange: IDateRange): void => {
    setDateRange(newDateRange)
  }

  const counterpartyInfos = selectedUser?.counterparty_infos || []

  return (
    <Container>
      <HeaderSection counterpartyId={counterpartyId} onCounterpartyChange={handleCounterpartyChange} />
      <DashboardTable
        orders={
          fetchedSettlements?.data?.settlements?.map((settlement) => ({
            ...settlement,
            collector_id:
              counterpartyInfos.find((info) => info.id === settlement.collector_id)?.nickName ||
              settlement.collector_id,
            receiver_id:
              counterpartyInfos.find((info) => info.id === settlement.receiver_id)?.nickName || settlement.receiver_id,
          })) || []
        }
        counterpartyId={counterpartyId}
        onDateRangeChange={handleDateRangeChange}
        dateRange={dateRange}
      />
    </Container>
  )
}

export default SettlementDashboard
