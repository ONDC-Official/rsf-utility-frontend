import { FC, useState } from 'react'
import IncomingRequestsTable from 'pages/ReconciliationManager/IncomingRequestsTable'
import AcceptModal from 'pages/ReconciliationManager/AcceptModal'
import RejectModal from 'pages/ReconciliationManager/RejectModal'
import { IReviewReconRequestsProps } from 'pages/ReconciliationManager/types'
import { IIncomingRequest } from 'interfaces/reconciliationManager'
// import { generateIncomingRequests } from 'data/reconciliationManagerData'
import { TableContainer as Container, TableHeader as Header, Wrapper } from 'styles/pages/ReconciliationManager.styled'
// import { Actions } from 'styles/pages/OrdersReady.styled'
// import Button from 'components/common/Button'
// import ExportIcon from 'assets/images/svg/ExportIcon'

const ReviewReconRequests: FC<IReviewReconRequestsProps> = ({ onToastShow }) => {
  const [acceptModalOpen, setAcceptModalOpen] = useState(false)
  const [rejectModalOpen, setRejectModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<IIncomingRequest | null>(null)

  // Note: incomingRequests now fetched directly in IncomingRequestsTable via API

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
  }

  const handleRejectConfirm = (): void => {
    setRejectModalOpen(false)
    setSelectedOrder(null)
  }

  const handleAcceptSuccess = (message: string): void => {
    onToastShow(message)
  }

  const handleRejectSuccess = (message: string): void => {
    onToastShow(message)
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
          {/* <Actions>
            <Button variant="outlined" startIcon={<ExportIcon />}>
              Export
            </Button>
          </Actions> */}
        </Header>

        <Wrapper>
          <IncomingRequestsTable onAccept={handleAccept} onReject={handleReject} />
        </Wrapper>
      </Container>

      <AcceptModal
        open={acceptModalOpen}
        onClose={handleModalClose}
        onConfirm={handleAcceptConfirm}
        order={selectedOrder}
        onAcceptSuccess={handleAcceptSuccess}
      />

      <RejectModal
        open={rejectModalOpen}
        onClose={handleModalClose}
        onConfirm={handleRejectConfirm}
        order={selectedOrder}
        onRejectSuccess={handleRejectSuccess}
      />
    </>
  )
}

export default ReviewReconRequests
