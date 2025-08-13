import { FC, useState } from 'react'
import OutgoingRequestsTable from 'pages/ReconciliationManager/OutgoingRequestsTable'
import ReinitiateModal from 'pages/ReconciliationManager/ReinitiateModal'
import PayloadPreview from 'pages/ReconciliationManager/PayloadPreview'
import { IOutgoingRequest } from 'interfaces/reconciliationManager'
import useGenerateRecon from 'hooks/mutations/useGenerateRecon'
import useTriggerAction from 'hooks/mutations/useTriggerAction'
import { useUserContext } from 'context/userContext'
import { TRIGGER_ACTION } from 'constants/toastMessages'
import { useToast } from 'context/toastContext'

interface OutgoingRequestsSectionProps {
  onToastShow: (message: string) => void
}

const OutgoingRequestsSection: FC<OutgoingRequestsSectionProps> = ({ onToastShow }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<IOutgoingRequest | null>(null)
  const [showPayloadPreview, setShowPayloadPreview] = useState(false)
  const [payloadData, setPayloadData] = useState<any>(null)

  const { selectedUser } = useUserContext()
  const toast = useToast()
  const generateRecon = useGenerateRecon(selectedUser?._id || '')
  const triggerAction = useTriggerAction(selectedUser?._id || '')

  const handleReinitiate = (order: IOutgoingRequest): void => {
    setSelectedOrder(order)
    setModalOpen(true)
  }

  const handleReinitiateWithData = async (order: IOutgoingRequest, formData: any): Promise<void> => {
    try {
      const reconPayload = {
        recon_data: [
          {
            order_id: formData.orderId,
          },
        ],
      }

      const firstApiResponse = await generateRecon.generateAsync(reconPayload)

      if (firstApiResponse.success && firstApiResponse.data) {
        onToastShow('Reconciliation request generated successfully!')

        // Close the reinitiate modal
        setModalOpen(false)
        setSelectedOrder(null)

        // Open the payload preview modal with the response data
        setPayloadData(firstApiResponse.data)
        setShowPayloadPreview(true)
      }
    } catch (error) {
      onToastShow('Failed to reinitiate reconciliation request')
      throw error
    }
  }

  const handleModalClose = (): void => {
    setModalOpen(false)
    setSelectedOrder(null)
  }

  const handleTriggerSettlement = async (): Promise<void> => {
    if (!payloadData) return

    try {
      const res = await triggerAction.triggerAsync('recon', payloadData)

      if (res.success) {
        toast(TRIGGER_ACTION.SUCCESS)
      }

      setShowPayloadPreview(false)
    } catch (e) {
      toast(TRIGGER_ACTION.ERROR)
    }
  }

  return (
    <>
      <OutgoingRequestsTable onReinitiate={handleReinitiate} />
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

export default OutgoingRequestsSection
