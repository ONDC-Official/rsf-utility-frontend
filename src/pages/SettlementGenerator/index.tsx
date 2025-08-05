import { FC, useState } from 'react'
import HeaderSection from '@pages/SettlementGenerator/HeaderSection'
import ModeSelection from '@pages/SettlementGenerator/ModeSelection'
import OrderTable from '@pages/SettlementGenerator/OrderTable'
import SummarySection from '@pages/SettlementGenerator/SummarySection'
import PayloadPreview from '@pages/SettlementGenerator/PayloadPreview'
import { ISettlementSummary } from '@interfaces/settlementGenerator'
import { generateSettlementOrdersData, generatePayloadData } from '@data/settlementGeneratorData'
import { PageContainer } from '@styles/pages/SettlementGenerator.styled'

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

  const handleCheckboxChange = (orderId: string, checked: boolean) => {
    const newSelectedOrders = new Set(selectedOrders)
    checked ? newSelectedOrders.add(orderId) : newSelectedOrders.delete(orderId)
    setSelectedOrders(newSelectedOrders)
  }

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
    <PageContainer>
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
    </PageContainer>
  )
}

export default SettlementGenerator
