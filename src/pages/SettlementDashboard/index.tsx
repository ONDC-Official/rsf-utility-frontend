import { FC, useState } from 'react'
import HeaderSection from 'pages/SettlementDashboard/HeaderSection'
import DashboardTable from 'pages/SettlementDashboard/DashboardTable'
import { ISettlementDashboardOrder } from 'interfaces/settlementDashboard'
import { generateSettlementDashboardData } from 'data/settlementDashboardData'
import { usePaginatedSelectableData } from 'hooks/usePaginatedSelectableData'
import { Container } from 'styles/pages/SettlementDashboard.styled'

const SettlementDashboard: FC = () => {
  const allOrders = generateSettlementDashboardData(256)
  const {
    currentItems: currentOrders,
    selectedItems: selectedOrders,
    totalCount,
    page,
    rowsPerPage,
    handlePageChange,
    handleRowsPerPageChange,
    handleCheckboxChange,
    handleSelectAll,
    resetSelection,
    setPage,
  } = usePaginatedSelectableData<ISettlementDashboardOrder>(allOrders)

  const [counterpartyId, setCounterpartyId] = useState('')

  const handleCounterpartyChange = (value: string) => {
    setCounterpartyId(value)
    resetSelection()
    setPage(1)
  }

  return (
    <Container>
      <HeaderSection counterpartyId={counterpartyId} onCounterpartyChange={handleCounterpartyChange} />
      <DashboardTable
        orders={currentOrders}
        totalCount={totalCount}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        selectedOrders={selectedOrders}
        onCheckboxChange={handleCheckboxChange}
        onSelectAll={handleSelectAll}
      />
    </Container>
  )
}

export default SettlementDashboard
