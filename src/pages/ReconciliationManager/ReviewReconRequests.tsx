import { FC, useState, useRef } from 'react'
import IncomingRequestsTable from 'pages/ReconciliationManager/IncomingRequestsTable'
import AcceptModal from 'pages/ReconciliationManager/AcceptModal'
import RejectModal from 'pages/ReconciliationManager/RejectModal'
import { IReviewReconRequestsProps } from 'pages/ReconciliationManager/types'
import { IIncomingRequest } from 'interfaces/reconciliationManager'
import {
  TableContainer as Container,
  TableHeader as Header,
  Wrapper,
  ActionButtonGroup,
} from 'styles/pages/ReconciliationManager.styled'
import Button from 'components/common/Button'
import ExportIcon from 'assets/images/svg/ExportIcon'
import { useLoader } from 'context/loaderContext'

const ReviewReconRequests: FC<IReviewReconRequestsProps> = ({ onToastShow }) => {
  const [acceptModalOpen, setAcceptModalOpen] = useState(false)
  const [rejectModalOpen, setRejectModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<IIncomingRequest | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { showLoader, hideLoader } = useLoader()

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

  const handleImportClick = (): void => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      showLoader()
      // For now using a test endpoint as requested
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/test', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        onToastShow('Import successful!')
        // Refresh the page data by calling any available refetch method if needed
        // This would typically refetch the IncomingRequestsTable data
      } else {
        onToastShow('Import failed!')
      }
    } catch (error) {
      onToastShow('Import failed!')
    } finally {
      hideLoader()
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleSettleOffline = (): void => {
    console.log('hi')
  }

  return (
    <>
      <Container>
        <Header>
          <ActionButtonGroup>
            <Button variant="outlined" startIcon={<ExportIcon />} onClick={handleImportClick}>
              Import
            </Button>
            <Button variant="contained" onClick={handleSettleOffline}>
              Settle Offline
            </Button>
            <input
              type="file"
              accept=".csv"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </ActionButtonGroup>
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
