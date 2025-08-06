import { FC } from 'react'
import { CalendarToday, GetApp } from '@mui/icons-material'
import { Checkbox } from '@mui/material'
import Table from 'components/common/Table'
import { ISettlementOrder } from 'interfaces/settlementGenerator'
import { columns } from 'pages/SettlementGenerator/data'
import { StyledTableBodyCell, TableBodyCheckboxCell } from 'styles/components/Table.styled'
import { OutlinedFilterButton, ContainedExportButton } from 'styles/components/Button.styled'
import { Container, Header, Actions, Title } from 'styles/pages/OrdersReady.styled'

interface IProps {
  orders: ISettlementOrder[]
  columnsCount: number
  page: number
  rowsPerPage: number
  setPage: (p: number) => void
  setRowsPerPage: (r: number) => void
  selectedOrders: Set<string>
  onCheckboxChange: (id: string, checked: boolean) => void
  onSelectAll: (checked: boolean, currentPageItems: ISettlementOrder[]) => void
}

const OrderTable: FC<IProps> = ({
  orders,
  columnsCount,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  selectedOrders,
  onCheckboxChange,
  onSelectAll,
}) => {
  const getItemId = (item: ISettlementOrder) => item.id

  const renderRow = (order: ISettlementOrder, index: number) => (
    <>
      <TableBodyCheckboxCell>
        <Checkbox
          checked={selectedOrders.has(order.id)}
          onChange={(e) => onCheckboxChange(order.id, e.target.checked)}
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
        totalCount={columnsCount}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
        renderRow={renderRow}
        selectedItems={selectedOrders}
        onSelectAll={onSelectAll}
        getItemId={getItemId}
      />
    </Container>
  )
}

export default OrderTable
