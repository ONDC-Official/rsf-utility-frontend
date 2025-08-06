import { FC, useState, useCallback } from 'react'
import HeaderSection from 'pages/SettlementGenerator/HeaderSection'
import ModeSelection from 'pages/SettlementGenerator/ModeSelection'
import OrderTable from 'pages/SettlementGenerator/OrderTable'
import SummarySection from 'pages/SettlementGenerator/SummarySection'
import PayloadPreview from 'pages/SettlementGenerator/PayloadPreview'
import { ISettlementSummary, ISettlementOrder } from 'interfaces/settlementGenerator'
import { generateSettlementOrdersData, generatePayloadData } from 'data/settlementGeneratorData'
import { Container } from 'styles/pages/SettlementGenerator.styled'

const SettlementGenerator: FC = () => {
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [counterpartyId, setCounterpartyId] = useState('')
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set())
  const [isManualMode, setIsManualMode] = useState(true)
  const [customDueDate, setCustomDueDate] = useState('')
  const [showPayloadPreview, setShowPayloadPreview] = useState(false)

  const allOrders = generateSettlementOrdersData(256)
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

  const handleSelectAll = useCallback((checked: boolean, currentPageItems: ISettlementOrder[]) => {
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

  const calculateSummary = (): ISettlementSummary => {
    const selectedList = Array.from(selectedOrders)
    const selectedData = allOrders.filter((order) => selectedList.includes(order.id))
    const totalAmount = selectedData.reduce((sum, order) => sum + order.interNpSettlement, 0)

    return {
      selectedOrders: selectedOrders.size,
      totalAmount,
      batchSize: '1 batch',
    }
  }

  const summary = calculateSummary()
  const payloadData = generatePayloadData(Array.from(selectedOrders), summary.totalAmount)

  return (
    <Container>
      <HeaderSection />
      <ModeSelection
        isManualMode={isManualMode}
        onToggleMode={setIsManualMode}
        counterpartyId={counterpartyId}
        setCounterpartyId={setCounterpartyId}
      />
      <OrderTable
        orders={currentOrders}
        columnsCount={totalCount}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        selectedOrders={selectedOrders}
        onCheckboxChange={handleCheckboxChange}
        onSelectAll={handleSelectAll}
      />
      {selectedOrders.size > 0 && (
        <SummarySection
          summary={summary}
          customDueDate={customDueDate}
          setCustomDueDate={setCustomDueDate}
          onGeneratePreview={() => setShowPayloadPreview(true)}
        />
      )}
      {showPayloadPreview && <PayloadPreview data={payloadData} />}
    </Container>
  )
}

export default SettlementGenerator
