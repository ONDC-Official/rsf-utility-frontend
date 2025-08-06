import { FC } from 'react'
import { TableRow, TableCell, Checkbox } from '@mui/material'
import Table from 'components/common/Table'
import { ISettlementOrder } from 'interfaces/settlementGenerator'
import { columns } from 'pages/SettlementGenerator/data'

interface IProps {
  orders: ISettlementOrder[]
  columnsCount: number
  page: number
  rowsPerPage: number
  setPage: (p: number) => void
  setRowsPerPage: (r: number) => void
  selectedOrders: Set<string>
  onCheckboxChange: (id: string, checked: boolean) => void
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
}) => {
  const renderRow = (order: ISettlementOrder) => (
    <TableRow key={order.id}>
      <TableCell padding="checkbox">
        <Checkbox
          checked={selectedOrders.has(order.id)}
          onChange={(e) => onCheckboxChange(order.id, e.target.checked)}
        />
      </TableCell>
      <TableCell>{order.orderId}</TableCell>
      <TableCell>{order.collectorId}</TableCell>
      <TableCell>{order.receiverId}</TableCell>
      <TableCell>₹{order.totalOrderValue.toFixed(2)}</TableCell>
      <TableCell>₹{order.commission.toFixed(2)}</TableCell>
      <TableCell>₹{order.interNpTax.toFixed(2)}</TableCell>
      <TableCell>₹{order.interNpSettlement.toFixed(2)}</TableCell>
      <TableCell>{order.provider}</TableCell>
      <TableCell>{order.dueDate}</TableCell>
    </TableRow>
  )

  return (
    <Table
      columns={columns}
      data={orders}
      totalCount={columnsCount}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={setPage}
      onRowsPerPageChange={setRowsPerPage}
      renderRow={renderRow}
    />
  )
}

export default OrderTable
