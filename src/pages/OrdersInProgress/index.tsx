=import React, { useState } from 'react'
import { TableCell } from '@mui/material'
import { CalendarToday, GetApp } from '@mui/icons-material'
import Table from 'components/common/Table'
import Select from 'components/common/Select'
import { IOrder } from 'interfaces/order'
import { generateOrdersData } from 'data/ordersData'
import { receiverOptions, columns } from 'pages/OrdersInProgress/data'
import { TableCellStyles } from 'enums/styles'
import { TypographyVariant } from 'enums/typography'
import { StatusChip } from 'styles/components/Chip.styled'
import { OutlinedFilterButton, ContainedExportButton } from 'styles/components/Button.styled'
import {
  Container,
  Header,
  HeaderLeft,
  HeaderRight,
  PageTitle,
  PageSubtitle,
  ReceiverLabel,
  Wrapper,
  TableHeader,
  TableActions,
  TableTitle,
} from 'styles/pages/OrdersInProgress.styled'

const OrdersInProgress: React.FC = () => {
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [receiverId, setReceiverId] = useState('BPP_001')
  const allOrders = generateOrdersData(256)
  const totalCount = allOrders.length
  const startIndex = (page - 1) * rowsPerPage
  const currentOrders = allOrders.slice(startIndex, startIndex + rowsPerPage)

  const renderRow = (order: IOrder) => (
    <>
      <TableCell sx={TableCellStyles.DEFAULT}>{order.orderId}</TableCell>
      <TableCell sx={TableCellStyles.DEFAULT}>{order.collectorId}</TableCell>
      <TableCell sx={TableCellStyles.DEFAULT}>{order.receiverId}</TableCell>
      <TableCell sx={TableCellStyles.DEFAULT}>
        <StatusChip label={order.orderStatus} size="small" />
      </TableCell>
      <TableCell sx={TableCellStyles.DEFAULT}>₹{order.totalOrderValue.toFixed(2)}</TableCell>
      <TableCell sx={TableCellStyles.DEFAULT}>{order.bffPercent}%</TableCell>
      <TableCell sx={TableCellStyles.DEFAULT}>{order.dueDate}</TableCell>
    </>
  )
  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage)
    setPage(1)
  }

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <PageTitle variant={TypographyVariant.H3Semibold}>Orders In Progress</PageTitle>
          <PageSubtitle>Monitor orders currently being processed</PageSubtitle>
        </HeaderLeft>
        <HeaderRight>
          <ReceiverLabel variant={TypographyVariant.Body2Semibold}>Receiver ID</ReceiverLabel>
          <Select
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value as string)}
            options={receiverOptions}
            size="small"
          />
        </HeaderRight>
      </Header>
      <Wrapper>
        <TableHeader>
          <TableTitle variant={TypographyVariant.Caption1Semibold}>BPP_001</TableTitle>
          <TableActions>
            <OutlinedFilterButton variant="outlined" startIcon={<CalendarToday />}>
              Filter by date
            </OutlinedFilterButton>
            <ContainedExportButton variant="outlined" startIcon={<GetApp />}>
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
          hideCheckboxes={true}
        />
      </Wrapper>
    </Container>
  )
}

export default OrdersInProgress
