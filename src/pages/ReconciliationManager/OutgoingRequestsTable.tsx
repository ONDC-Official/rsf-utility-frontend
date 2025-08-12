import { FC, useState, useEffect } from 'react'
import { MoveToInbox, RestartAlt } from '@mui/icons-material'
import Table from 'components/common/Table'
import StatusChip from 'components/common/StatusChip'
import { IOutgoingRequest } from 'interfaces/reconciliationManager'
import { outgoingRequestColumns } from 'pages/ReconciliationManager/data'
import { usePaginatedSelectableData } from 'hooks/usePaginatedSelectableData'
import { StyledTableBodyCell } from 'styles/components/Table.styled'
import { RECONCILIATION_LABELS } from 'pages/ReconciliationManager/constants'
import { IOutgoingRequestsTableProps } from 'pages/ReconciliationManager/types'
import { useUserContext } from 'context/userContext'
import { useLoader } from 'context/loaderContext'
import useGetReconData, { IReconDataItem } from 'hooks/queries/useGetReconData'
import { OUTGOING_RECON_STATUSES } from 'enums/recon'
import useMoveToReady from 'hooks/mutations/useMoveToReady'
import { formatDate } from 'utils/formatters'
import DateRangePickerButton from 'components/common/DateRangePickerButton'
import { IDateRange } from 'components/common/DateRangePickerButton/types'
import {
  TableContainer as Container,
  TableHeader as Header,
  TableActions as Actions,
  ActionButton as Button,
  ErrorCell,
  Wrapper,
} from 'styles/pages/ReconciliationManager.styled'
import { Typography } from '@mui/material'
import { TypographyVariant } from 'enums/typography'
// import ExportIcon from 'assets/images/svg/ExportIcon'

const OutgoingRequestsTable: FC<IOutgoingRequestsTableProps> = ({ onReinitiate }) => {
  const [dateRange, setDateRange] = useState<IDateRange>({ startDate: null, endDate: null })

  const { selectedUser } = useUserContext()
  const { showLoader, hideLoader } = useLoader()

  const {
    data: reconData,
    isLoading,
    refetch: internalRefetch,
  } = useGetReconData(
    selectedUser?._id || '',
    {
      page: 1,
      limit: 100,
      recon_status: OUTGOING_RECON_STATUSES,
    },
    {
      enabled: !!selectedUser?._id,
    },
  )

  const moveToReady = useMoveToReady(selectedUser?._id || '')

  useEffect(() => {
    if (isLoading) {
      showLoader()
    } else {
      hideLoader()
    }
  }, [isLoading, showLoader, hideLoader])

  // Flatten the nested recons structure
  const reconRequests = (reconData?.data?.recons || []).flatMap((item) => item.recons || [])

  // Convert IReconDataItem to IOutgoingRequest format for compatibility
  const requests: IOutgoingRequest[] = Array.isArray(reconRequests)
    ? reconRequests.map((item: IReconDataItem) => {
        const differingKeys: string[] = []
        let totalDiff = 0

        if (item.recon_breakdown && item.on_recon_breakdown) {
          ;(Object.keys(item.recon_breakdown) as (keyof IReconDataItem['recon_breakdown'])[]).forEach((key) => {
            const a = item.recon_breakdown[key] ?? 0
            const b = item.on_recon_breakdown[key] ?? 0

            if (a !== b) {
              differingKeys.push(key)
              totalDiff += Math.abs(a - b)
            }
          })
        }

        return {
          id: item._id,
          orderId: item.order_id,
          receiverId: item.receiver_id || '-',
          collectorId: item.collector_id || '-',
          status: item.recon_status,
          dueDate: item.createdAt || '-',
          initiatedDate: item.initiated_date,
          response: differingKeys.length > 0 ? differingKeys.join(', ') : '-',
          diffValue: totalDiff || '-',
        }
      })
    : []

  const {
    currentItems: currentRequests,
    totalCount,
    page,
    rowsPerPage,
    handlePageChange,
    handleRowsPerPageChange,
  } = usePaginatedSelectableData<IOutgoingRequest>(requests)

  const getItemId = (item: IOutgoingRequest): string => item.id

  const handleDateRangeChange = (newDateRange: IDateRange): void => {
    setDateRange(newDateRange)
  }

  const handleMoveToReady = async (request: IOutgoingRequest): Promise<void> => {
    try {
      showLoader()
      const payload = {
        orders: [
          {
            order_id: request.orderId,
          },
        ],
      }

      await moveToReady.moveToReadyAsync(payload)
      // Refresh the table data
      await internalRefetch()
      hideLoader()
    } catch (error) {
      console.error('Error moving to ready:', error)
      hideLoader()
    }
  }

  const renderRow = (request: IOutgoingRequest): JSX.Element => (
    <>
      <StyledTableBodyCell>{request.orderId}</StyledTableBodyCell>
      <StyledTableBodyCell>{request.receiverId}</StyledTableBodyCell>
      <StyledTableBodyCell>{request.collectorId}</StyledTableBodyCell>
      <StyledTableBodyCell>
        <StatusChip status={request.status} />
      </StyledTableBodyCell>
      <StyledTableBodyCell>{formatDate(request.dueDate)}</StyledTableBodyCell>
      <StyledTableBodyCell>{request.initiatedDate ? formatDate(request.initiatedDate) : '-'}</StyledTableBodyCell>
      <StyledTableBodyCell>{request.response}</StyledTableBodyCell>
      <StyledTableBodyCell>
        {request.status === 'SENT_PENDING' ? null : request.status === 'SENT_ACCEPTED' ||
          request.status === 'RECEIVED_ACCEPTED' ? (
          <Button
            variant="contained"
            size="small"
            startIcon={<MoveToInbox />}
            sx={{ height: 'auto', width: 'max-content' }}
            onClick={() => handleMoveToReady(request)}
          >
            Move to Ready
          </Button>
        ) : request.status === 'SENT_REJECTED' || request.status === 'RECEIVED_REJECTED' ? (
          <Button variant="outlined" size="small" startIcon={<RestartAlt />} onClick={() => onReinitiate(request)}>
            Reinitiate
          </Button>
        ) : null}
      </StyledTableBodyCell>
      <ErrorCell>{request.diffValue || '-'}</ErrorCell>
    </>
  )

  return (
    <Container style={{ marginTop: '24px' }}>
      <Header>
        <Typography variant={TypographyVariant.H6Bold}>{RECONCILIATION_LABELS.OUTGOING_TITLE}</Typography>
        <Actions>
          <DateRangePickerButton
            variant="outlined"
            selectedDateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
          />
        </Actions>
      </Header>

      <Wrapper>
        <Table
          columns={outgoingRequestColumns}
          data={currentRequests}
          totalCount={totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          renderRow={renderRow}
          hideCheckboxes={true}
          getItemId={getItemId}
        />
      </Wrapper>
    </Container>
  )
}

export default OutgoingRequestsTable
