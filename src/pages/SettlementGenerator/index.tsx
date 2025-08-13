import { FC, useState, useEffect } from 'react'
import HeaderSection from 'pages/SettlementGenerator/HeaderSection'
import OrderTable from 'pages/SettlementGenerator/OrderTable'
import SummarySection from 'pages/SettlementGenerator/SummarySection'
import PayloadPreview from 'pages/SettlementGenerator/PayloadPreview'
import Select from 'components/common/Select'
import { ISettlementSummary, ISettleNpDataItem } from 'interfaces/settlementGenerator'
import { Container } from 'styles/pages/SettlementGenerator.styled'
import useGenerateNpSettlement from 'hooks/mutations/useGenerateNpSettlement'
import { useUserContext } from 'context/userContext'
import useTriggerAction from 'hooks/mutations/useTriggerAction'
import {
  GENERATE_NP_NP_SETTLEMENT,
  SETTLEMENT_PATCH_MESSAGES,
  TRIGGER_ACTION,
  CSV_EXPORT_MESSAGES,
} from 'constants/toastMessages'
import { useToast } from 'context/toastContext'
import useGetUserSettlements from 'hooks/queries/useGetUserSettlements'
import { IUserSettlementItem, SettlementPayload } from 'interfaces/settlement'
import { useLoader } from 'context/loaderContext'
import { SettlementStatus } from 'enums/settlement'
import usePatchSettlements from 'hooks/mutations/usePatchSettlements'
import { downloadOrdersAsCSV } from 'utils/helpers'
import { Typography } from '@mui/material'
import { TypographyVariant } from 'enums/typography'

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
  const [counterpartyId, setCounterpartyId] = useState('')
  const [dateRange, setDateRange] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: null,
    endDate: null,
  })

  const counterpartyOptions = selectedUser?.counterparty_ids.map((id) => ({ value: id, label: id })) || []

  // Auto-select first option when counterparty options change
  useEffect(() => {
    if (counterpartyOptions.length > 0 && !counterpartyId) {
      setCounterpartyId(counterpartyOptions[0].value)
    }
  }, [counterpartyOptions, counterpartyId])

  // Reset selection when selected user changes to ensure sync
  useEffect(() => {
    if (counterpartyOptions.length > 0) {
      const currentIsValid = counterpartyOptions.some((option) => option.value === counterpartyId)
      if (!currentIsValid) {
        setCounterpartyId(counterpartyOptions[0].value)
      }
    }
  }, [selectedUser, counterpartyOptions, counterpartyId])

  const {
    data: fetchedOrders,
    isLoading,
    isError,
    refetch: refetchOrders,
  } = useGetUserSettlements(
    selectedUser?._id || '',
    {
      statuses: SettlementStatus.PREPARED,
      counterpartyId,
      dueDateFrom: dateRange.startDate ? dateRange.startDate.toISOString().split('T')[0] : undefined,
      dueDateTo: dateRange.endDate ? dateRange.endDate.toISOString().split('T')[0] : undefined,
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

      if (res.success) {
        toast(GENERATE_NP_NP_SETTLEMENT.SUCCESS)
      } else {
        throw res
      }

      if (res?.success) {
        setNpSettlementResponseData(res.data)
        setShowPayloadPreview(true)
      }
    } catch (e: any) {
    } finally {
      hideLoader()
    }
  }

  const handleTriggerSettlement = async (): Promise<void> => {
    if (!userId || !npSettlementResponseData) return

    try {
      const res = await triggerAction.triggerAsync('settle', npSettlementResponseData)
      if (res.success) {
        toast(TRIGGER_ACTION.SUCCESS)
      }

      setShowPayloadPreview(false)
    } catch (e) {
    } finally {
      hideLoader()
    }
  }

  const handleSelectedOrdersChange = (newSelected: Set<string>): void => {
    setSelectedOrders(newSelected)
  }

  const handleDateRangeChange = (newDateRange: { startDate: Date | null; endDate: Date | null }): void => {
    setDateRange(newDateRange)
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
      }
    } catch (error) {
    } finally {
      hideLoader()
    }
  }

  // Calculate summary only when we have valid orders
  const summary =
    !isLoading && !isError ? calculateSummary() : { selectedOrders: 0, totalAmount: 0, batchSize: '1 batch' }

  return (
    <Container>
      <HeaderSection counterpartyId={counterpartyId} onCounterpartyChange={setCounterpartyId} />

      <div
        style={{
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Typography variant={TypographyVariant.Body1Medium}>Counterparty ID</Typography>
          <Select
            value={counterpartyId}
            onChange={(e) => setCounterpartyId(e.target.value as string)}
            options={counterpartyOptions}
            size="small"
            style={{ minWidth: '200px' }}
          />
        </div>
      </div>

      {!isLoading && !isError && selectedOrders.size > 0 && (
        <SummarySection
          summary={summary}
          customDueDate={customDueDate}
          setCustomDueDate={setCustomDueDate}
          onGeneratePreview={handleSubmit}
          selectedOrderIds={Array.from(selectedOrders)}
          formInputs={formInputs}
          setFormInputs={setFormInputs}
          selectedOrders={orders.filter((order) => selectedOrders.has(order.order_id))}
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
          refetchOrders={refetchOrders}
          onDateRangeChange={handleDateRangeChange}
          onExport={() => {
            const orders = fetchedOrders?.data?.settlements || []
            if (orders.length > 0) {
              const timestamp = new Date().toISOString().split('T')[0]
              const success = downloadOrdersAsCSV(orders, `settlement-orders-${timestamp}.csv`)
              if (success) {
                toast(CSV_EXPORT_MESSAGES.SUCCESS)
              } else {
                toast(CSV_EXPORT_MESSAGES.ERROR)
              }
            } else {
              toast(CSV_EXPORT_MESSAGES.NO_DATA)
            }
          }}
        />
      )}
    </Container>
  )
}

export default SettlementGenerator
