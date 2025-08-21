import { FC, useState, useRef, useCallback } from 'react'
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
import { useToast } from 'context/toastContext'
import { downloadIncomingRequestsCSV } from 'utils/helpers'
import { CSV_EXPORT_MESSAGES } from 'constants/toastMessages'
import useGetReconData, { IReconDataItem } from 'hooks/queries/useGetReconData'
import { useUserContext } from 'context/userContext'
import { INCOMING_RECON_STATUSES } from 'enums/recon'
import usePatchImportRecon from 'hooks/mutations/usePatchImportRecon'
import { SETTLEMENT_PATCH_MESSAGES } from 'constants/toastMessages'

const ReviewReconRequests: FC<IReviewReconRequestsProps> = ({ onToastShow }) => {
  const [acceptModalOpen, setAcceptModalOpen] = useState(false)
  const [rejectModalOpen, setRejectModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<IIncomingRequest | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { showLoader, hideLoader } = useLoader()
  const toast = useToast()
  const { selectedUser } = useUserContext()

  // Ref to store the refetch function from IncomingRequestsTable
  const refetchIncomingRequestsRef = useRef<(() => void) | null>(null)

  // Hook for importing recon data
  const bulkImportMutation = usePatchImportRecon(selectedUser?._id ?? '')

  // Get incoming requests data for export
  const { data: incomingReconData } = useGetReconData(
    selectedUser?._id || '',
    {
      page: 1,
      limit: 100,
      recon_status: INCOMING_RECON_STATUSES,
    },
    {
      enabled: !!selectedUser?._id,
    },
  )

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
      const result = await bulkImportMutation.triggerAsync(file)
      if (result.success) {
        toast(SETTLEMENT_PATCH_MESSAGES.SUCCESS)
        // Refetch the incoming requests data
        if (refetchIncomingRequestsRef.current) {
          refetchIncomingRequestsRef.current()
        }
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

  const handleSettleOffline = (order: IIncomingRequest): void => {
    console.log('Settle offline for order:', order.orderId)
    onToastShow('Settle offline functionality will be implemented')
  }

  // Callback to receive refetch function from IncomingRequestsTable
  const handleRefetchReady = useCallback((refetch: () => void) => {
    refetchIncomingRequestsRef.current = refetch
  }, [])

  const handleExport = (): void => {
    // Process the data similar to IncomingRequestsTable
    const incomingRequests = (incomingReconData?.data?.recons || []).flatMap((parentRecon) =>
      (parentRecon.recons || []).map((item: IReconDataItem) => ({
        id: item._id,
        reconTransactionId: parentRecon.transaction_id,
        orderId: item.order_id,
        receiverId: item.receiver_id || '-',
        collectorId: item.collector_id || '-',
        inter_np_settlement: item.recon_breakdown.amount,
        commission: item.recon_breakdown.commission,
        reason: 'Reconciliation request',
        receivedDate: item.createdAt,
        recon_status: item.recon_status,
        withholding_amount: item.recon_breakdown.withholding_amount,
        tcs: item.recon_breakdown.tcs,
        tds: item.recon_breakdown.tds,
        settlement_id: item.settlement_id,
        payment_id: item.payment_id,
      })),
    )

    if (incomingRequests.length > 0) {
      const timestamp = new Date().toISOString().split('T')[0]
      const success = downloadIncomingRequestsCSV(incomingRequests, `incoming-recon-requests-${timestamp}.csv`)
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
      <Container>
        <Header>
          <ActionButtonGroup>
            <Button variant="outlined" startIcon={<ExportIcon />} onClick={handleImportClick}>
              Import
            </Button>
            <Button variant="outlined" startIcon={<ExportIcon />} onClick={handleExport}>
              Export as CSV
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
          <IncomingRequestsTable
            onAccept={handleAccept}
            onReject={handleReject}
            onSettleOffline={handleSettleOffline}
            onExport={handleExport}
            onRefetchReady={handleRefetchReady}
          />
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
