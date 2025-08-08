import { FC, useState } from 'react'
import ReconRequestTable from 'pages/ReconciliationManager/ReconRequestTable'
import OutgoingRequestsTable from 'pages/ReconciliationManager/OutgoingRequestsTable'
import ReinitiateModal from 'pages/ReconciliationManager/ReinitiateModal'
import { IOutgoingRequest } from 'interfaces/reconciliationManager'
import { generateOutgoingRequests } from 'data/reconciliationManagerData'
import { RECONCILIATION_LABELS } from 'pages/ReconciliationManager/constants'
import { IGenerateReconRequestProps } from 'pages/ReconciliationManager/types'

const GenerateReconRequest: FC<IGenerateReconRequestProps> = ({ allOrders, onToastShow }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<IOutgoingRequest | null>(null)

  const outgoingRequests = generateOutgoingRequests(256)

  const handleCheckboxSelect = (): void => {
    onToastShow(RECONCILIATION_LABELS.TOAST_MESSAGE)
  }

  const handleReinitiate = (order: IOutgoingRequest): void => {
    setSelectedOrder(order)
    setModalOpen(true)
  }

  const handleModalClose = (): void => {
    setModalOpen(false)
    setSelectedOrder(null)
  }

  return (
    <>
      <ReconRequestTable allOrders={allOrders} onCheckboxSelect={handleCheckboxSelect} />
      <OutgoingRequestsTable requests={outgoingRequests} onReinitiate={handleReinitiate} />
      <ReinitiateModal open={modalOpen} onClose={handleModalClose} order={selectedOrder} />
    </>
  )
}

export default GenerateReconRequest
