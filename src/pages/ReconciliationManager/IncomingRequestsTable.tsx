import { FC, useState, useEffect } from 'react'
import { IconButton } from '@mui/material'
import { KeyboardArrowDown, KeyboardArrowUp, Check, Close } from '@mui/icons-material'
import Table from 'components/common/Table'
import StatusChip from 'components/common/StatusChip'
import { IIncomingRequest } from 'interfaces/reconciliationManager'
import { incomingRequestColumns } from 'pages/ReconciliationManager/data'
import { usePaginatedSelectableData } from 'hooks/usePaginatedSelectableData'
import { IIncomingRequestsTableProps } from 'pages/ReconciliationManager/types'
import Button from 'components/common/Button'
import { CURRENCY_SYMBOL, TABLE_CELL_DEFAULTS } from 'pages/ReconciliationManager/constants'
import { StyledTableBodyCell, ExpandableCell, ActionIconButton } from 'styles/components/Table.styled'
import { useUserContext } from 'context/userContext'
import { useLoader } from 'context/loaderContext'
import useGetReconData, { IReconDataItem } from 'hooks/queries/useGetReconData'
import { INCOMING_RECON_STATUSES, ReconStatus } from 'enums/recon'

const IncomingRequestsTable: FC<IIncomingRequestsTableProps> = ({ onAccept, onReject, onSettleOffline }) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  const { selectedUser } = useUserContext()
  const { showLoader, hideLoader } = useLoader()

  const { data: reconData, isLoading } = useGetReconData(
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

  useEffect(() => {
    if (isLoading) {
      showLoader()
    } else {
      hideLoader()
    }
  }, [isLoading, showLoader, hideLoader])

  // Properly map the nested recons structure
  const data: IIncomingRequest[] = (reconData?.data?.recons || []).flatMap((parentRecon) =>
    (parentRecon.recons || []).map((item: IReconDataItem) => ({
      id: item._id,
      reconTransactionId: parentRecon.transaction_id, // Use parent transaction_id
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

  const {
    currentItems: orders,
    totalCount,
    page,
    rowsPerPage,
    handlePageChange,
    handleRowsPerPageChange,
  } = usePaginatedSelectableData<IIncomingRequest>(data)

  const handleRowToggle = (orderId: string): void => {
    setExpandedRows((prev) => {
      const newExpanded = new Set(prev)
      if (newExpanded.has(orderId)) {
        newExpanded.delete(orderId)
      } else {
        newExpanded.add(orderId)
      }

      return newExpanded
    })
  }

  const formatCurrency = (amount: number | undefined): string => {
    return `${CURRENCY_SYMBOL}${amount?.toFixed(2) ?? TABLE_CELL_DEFAULTS.TOTAL_VALUE}`
  }

  // const truncateText = (text: string, maxLength = 20): string => {
  //   if (text.length <= maxLength) return text
  //   return `${text.substring(0, maxLength)}...`
  // }

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString)
      return date.toISOString().split('T')[0] // Returns YYYY-MM-DD format
    } catch {
      return dateString // Return original if parsing fails
    }
  }

  const getItemId = (item: IIncomingRequest): string => item.id

  const expandedData = orders.reduce<any[]>((acc, order) => {
    acc.push({ ...order, isMainRow: true })

    if (expandedRows.has(order.id)) {
      for (let i = 1; i <= 3; i++) {
        acc.push({
          ...order,
          id: `${order.id}-child-${i}`,
          isMainRow: false,
          isChildRow: true,
        })
      }
    }

    return acc
  }, [])

  const renderRow = (item: any): JSX.Element => {
    const isExpanded = expandedRows.has(item.id)
    const isRejected = item.recon_status == ReconStatus.RECEIVED_REJECTED

    return (
      <>
        <ExpandableCell expanded={isExpanded}>
          {item.isMainRow && (
            <IconButton size="small" onClick={() => handleRowToggle(item.id)}>
              {isExpanded ? <KeyboardArrowUp fontSize="small" /> : <KeyboardArrowDown fontSize="small" />}
            </IconButton>
          )}
        </ExpandableCell>
        <StyledTableBodyCell>{item.reconTransactionId}</StyledTableBodyCell>
        <StyledTableBodyCell>{item.orderId}</StyledTableBodyCell>
        <StyledTableBodyCell>{item.receiverId}</StyledTableBodyCell>
        <StyledTableBodyCell>{item.collectorId}</StyledTableBodyCell>
        <StyledTableBodyCell>
          <StatusChip status={item.recon_status} />
        </StyledTableBodyCell>
        <StyledTableBodyCell>{formatCurrency(item.inter_np_settlement || 0)}</StyledTableBodyCell>
        <StyledTableBodyCell>{formatCurrency(item.commission || 0)}</StyledTableBodyCell>
        <StyledTableBodyCell>{formatCurrency(item.tcs || 0)}</StyledTableBodyCell>
        <StyledTableBodyCell>{formatCurrency(item.tds || 0)}</StyledTableBodyCell>
        <StyledTableBodyCell>{formatCurrency(item.withholding_amount || 0)}</StyledTableBodyCell>
        <StyledTableBodyCell>{formatDate(item.receivedDate)}</StyledTableBodyCell>

        <StyledTableBodyCell>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <ActionIconButton onClick={() => onAccept(item)} acceptButton={true} disabled={isRejected}>
              <Check fontSize="small" />
            </ActionIconButton>
            <ActionIconButton onClick={() => onReject(item)} rejectButton={true} disabled={isRejected}>
              <Close fontSize="small" />
            </ActionIconButton>
            <Button variant="contained" size="small" onClick={() => onSettleOffline?.(item)}>
              Settle Offline
            </Button>
          </div>
        </StyledTableBodyCell>
      </>
    )
  }

  const counterpartyInfos = selectedUser?.counterparty_infos || []

  return (
    <Table
      columns={[
        ...incomingRequestColumns,
        // { id: 'status', label: 'Status' }, // add Status column
        // { id: 'actions', label: 'Actions' }, // keep Actions column
      ]}
      data={expandedData?.map((item) => ({
        ...item,
        collector_id: counterpartyInfos.find((info) => info.id === item.collector_id)?.nickName || item.collector_id,
        receiver_id: counterpartyInfos.find((info) => info.id === item.receiver_id)?.nickName || item.receiver_id,
      }))}
      totalCount={totalCount}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      renderRow={renderRow}
      hideCheckboxes={true}
      getItemId={getItemId}
      expandable={true}
    />
  )
}

export default IncomingRequestsTable
