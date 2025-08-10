import { FC, useState } from 'react'
import OutgoingRequestsTable from 'pages/ReconciliationManager/OutgoingRequestsTable'
import ReinitiateModal from 'pages/ReconciliationManager/ReinitiateModal'
import { IOutgoingRequest } from 'interfaces/reconciliationManager'
import useGenerateRecon from 'hooks/mutations/useGenerateRecon'
import useTriggerAction from 'hooks/mutations/useTriggerAction'
import { useUserContext } from 'context/userContext'

interface OutgoingRequestsSectionProps {
  onToastShow: (message: string) => void
}

const OutgoingRequestsSection: FC<OutgoingRequestsSectionProps> = ({ onToastShow }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<IOutgoingRequest | null>(null)

  const { selectedUser } = useUserContext()
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
        await triggerAction.triggerAsync('recon', firstApiResponse.data)
      }

      onToastShow('Reconciliation request reinitiated successfully!')
    } catch (error) {
      onToastShow('Failed to reinitiate reconciliation request')
      throw error
    }
  }

  const handleModalClose = (): void => {
    setModalOpen(false)
    setSelectedOrder(null)
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
    </>
  )
}

export default OutgoingRequestsSection
