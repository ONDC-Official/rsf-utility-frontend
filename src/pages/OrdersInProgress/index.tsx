import React, { useState } from 'react'
import { TableRow, TableCell, Checkbox } from '@mui/material'
import { CalendarToday, GetApp } from '@mui/icons-material'
import Table from '@components/common/Table'
import Select from '@components/common/Select'
import { ITableColumn } from '@interfaces/table'
import { IOrder } from '@interfaces/order'
import { generateOrdersData } from '@data/ordersData'
import { StatusChip } from '@styles/components/Chip.styled'
import { OutlinedFilterButton, ContainedExportButton } from '@styles/components/Button.styled'
import {
  PageContainer,
  PageHeader,
  HeaderLeft,
  HeaderRight,
  PageTitle,
  PageSubtitle,
  ReceiverLabel,
  TableContainer,
  TableHeader,
  TableActions,
  TableTitle,
} from '@styles/pages/OrdersInProgress.styled'

const OrdersInProgress: React.FC = () => {
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [receiverId, setReceiverId] = useState('BPP_001')

  const allOrders = generateOrdersData(256)
  const totalCount = allOrders.length
  const startIndex = (page - 1) * rowsPerPage
  const currentOrders = allOrders.slice(startIndex, startIndex + rowsPerPage)

  const receiverOptions = [
    { value: 'BPP_001', label: 'BPP_001' },
    { value: 'BPP_002', label: 'BPP_002' },
    { value: 'BPP_003', label: 'BPP_003' },
  ]

  const columns: ITableColumn<IOrder>[] = [
    { id: 'orderId', label: 'Order ID' },
    { id: 'collectorId', label: 'Collector ID' },
    { id: 'receiverId', label: 'Receiver ID' },
    { id: 'orderStatus', label: 'Order Status' },
    { id: 'totalOrderValue', label: 'Total Order Value' },
    { id: 'bffPercent', label: 'BFF %' },
    { id: 'dueDate', label: 'Due Date' },
  ]

  const renderRow = (order: IOrder, index: number) => (
    <TableRow key={order.id}>
      <TableCell padding="checkbox">
        <Checkbox />
      </TableCell>
      <TableCell>{order.orderId}</TableCell>
      <TableCell>{order.collectorId}</TableCell>
      <TableCell>{order.receiverId}</TableCell>
      <TableCell>
        <StatusChip label={order.orderStatus} size="small" />
      </TableCell>
      <TableCell>₹{order.totalOrderValue.toFixed(2)}</TableCell>
      <TableCell>{order.bffPercent}%</TableCell>
      <TableCell>{order.dueDate}</TableCell>
    </TableRow>
  )

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage)
    setPage(1)
  }

  return (
    <PageContainer>
      <PageHeader>
        <HeaderLeft>
          <PageTitle>Orders In Progress</PageTitle>
          <PageSubtitle>Monitor orders currently being processed</PageSubtitle>
        </HeaderLeft>

        <HeaderRight>
          <ReceiverLabel>Receiver ID</ReceiverLabel>
          <Select
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value as string)}
            options={receiverOptions}
          />
        </HeaderRight>
      </PageHeader>

      <TableContainer>
        <TableHeader>
          <TableTitle>BPP_001</TableTitle>

          <TableActions>
            <OutlinedFilterButton variant="outlined" startIcon={<CalendarToday />}>
              Filter by date
            </OutlinedFilterButton>
            <ContainedExportButton variant="contained" startIcon={<GetApp />}>
              Export
            </ContainedExportButton>
          </TableActions>
        </TableHeader>

        <Table
          columns={columns}
          data={currentOrders}
          totalCount={totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          renderRow={renderRow}
        />
      </TableContainer>
    </PageContainer>
  )
}

export default OrdersInProgress
