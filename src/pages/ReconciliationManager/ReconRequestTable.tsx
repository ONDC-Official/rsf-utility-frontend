import { FC, useState } from 'react'
import { SelectChangeEvent, Typography } from '@mui/material'
import { Checkbox } from '@mui/material'
import Table from 'components/common/Table'
import Select from 'components/common/Select'
import StatusChip from 'components/common/StatusChip'
import { reconRequestColumns, receiverOptions } from 'pages/ReconciliationManager/data'
import { usePaginatedSelectableData } from 'hooks/usePaginatedSelectableData'
import { IReconciliationOrder } from 'interfaces/reconciliationManager'
import { RECONCILIATION_LABELS, TABLE_CELL_DEFAULTS, CURRENCY_SYMBOL } from 'pages/ReconciliationManager/constants'
import { IReconRequestTableProps } from 'pages/ReconciliationManager/types'
import { StyledTableBodyCell, TableBodyCheckboxCell } from 'styles/components/Table.styled'
import {
  TableContainer as Container,
  TableHeader as Header,
  TableReceiverSection,
  ReceiverLabel,
  Wrapper,
} from 'styles/pages/ReconciliationManager.styled'
import { TypographyVariant } from 'enums/typography'
import ExportIcon from 'assets/images/svg/ExportIcon'
import Button from 'components/common/Button'

const ReconRequestTable: FC<IReconRequestTableProps> = ({ allOrders, onCheckboxSelect }) => {
  const [receiverId, setReceiverId] = useState('RECV001')

  const {
    currentItems: orders,
    selectedItems: selectedOrders,
    totalCount,
    page,
    rowsPerPage,
    handlePageChange,
    handleRowsPerPageChange,
    handleCheckboxChange,
    handleSelectAll,
  } = usePaginatedSelectableData<IReconciliationOrder>(allOrders)

  const handleReceiverChange = (event: SelectChangeEvent<unknown>) => {
    setReceiverId(event.target.value as string)
  }

  const handleCheckboxChangeWithToast = (id: string, checked: boolean) => {
    handleCheckboxChange(id, checked)
    if (checked) {
      onCheckboxSelect()
    }
  }

  const getItemId = (item: IReconciliationOrder) => item.id

  const formatCurrency = (amount: number | undefined) => {
    return `${CURRENCY_SYMBOL}${amount?.toFixed(2) ?? TABLE_CELL_DEFAULTS.TOTAL_VALUE}`
  }

  const renderRow = (order: IReconciliationOrder) => (
    <>
      <TableBodyCheckboxCell>
        <Checkbox
          checked={selectedOrders.has(order.id)}
          onChange={(e) => handleCheckboxChangeWithToast(order.id, e.target.checked)}
          size="small"
        />
      </TableBodyCheckboxCell>
      <StyledTableBodyCell>{order.orderId || TABLE_CELL_DEFAULTS.ORDER_ID}</StyledTableBodyCell>
      <StyledTableBodyCell>{order.collectorId || TABLE_CELL_DEFAULTS.COLLECTOR_ID}</StyledTableBodyCell>
      <StyledTableBodyCell>{formatCurrency(order.totalValue)}</StyledTableBodyCell>
      <StyledTableBodyCell>{formatCurrency(order.settlementAmount)}</StyledTableBodyCell>
      <StyledTableBodyCell>{formatCurrency(order.commission)}</StyledTableBodyCell>
      <StyledTableBodyCell>
        <StatusChip status={order.orderStatus} />
      </StyledTableBodyCell>
      <StyledTableBodyCell style={{ color: '#DC3545' }}>{order.error || '-'}</StyledTableBodyCell>
    </>
  )

  return (
    <Container>
      <Header>
        <Typography variant={TypographyVariant.H6Bold}>RECV001</Typography>
        <TableReceiverSection>
          <ReceiverLabel>{RECONCILIATION_LABELS.RECEIVER_LABEL}</ReceiverLabel>
          <Select value={receiverId} onChange={handleReceiverChange} options={receiverOptions} size="small" />
          <Button variant="outlined" startIcon={<ExportIcon />}>
            Export
          </Button>
        </TableReceiverSection>
      </Header>

      <Wrapper>
        <Table
          columns={reconRequestColumns}
          data={orders}
          totalCount={totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          renderRow={renderRow}
          selectedItems={selectedOrders}
          onSelectAll={handleSelectAll}
          getItemId={getItemId}
        />
      </Wrapper>
    </Container>
  )
}

export default ReconRequestTable
