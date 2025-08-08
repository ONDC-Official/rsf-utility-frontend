import { FC, useState } from 'react'
import IncomingRequestsTable from 'pages/ReconciliationManager/IncomingRequestsTable'
import AcceptModal from 'pages/ReconciliationManager/AcceptModal'
import RejectModal from 'pages/ReconciliationManager/RejectModal'
import { IReviewReconRequestsProps } from 'pages/ReconciliationManager/types'
import { IIncomingRequest } from 'interfaces/reconciliationManager'
import { generateIncomingRequests } from 'data/reconciliationManagerData'
import { RECONCILIATION_LABELS } from 'pages/ReconciliationManager/constants'
import { TableContainer as Container, TableHeader as Header, Wrapper } from 'styles/pages/ReconciliationManager.styled'
import { Typography } from '@mui/material'
import { TypographyVariant } from 'enums/typography'

const ReviewReconRequests: FC<IReviewReconRequestsProps> = ({ onToastShow }) => {
  const [acceptModalOpen, setAcceptModalOpen] = useState(false)
  const [rejectModalOpen, setRejectModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<IIncomingRequest | null>(null)

  const incomingRequests = generateIncomingRequests(256)

  const handleAccept = (order: IIncomingRequest): void => {
    setSelectedOrder(order)
    setAcceptModalOpen(true)
  }

  const handleReject = (order: IIncomingRequest): void => {
    setSelectedOrder(order)
    setRejectModalOpen(true)
  }

  const handleAcceptConfirm = (): void => {
    setAcceptModalOpen(false)
    setSelectedOrder(null)
    onToastShow(RECONCILIATION_LABELS.ACCEPT_TOAST_MESSAGE)
  }

  const handleRejectConfirm = (): void => {
    setRejectModalOpen(false)
    setSelectedOrder(null)
    onToastShow(RECONCILIATION_LABELS.REJECT_TOAST_MESSAGE)
  }

  const handleModalClose = (): void => {
    setAcceptModalOpen(false)
    setRejectModalOpen(false)
    setSelectedOrder(null)
  }

  return (
    <>
      <Container>
        <Header>
          <Typography variant={TypographyVariant.H6Bold}>{RECONCILIATION_LABELS.INCOMING_TITLE}</Typography>
        </Header>

        <Wrapper>
          <IncomingRequestsTable data={incomingRequests} onAccept={handleAccept} onReject={handleReject} />
        </Wrapper>
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
