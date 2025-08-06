import { FC, useEffect } from 'react'
import { CalendarToday, GetApp } from '@mui/icons-material'
import { Checkbox } from '@mui/material'
import Table from 'components/common/Table'
import { ISettlementOrder } from 'interfaces/settlementGenerator'
import { columns } from 'pages/SettlementGenerator/data'
import { IOrderTableProps } from 'pages/SettlementGenerator/types'
import { usePaginatedSelectableData } from 'hooks/usePaginatedSelectableData'
import { StyledTableBodyCell, TableBodyCheckboxCell } from 'styles/components/Table.styled'
import { OutlinedFilterButton, ContainedExportButton } from 'styles/components/Button.styled'
import { Container, Header, Actions, Title } from 'styles/pages/OrdersReady.styled'

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

  // Notify parent on selection change
  useEffect(() => {
    onSelectedOrdersChange(selectedOrders)
  }, [selectedOrders, onSelectedOrdersChange])

  const getItemId = (item: ISettlementOrder) => item.id

  const renderRow = (order: ISettlementOrder) => (
    <>
      <TableBodyCheckboxCell>
        <Checkbox
          checked={selectedOrders.has(order.id)}
          onChange={(e) => handleCheckboxChange(order.id, e.target.checked)}
          size="small"
        />
      </TableBodyCheckboxCell>
      <StyledTableBodyCell>{order.orderId}</StyledTableBodyCell>
      <StyledTableBodyCell>{order.collectorId}</StyledTableBodyCell>
      <StyledTableBodyCell>{order.receiverId}</StyledTableBodyCell>
      <StyledTableBodyCell>₹{order.totalOrderValue.toFixed(2)}</StyledTableBodyCell>
      <StyledTableBodyCell>₹{order.commission.toFixed(2)}</StyledTableBodyCell>
      <StyledTableBodyCell>₹{order.interNpTax.toFixed(2)}</StyledTableBodyCell>
      <StyledTableBodyCell>₹{order.interNpSettlement.toFixed(2)}</StyledTableBodyCell>
      <StyledTableBodyCell>{order.provider}</StyledTableBodyCell>
      <StyledTableBodyCell>{order.dueDate}</StyledTableBodyCell>
    </>
  )

  return (
    <Container>
      <Header>
        <Title>Select Orders for Settlement</Title>
        <Actions>
          <OutlinedFilterButton variant="outlined" startIcon={<CalendarToday />}>
            Filter by date
          </OutlinedFilterButton>
          <ContainedExportButton variant="outlined" startIcon={<GetApp />}>
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
    </Container>
  )
}

export default OrderTable
