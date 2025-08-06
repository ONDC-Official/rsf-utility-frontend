import { FC, useState } from 'react'
import HeaderSection from 'pages/SettlementGenerator/HeaderSection'
import ModeSelection from 'pages/SettlementGenerator/ModeSelection'
import OrderTable from 'pages/SettlementGenerator/OrderTable'
import SummarySection from 'pages/SettlementGenerator/SummarySection'
import PayloadPreview from 'pages/SettlementGenerator/PayloadPreview'
import { ISettlementSummary } from 'interfaces/settlementGenerator'
import { generateSettlementOrdersData, generatePayloadData } from 'data/settlementGeneratorData'
import { Container } from 'styles/pages/SettlementGenerator.styled'

const SettlementGenerator: FC = () => {
  const allOrders = generateSettlementOrdersData(256)
  const [counterpartyId, setCounterpartyId] = useState('')
  const [customDueDate, setCustomDueDate] = useState('')
  const [showPayloadPreview, setShowPayloadPreview] = useState(false)
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set())

  const handleSelectedOrdersChange = (newSelected: Set<string>) => {
    setSelectedOrders(newSelected)
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
    <Container>
      <HeaderSection />
      <ModeSelection
        isManualMode={true}
        onToggleMode={() => {}}
        counterpartyId={counterpartyId}
        setCounterpartyId={setCounterpartyId}
      />
      <OrderTable allOrders={allOrders} onSelectedOrdersChange={handleSelectedOrdersChange} />
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
