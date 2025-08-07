import { FC, useEffect, useState } from 'react'
import { CalendarToday, GetApp, Edit, Undo } from '@mui/icons-material'
import { Checkbox } from '@mui/material'
import Table from 'components/common/Table'
import { ISettlementOrder } from 'interfaces/settlementGenerator'
import { columns } from 'pages/SettlementGenerator/data'
import { IOrderTableProps } from 'pages/SettlementGenerator/types'
import { usePaginatedSelectableData } from 'hooks/usePaginatedSelectableData'
import { ActionIconButton, StyledTableBodyCell, TableBodyCheckboxCell } from 'styles/components/Table.styled'
import { OutlinedFilterButton, ContainedExportButton } from 'styles/components/Button.styled'
import { Container, Header, Actions, Title } from 'styles/pages/OrdersReady.styled'
import ReinitiateReconciliationModal from 'pages/SettlementGenerator/ReinitiateReconciliationModal'
import { ActionsCell } from 'styles/pages/SettlementGenerator.styled'
import Button from 'components/common/Button'

const OrderTable: FC<IOrderTableProps> = ({ allOrders, onSelectedOrdersChange }) => {
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
  } = usePaginatedSelectableData<ISettlementOrder>(allOrders)

  const [editedRows, setEditedRows] = useState<Record<string, Partial<ISettlementOrder>>>({})
  const [editingOrder, setEditingOrder] = useState<ISettlementOrder | null>(null)

  useEffect(() => {
    onSelectedOrdersChange(selectedOrders)
  }, [selectedOrders, onSelectedOrdersChange])

  const getItemId = (item: ISettlementOrder) => item.id

  const handleSave = (updatedFields: Partial<ISettlementOrder>) => {
    if (!editingOrder) return
    setEditedRows((prev) => ({
      ...prev,
      [editingOrder.id]: {
        ...prev[editingOrder.id],
        ...updatedFields,
      },
    }))
    setEditingOrder(null)
  }

  const renderRow = (order: ISettlementOrder) => {
    const edited = editedRows[order.id]
    const isEdited = !!edited

    const merged = { ...order, ...(edited || {}) }

    return (
      <>
        <TableBodyCheckboxCell>
          <Checkbox
            checked={selectedOrders.has(order.id)}
            onChange={(e) => handleCheckboxChange(order.id, e.target.checked)}
            size="small"
          />
        </TableBodyCheckboxCell>
        <StyledTableBodyCell className={isEdited ? 'highlight' : ''}>{merged.orderId}</StyledTableBodyCell>
        <StyledTableBodyCell className={isEdited ? 'highlight' : ''}>{merged.collectorId}</StyledTableBodyCell>
        <StyledTableBodyCell className={isEdited ? 'highlight' : ''}>{merged.receiverId}</StyledTableBodyCell>
        <StyledTableBodyCell className={isEdited ? 'highlight' : ''}>
          ₹{merged.totalOrderValue.toFixed(2)}
        </StyledTableBodyCell>
        <StyledTableBodyCell className={isEdited ? 'highlight' : ''}>
          ₹{merged.commission.toFixed(2)}
        </StyledTableBodyCell>
        <StyledTableBodyCell className={isEdited ? 'highlight' : ''}>
          ₹{merged.interNpTax.toFixed(2)}
        </StyledTableBodyCell>
        <StyledTableBodyCell className={isEdited ? 'highlight' : ''}>
          ₹{merged.interNpSettlement.toFixed(2)}
        </StyledTableBodyCell>
        <StyledTableBodyCell className={isEdited ? 'highlight' : ''}>{merged.provider}</StyledTableBodyCell>
        <StyledTableBodyCell className={isEdited ? 'highlight' : ''}>{merged.dueDate}</StyledTableBodyCell>
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
                delete newState[order.id]
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
          <OutlinedFilterButton variant="outlined" startIcon={<CalendarToday />}>
            Filter by date
          </OutlinedFilterButton>
          <ContainedExportButton variant="contained" startIcon={<GetApp />}>
            Export
          </ContainedExportButton>
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
            orderId: editingOrder?.orderId || '',
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
