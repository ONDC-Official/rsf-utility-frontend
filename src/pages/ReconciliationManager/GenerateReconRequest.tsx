import { FC, useState, useCallback } from 'react'
import ReconRequestTable from 'pages/ReconciliationManager/ReconRequestTable'
// import OutgoingRequestsTable from 'pages/ReconciliationManager/OutgoingRequestsTable'
import ReinitiateModal from 'pages/ReconciliationManager/ReinitiateModal'
import { IOutgoingRequest } from 'interfaces/reconciliationManager'
// import { RECONCILIATION_LABELS } from 'pages/ReconciliationManager/constants'
import { IGenerateReconRequestProps } from 'pages/ReconciliationManager/types'
import { IReconciliationDataItem } from 'hooks/queries/useGetReconciliationData'
import useGenerateRecon, { IReconDataItem } from 'hooks/mutations/useGenerateRecon'
import useTriggerAction from 'hooks/mutations/useTriggerAction'
import { useUserContext } from 'context/userContext'
import PayloadPreview from 'pages/ReconciliationManager/PayloadPreview'
import { TRIGGER_ACTION, CSV_EXPORT_MESSAGES } from 'constants/toastMessages'
import { useToast } from 'context/toastContext'
import useGetReconciliationData from 'hooks/queries/useGetReconciliationData'
import { downloadReconRequestCSV } from 'utils/helpers'

const GenerateReconRequest: FC<IGenerateReconRequestProps> = ({ onToastShow, onSelectionChange }) => {
  const toast = useToast()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<IOutgoingRequest | null>(null)
  const [showPayloadPreview, setShowPayloadPreview] = useState(false)
  const [payloadData, setPayloadData] = useState<any>(null)
  // const [selectedCount, setSelectedCount] = useState(0)
  // const [selectedSettlements, setSelectedSettlements] = useState<IReconciliationDataItem[]>([])

  const { selectedUser } = useUserContext()
  const generateRecon = useGenerateRecon(selectedUser?._id || '')
  const triggerAction = useTriggerAction(selectedUser?._id || '')

  // Get reconciliation data for export
  const { data: reconDataForExport } = useGetReconciliationData(selectedUser?._id || '', 1, 1000, undefined, {
    enabled: !!selectedUser?._id,
  })

  // Note: outgoingRequests now fetched directly in OutgoingRequestsTable via API

  const handleGenerateReconRequestWithData = useCallback(
    async (settlements: IReconciliationDataItem[]): Promise<void> => {
      try {
        // Prepare payload for first API
        const reconData: IReconDataItem[] = settlements.map((settlement) => ({
          order_id: settlement.order_id,
          // recon_data: {
          //   settlement_amount: settlement.collector_settlement,
          //   commission_amount: settlement.commission,
          //   withholding_amount: settlement.withholding_amount,
          //   tds: settlement.tds,
          //   tcs: settlement.tcs
          // }
        }))

        // Call first API
        const firstApiResponse = await generateRecon.generateAsync({ recon_data: reconData })

        if (firstApiResponse.success && firstApiResponse.data) {
          // Call second API with the response data (pass the entire data object, not data.data)

          onToastShow('Reconciliation request generated successfully!')

          setPayloadData(firstApiResponse.data)
          setShowPayloadPreview(true)
        }
      } catch (error) {
        onToastShow('Failed to generate reconciliation request')
      }
    },
    [generateRecon, triggerAction, onToastShow],
  )

  const handleCheckboxSelect = useCallback(
    (count: number, settlements: IReconciliationDataItem[]): void => {
      // setSelectedCount(count)
      // setSelectedSettlements(settlements)

      // Pass the settlements data to parent for generating the request
      if (onSelectionChange) {
        onSelectionChange(count, count > 0, () => handleGenerateReconRequestWithData(settlements))
      }

      // if (count > 0) {
      //   onToastShow(RECONCILIATION_LABELS.TOAST_MESSAGE)
      // }
    },
    [onSelectionChange, onToastShow, handleGenerateReconRequestWithData],
  )

  // const handleReinitiate = (order: IOutgoingRequest): void => {
  //   setSelectedOrder(order)
  //   setModalOpen(true)
  // }

  const handleReinitiateWithData = async (order: IOutgoingRequest, formData: any): Promise<void> => {
    try {
      // First API call - Generate recon with form data
      const reconPayload = {
        recon_data: [
          {
            order_id: formData.orderId,
            // You can add the form data fields here if needed by the API
            // settlement_amount: parseFloat(formData.settlementAmount) || 0,
            // commission_amount: parseFloat(formData.commission) || 0,
            // withholding_amount: parseFloat(formData.withholdingAmount) || 0,
            // tds: parseFloat(formData.tds) || 0,
            // tcs: parseFloat(formData.tcs) || 0
          },
        ],
      }

      const firstApiResponse = await generateRecon.generateAsync(reconPayload)

      if (firstApiResponse.success && firstApiResponse.data) {
        // Second API call - Trigger action
        await triggerAction.triggerAsync('recon', firstApiResponse.data)
      }

      onToastShow('Reconciliation request reinitiated successfully!')
    } catch (error) {
      onToastShow('Failed to reinitiate reconciliation request')
      throw error // Re-throw to be handled by modal
    }
  }

  const handleTriggerSettlement = async (): Promise<void> => {
    if (!payloadData) return

    try {
      const res = await triggerAction.triggerAsync('recon', payloadData)

      if (res.success) {
        toast(TRIGGER_ACTION.SUCCESS)
      }

      setShowPayloadPreview(false)
    } catch (e) {}
  }

  const handleModalClose = (): void => {
    setModalOpen(false)
    setSelectedOrder(null)
    // The table will automatically refresh when the modal closes
    // due to React Query's automatic refetching behavior
  }

  const handleExport = (): void => {
    const settlements = reconDataForExport?.data?.settlements || []
    if (settlements.length > 0) {
      const timestamp = new Date().toISOString().split('T')[0]
      const success = downloadReconRequestCSV(settlements, `recon-requests-${timestamp}.csv`)
      if (success) {
        toast(CSV_EXPORT_MESSAGES.SUCCESS)
      } else {
        toast(CSV_EXPORT_MESSAGES.ERROR)
      }
    } else {
      toast(CSV_EXPORT_MESSAGES.NO_DATA)
    }
  }

  return (
    <>
      <ReconRequestTable onCheckboxSelect={handleCheckboxSelect} onExport={handleExport} />
      {/* <OutgoingRequestsTable onReinitiate={handleReinitiate} /> */}
      <ReinitiateModal
        open={modalOpen}
        onClose={handleModalClose}
        order={selectedOrder}
        onReinitiate={handleReinitiateWithData}
      />

      <PayloadPreview
        data={payloadData}
        onTrigger={handleTriggerSettlement}
        open={showPayloadPreview}
        onClose={() => setShowPayloadPreview(false)}
      />
    </>
  )
}

export default GenerateReconRequest
