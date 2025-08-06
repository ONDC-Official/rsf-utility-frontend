import { FC, useState, useCallback } from 'react'
import HeaderSection from 'pages/SettlementDashboard/HeaderSection'
import DashboardTable from 'pages/SettlementDashboard/DashboardTable'
import { ISettlementDashboardOrder } from 'interfaces/settlementDashboard'
import { generateSettlementDashboardData } from 'data/settlementDashboardData'
import { Container } from 'styles/pages/SettlementDashboard.styled'

const SettlementDashboard: FC = () => {
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [counterpartyId, setCounterpartyId] = useState('')
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set())

  const allOrders = generateSettlementDashboardData(256)
  const totalCount = allOrders.length
  const startIndex = (page - 1) * rowsPerPage
  const currentOrders = allOrders.slice(startIndex, startIndex + rowsPerPage)

  const handleCheckboxChange = useCallback((orderId: string, checked: boolean) => {
    setSelectedOrders((prev) => {
      const newSelectedOrders = new Set(prev)
      checked ? newSelectedOrders.add(orderId) : newSelectedOrders.delete(orderId)
      return newSelectedOrders
    })
  }, [])

  const handleSelectAll = useCallback((checked: boolean, currentPageItems: ISettlementDashboardOrder[]) => {
    setSelectedOrders((prev) => {
      const updated = new Set(prev)

      if (checked) {
        currentPageItems.forEach((item) => {
          updated.add(item.id)
        })
      } else {
        currentPageItems.forEach((item) => {
          updated.delete(item.id)
        })
      }

      return updated
    })
  }, [])

  const handlePageChange = (newPage: number) => setPage(newPage)

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage)
    setPage(1)
  }

  const handleCounterpartyChange = (value: string) => {
    setCounterpartyId(value)
    setSelectedOrders(new Set())
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
