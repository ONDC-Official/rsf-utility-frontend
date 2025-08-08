import { FC, useEffect, useState } from 'react'
import { Edit, Undo } from '@mui/icons-material'
import { Checkbox } from '@mui/material'
import Button from 'components/common/Button'
import DateRangePickerButton from 'components/common/DateRangePickerButton'
import Table from 'components/common/Table'
import { columns } from 'pages/SettlementGenerator/data'
import ReinitiateReconciliationModal from 'pages/SettlementGenerator/ReinitiateReconciliationModal'
import { IOrderTableProps } from 'pages/SettlementGenerator/types'
import { usePaginatedSelectableData } from 'hooks/usePaginatedSelectableData'
import { IUserSettlementItem } from 'interfaces/settlement'
import { ActionIconButton, StyledTableBodyCell, TableBodyCheckboxCell } from 'styles/components/Table.styled'
import { IDateRange } from 'components/common/DateRangePickerButton/types'
import { Container, Header, Actions, Title } from 'styles/pages/OrdersReady.styled'
import { ActionsCell } from 'styles/pages/SettlementGenerator.styled'

const OrderTable: FC<IOrderTableProps> = ({ allOrders, onSelectedOrdersChange }) => {
  const [dateRange, setDateRange] = useState<IDateRange>({ startDate: null, endDate: null })
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
  } = usePaginatedSelectableData<IUserSettlementItem>(allOrders)

  const [editedRows, setEditedRows] = useState<Record<string, Partial<IUserSettlementItem>>>({})
  const [editingOrder, setEditingOrder] = useState<IUserSettlementItem | null>(null)

  useEffect(() => {
    onSelectedOrdersChange(selectedOrders)
  }, [selectedOrders, onSelectedOrdersChange])

  const getItemId = (item: IUserSettlementItem): string => item.order_id

  const handleSave = (updatedFields: Partial<IUserSettlementItem>): void => {
    if (!editingOrder) return
    setEditedRows((prev) => ({
      ...prev,
      [editingOrder.order_id]: {
        ...prev[editingOrder.order_id],
        ...updatedFields,
      },
    }))
    setEditingOrder(null)
  }

  const handleDateRangeChange = (newDateRange: IDateRange): void => {
    setDateRange(newDateRange)
  }

  const renderRow = (order: IUserSettlementItem): JSX.Element => {
    const edited = editedRows[order.order_id]
    const isEdited = !!edited

    const merged = { ...order, ...(edited || {}) }

    return (
      <>
        <TableBodyCheckboxCell>
          <Checkbox
            checked={selectedOrders.has(order.order_id)}
            onChange={(e) => handleCheckboxChange(order.order_id, e.target.checked)}
            size="small"
          />
        </TableBodyCheckboxCell>
        <StyledTableBodyCell className={isEdited ? 'highlight' : ''}>{merged.order_id}</StyledTableBodyCell>
        <StyledTableBodyCell className={isEdited ? 'highlight' : ''}>{merged.collector_id}</StyledTableBodyCell>
        <StyledTableBodyCell className={isEdited ? 'highlight' : ''}>{merged.receiver_id}</StyledTableBodyCell>
        <StyledTableBodyCell className={isEdited ? 'highlight' : ''}>
          ₹{merged.total_order_value.toFixed(2)}
        </StyledTableBodyCell>
        <StyledTableBodyCell className={isEdited ? 'highlight' : ''}>
          ₹{merged.commission.toFixed(2)}
        </StyledTableBodyCell>
        <StyledTableBodyCell className={isEdited ? 'highlight' : ''}>₹{merged.tax.toFixed(2)}</StyledTableBodyCell>
        <StyledTableBodyCell className={isEdited ? 'highlight' : ''}>
          ₹{merged.inter_np_settlement.toFixed(2)}
        </StyledTableBodyCell>
        <StyledTableBodyCell className={isEdited ? 'highlight' : ''}>{merged.provider_id}</StyledTableBodyCell>
        <StyledTableBodyCell className={isEdited ? 'highlight' : ''}>{merged.due_date}</StyledTableBodyCell>
        <ActionsCell>
          <ActionIconButton size="small" onClick={() => setEditingOrder(order)}>
            <Edit fontSize="small" />
          </ActionIconButton>
          <ActionIconButton
            size="small"
            disabled={!isEdited}
            onClick={() => {
              setEditedRows((prev) => {
                const newState = { ...prev }
                delete newState[order.order_id]
                return newState
              })
            }}
          >
            <Undo fontSize="small" />
          </ActionIconButton>
        </ActionsCell>
      </>
    )
  }

  return (
    <Container>
      <Header>
        <Title>Select Orders for Settlement</Title>
        <Actions>
          {Object.keys(editedRows).length > 0 && <Button variant="contained">Save edited order</Button>}
          <DateRangePickerButton
            variant="outlined"
            selectedDateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
          />
        </Actions>
      </Header>

      <Table
        columns={columns}
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

      {editingOrder && (
        <ReinitiateReconciliationModal
          open={!!editingOrder}
          onClose={() => setEditingOrder(null)}
          data={{
            orderId: editingOrder?.order_id || '',
            settlementAmount: 0,
            commission: 0,
            tcs: 0,
            tds: 0,
            withholdingAmount: 0,
          }}
          onSave={handleSave}
        />
      )}
    </Container>
  )
}

export default OrderTable
