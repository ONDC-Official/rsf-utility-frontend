import { FC, useState } from 'react'
import { GetApp } from '@mui/icons-material'
import IncomingRequestsTable from 'pages/ReconciliationManager/IncomingRequestsTable'
import AcceptModal from 'pages/ReconciliationManager/AcceptModal'
import RejectModal from 'pages/ReconciliationManager/RejectModal'
import { IReviewReconRequestsProps } from 'pages/ReconciliationManager/types'
import { IIncomingRequest } from 'interfaces/reconciliationManager'
import { generateIncomingRequests } from 'data/reconciliationManagerData'
import { RECONCILIATION_LABELS } from 'pages/ReconciliationManager/constants'
import {
  TableContainer as Container,
  TableHeader as Header,
  TableActions as Actions,
  TableTitle as Title,
} from 'styles/pages/ReconciliationManager.styled'
import { ContainedExportButton } from 'styles/components/Button.styled'

const ReviewReconRequests: FC<IReviewReconRequestsProps> = ({ onToastShow }) => {
  const [acceptModalOpen, setAcceptModalOpen] = useState(false)
  const [rejectModalOpen, setRejectModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<IIncomingRequest | null>(null)

  const incomingRequests = generateIncomingRequests(256)

  const handleAccept = (order: IIncomingRequest) => {
    setSelectedOrder(order)
    setAcceptModalOpen(true)
  }

  const handleReject = (order: IIncomingRequest) => {
    setSelectedOrder(order)
    setRejectModalOpen(true)
  }

  const handleAcceptConfirm = () => {
    setAcceptModalOpen(false)
    setSelectedOrder(null)
    onToastShow(RECONCILIATION_LABELS.ACCEPT_TOAST_MESSAGE)
  }

  const handleRejectConfirm = () => {
    setRejectModalOpen(false)
    setSelectedOrder(null)
    onToastShow(RECONCILIATION_LABELS.REJECT_TOAST_MESSAGE)
  }

  const handleModalClose = () => {
    setAcceptModalOpen(false)
    setRejectModalOpen(false)
    setSelectedOrder(null)
  }

  return (
    <>
      <Container>
        <Header>
          <Title>{RECONCILIATION_LABELS.INCOMING_TITLE}</Title>
          <Actions>
            <ContainedExportButton variant="outlined" startIcon={<GetApp />}>
              {RECONCILIATION_LABELS.EXPORT}
            </ContainedExportButton>
          </Actions>
        </Header>

        <IncomingRequestsTable data={incomingRequests} onAccept={handleAccept} onReject={handleReject} />
      </Container>

      <AcceptModal
        open={acceptModalOpen}
        onClose={handleModalClose}
        onConfirm={handleAcceptConfirm}
        order={selectedOrder}
      />

      <RejectModal
        open={rejectModalOpen}
        onClose={handleModalClose}
        onConfirm={handleRejectConfirm}
        order={selectedOrder}
      />
    </>
  )
}

export default ReviewReconRequests
