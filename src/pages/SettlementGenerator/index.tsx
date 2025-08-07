import { FC, useState } from 'react'
import HeaderSection from 'pages/SettlementGenerator/HeaderSection'
import ModeSelection from 'pages/SettlementGenerator/ModeSelection'
import OrderTable from 'pages/SettlementGenerator/OrderTable'
import SummarySection from 'pages/SettlementGenerator/SummarySection'
import PayloadPreview from 'pages/SettlementGenerator/PayloadPreview'
import { ISettlementSummary, ISettleNpDataItem } from 'interfaces/settlementGenerator'
import { Container } from 'styles/pages/SettlementGenerator.styled'
import useGenerateNpSettlement from 'hooks/mutations/useGenerateNpSettlement'
import { useUserContext } from 'context/userContext'
import useTriggerAction from 'hooks/mutations/useTriggerAction'
import { GENERATE_NP_NP_SETTLEMENT, TRIGGER_ACTION } from 'constants/toastMessages'
import { useToast } from 'context/toastContext'
import useGetUserSettlements from 'hooks/queries/useGetUserSettlements'
import { IUserSettlementItem } from 'interfaces/settlement'

const SettlementGenerator: FC = () => {
  const toast = useToast()
  const { selectedUser } = useUserContext()

  const [counterpartyId, setCounterpartyId] = useState('')
  const [customDueDate, setCustomDueDate] = useState('')
  const [showPayloadPreview, setShowPayloadPreview] = useState(false)
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set())
  const [formInputs, setFormInputs] = useState<Record<string, ISettleNpDataItem>>({})
  const [payloadData, setPayloadData] = useState<any>(null)

  const miscMutation = useGenerateNpSettlement(selectedUser?._id || '')
  const triggerAction = useTriggerAction(selectedUser?._id || '')

  // === 1. Fetch orders from API ===
  const {
    data: fetchedOrders,
    isLoading,
    isError,
  } = useGetUserSettlements(selectedUser?._id || '', 1, 100, 'PREPARED', {
    enabled: !!selectedUser?._id,
  })

  const orders: IUserSettlementItem[] = fetchedOrders?.data || []

  // === 2. Submit payload ===
  const handleSubmit = async () => {
    const payload = { settle_data: Object.values(formInputs) || [] }

    try {
      const res = await miscMutation.triggerAsync(payload)
      toast(GENERATE_NP_NP_SETTLEMENT.SUCCESS)

      if (res?.success) {
        setPayloadData(res)
        setShowPayloadPreview(true)
        await triggerAction.triggerAsync('settle', res.data)
        toast(TRIGGER_ACTION.SUCCESS)
      }
    } catch (e) {
      toast(GENERATE_NP_NP_SETTLEMENT.ERROR)
    }
  }

  const handleSelectedOrdersChange = (newSelected: Set<string>) => {
    setSelectedOrders(newSelected)
  }

  const handleToggleMode = () => {
    // future logic here
  }

  const calculateSummary = (): ISettlementSummary => {
    const selectedList = Array.from(selectedOrders)
    const selectedData = orders.filter((order) => selectedList.includes(order.order_id))
    const totalAmount = selectedData.reduce((sum, order) => sum + order.inter_np_settlement, 0)

    return {
      selectedOrders: selectedOrders.size,
      totalAmount,
      batchSize: '1 batch',
    }
  }

  const summary = calculateSummary()

  return (
    <Container>
      <HeaderSection />
      <ModeSelection
        isManualMode={true}
        onToggleMode={handleToggleMode}
        counterpartyId={counterpartyId}
        setCounterpartyId={setCounterpartyId}
      />

      {/* === 3. Table and Loading/Error States === */}
      {isLoading ? (
        <div>Loading orders...</div>
      ) : isError ? (
        <div>Failed to load orders.</div>
      ) : (
        <OrderTable allOrders={orders} onSelectedOrdersChange={handleSelectedOrdersChange} />
      )}

      {selectedOrders.size > 0 && (
        <SummarySection
          summary={summary}
          customDueDate={customDueDate}
          setCustomDueDate={setCustomDueDate}
          onGeneratePreview={() => handleSubmit()}
          selectedOrderIds={Array.from(selectedOrders)}
          formInputs={formInputs}
          setFormInputs={setFormInputs}
        />
      )}

      {showPayloadPreview && <PayloadPreview data={payloadData} />}
    </Container>
  )
}

export default SettlementGenerator
