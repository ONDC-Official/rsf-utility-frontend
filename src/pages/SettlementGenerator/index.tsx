import { FC, useState } from 'react'
import HeaderSection from 'pages/SettlementGenerator/HeaderSection'
import OrderTable from 'pages/SettlementGenerator/OrderTable'
import SummarySection from 'pages/SettlementGenerator/SummarySection'
import PayloadPreview from 'pages/SettlementGenerator/PayloadPreview'
import { ISettlementSummary, ISettleNpDataItem } from 'interfaces/settlementGenerator'
import { Container } from 'styles/pages/SettlementGenerator.styled'
import useGenerateNpSettlement from 'hooks/mutations/useGenerateNpSettlement'
import { useUserContext } from 'context/userContext'
import useTriggerAction from 'hooks/mutations/useTriggerAction'
import { GENERATE_NP_NP_SETTLEMENT, SETTLEMENT_PATCH_MESSAGES, TRIGGER_ACTION } from 'constants/toastMessages'
import { useToast } from 'context/toastContext'
import useGetUserSettlements from 'hooks/queries/useGetUserSettlements'
import { IUserSettlementItem, SettlementPayload } from 'interfaces/settlement'
import { useLoader } from 'context/loaderContext'
import { SettlementStatus } from 'enums/settlement'
import usePatchSettlements from 'hooks/mutations/usePatchSettlements'

const SettlementGenerator: FC = () => {
  const toast = useToast()
  const { selectedUser } = useUserContext()
  const { showLoader, hideLoader } = useLoader()

  const userId = selectedUser?._id ?? ''

  const [customDueDate, setCustomDueDate] = useState('')
  const [showPayloadPreview, setShowPayloadPreview] = useState(false)
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set())
  const [formInputs, setFormInputs] = useState<Record<string, ISettleNpDataItem>>({})
  const [npSettlementResponseData, setNpSettlementResponseData] = useState<any>(null)
  const [editedRows, setEditedRows] = useState<Record<string, SettlementPayload>>({})

  const {
    data: fetchedOrders,
    isLoading,
    isError,
  } = useGetUserSettlements(
    selectedUser?._id || '',
    {
      statuses: SettlementStatus.PREPARED,
    },
    {
      enabled: !!selectedUser?._id,
    },
  )

  const patchSettlementsMutation = usePatchSettlements(userId)
  const miscMutation = useGenerateNpSettlement(userId)
  const triggerAction = useTriggerAction(userId)

  const orders: IUserSettlementItem[] = Array.isArray(fetchedOrders?.data?.settlements)
    ? fetchedOrders?.data?.settlements || []
    : []

  const handleSubmit = async (): Promise<void> => {
    if (!userId) return

    try {
      showLoader()
      const payload = { settle_data: Object.values(formInputs) || [] }
      const res = await miscMutation.triggerAsync(payload)
      toast(GENERATE_NP_NP_SETTLEMENT.SUCCESS)

      if (res?.success) {
        setNpSettlementResponseData(res.data)
        setShowPayloadPreview(true)
      }
    } catch (e) {
      toast(GENERATE_NP_NP_SETTLEMENT.ERROR)
    } finally {
      hideLoader()
    }
  }

  const handleTriggerSettlement = async (): Promise<void> => {
    if (!userId || !npSettlementResponseData) return

    try {
      await triggerAction.triggerAsync('settle', npSettlementResponseData)
      toast(TRIGGER_ACTION.SUCCESS)
      setShowPayloadPreview(false)
    } catch (e) {
      toast(TRIGGER_ACTION.ERROR)
    } finally {
      hideLoader()
    }
  }

  const handleSelectedOrdersChange = (newSelected: Set<string>): void => {
    setSelectedOrders(newSelected)
  }

  const calculateSummary = (): ISettlementSummary => {
    const selectedList = Array.from(selectedOrders)
    const safeOrders = Array.isArray(orders) ? orders : []
    const selectedData = safeOrders.filter((order) => selectedList.includes(order.order_id))
    const totalAmount = selectedData.reduce((sum, order) => sum + order.inter_np_settlement, 0)

    return {
      selectedOrders: selectedOrders.size,
      totalAmount,
      batchSize: '1 batch',
    }
  }

  const handlePatchSettlements = async (): Promise<void> => {
    if (!userId) return

    try {
      showLoader()

      const settlementsPayload: SettlementPayload[] = Object.values(editedRows).map((item) => ({
        order_id: item.order_id!,
        total_order_value: item.total_order_value,
        commission: item.commission,
        collector_settlement: item.collector_settlement,
        tds: item.tds,
        tcs: item.tcs,
        withholding_amount: item.withholding_amount,
        inter_np_settlement: item.inter_np_settlement,
      }))

      const payload = { settlements: settlementsPayload }

      const res = await patchSettlementsMutation.triggerAsync(payload)
      if (res.success) {
        toast(SETTLEMENT_PATCH_MESSAGES.SUCCESS)
      } else {
        toast(SETTLEMENT_PATCH_MESSAGES.ERROR)
      }
    } catch (error) {
      toast(SETTLEMENT_PATCH_MESSAGES.ERROR)
    } finally {
      hideLoader()
    }
  }

  // Calculate summary only when we have valid orders
  const summary =
    !isLoading && !isError ? calculateSummary() : { selectedOrders: 0, totalAmount: 0, batchSize: '1 batch' }

  return (
    <Container>
      <HeaderSection />

      {!isLoading && !isError && selectedOrders.size > 0 && (
        <SummarySection
          summary={summary}
          customDueDate={customDueDate}
          setCustomDueDate={setCustomDueDate}
          onGeneratePreview={handleSubmit}
          selectedOrderIds={Array.from(selectedOrders)}
          formInputs={formInputs}
          setFormInputs={setFormInputs}
        />
      )}

      <PayloadPreview
        data={npSettlementResponseData}
        onTrigger={handleTriggerSettlement}
        open={showPayloadPreview}
        onClose={() => setShowPayloadPreview(false)}
      />

      {isLoading ? (
        <div>Loading orders...</div>
      ) : isError ? (
        <div>Failed to load orders.</div>
      ) : (
        <OrderTable
          allOrders={orders}
          editedRows={editedRows}
          setEditedRows={setEditedRows}
          onSelectedOrdersChange={handleSelectedOrdersChange}
          handlePatchSettlements={handlePatchSettlements}
        />
      )}
    </Container>
  )
}

export default SettlementGenerator
