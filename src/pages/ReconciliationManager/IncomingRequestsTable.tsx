import { FC, useState } from 'react'
import { Tooltip, IconButton } from '@mui/material'
import { KeyboardArrowDown, KeyboardArrowUp, Check, Close } from '@mui/icons-material'
import Table from 'components/common/Table'
import { IIncomingRequest } from 'interfaces/reconciliationManager'
import { incomingRequestColumns } from 'pages/ReconciliationManager/data'
import { usePaginatedSelectableData } from 'hooks/usePaginatedSelectableData'
import { IIncomingRequestsTableProps } from 'pages/ReconciliationManager/types'
import { CURRENCY_SYMBOL, TABLE_CELL_DEFAULTS } from 'pages/ReconciliationManager/constants'
import { StyledTableBodyCell, ExpandableCell, ActionIconButton } from 'styles/components/Table.styled'

const IncomingRequestsTable: FC<IIncomingRequestsTableProps> = ({ data, onAccept, onReject }) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  const {
    currentItems: orders,
    totalCount,
    page,
    rowsPerPage,
    handlePageChange,
    handleRowsPerPageChange,
  } = usePaginatedSelectableData<IIncomingRequest>(data)

  const handleRowToggle = (orderId: string) => {
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

  const formatCurrency = (amount: number | undefined) => {
    return `${CURRENCY_SYMBOL}${amount?.toFixed(2) ?? TABLE_CELL_DEFAULTS.TOTAL_VALUE}`
  }

  const truncateText = (text: string, maxLength = 20) => {
    if (text.length <= maxLength) return text
    return `${text.substring(0, maxLength)}...`
  }

  const getItemId = (item: IIncomingRequest) => item.id

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

  const renderRow = (item: any) => {
    const isExpanded = expandedRows.has(item.id)

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
        <StyledTableBodyCell>{formatCurrency(item.requestedAmount)}</StyledTableBodyCell>
        <StyledTableBodyCell>{formatCurrency(item.currentAmount)}</StyledTableBodyCell>
        <StyledTableBodyCell>{formatCurrency(item.requestedCommission)}</StyledTableBodyCell>
        <StyledTableBodyCell>{formatCurrency(item.currentCommission)}</StyledTableBodyCell>
        <StyledTableBodyCell>
          <Tooltip title={item.reason || ''} arrow>
            <span>{truncateText(item.reason || '', 20)}</span>
          </Tooltip>
        </StyledTableBodyCell>
        <StyledTableBodyCell>{item.receivedDate}</StyledTableBodyCell>
        <StyledTableBodyCell>
          <div style={{ display: 'flex', gap: '4px' }}>
            <ActionIconButton onClick={() => onAccept(item)} acceptButton={true}>
              <Check fontSize="small" />
            </ActionIconButton>
            <ActionIconButton onClick={() => onReject(item)} rejectButton={true}>
              <Close fontSize="small" />
            </ActionIconButton>
          </div>
        </StyledTableBodyCell>
      </>
    )
  }

  return (
    <Table
      columns={incomingRequestColumns}
      data={expandedData}
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
