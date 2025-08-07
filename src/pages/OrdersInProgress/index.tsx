import React, { useState } from 'react'
import { TableCell, Typography } from '@mui/material'
import Table from 'components/common/Table'
import Select from 'components/common/Select'
import useGetOrders from 'hooks/queries/useGetOrders'
import { useUserContext } from 'context/userContext'
import { receiverOptions, columns } from 'pages/OrdersInProgress/data'
import { TableCellStyles } from 'enums/styles'
import { TypographyVariant } from 'enums/typography'
import { IOrderRow } from 'pages/OrdersInProgress/types'
import { StatusChip } from 'styles/components/Chip.styled'
import {
  Container,
  Header,
  HeaderLeft,
  HeaderRight,
  ReceiverLabel,
  Wrapper,
  TableHeader,
  TableActions,
} from 'styles/pages/OrdersInProgress.styled'
import Button from 'components/common/Button'
import CalenderIcon from 'assets/images/svg/CalendarIcon'
import ExportIcon from 'assets/images/svg/ExportIcon'
import ChveronIcon from 'assets/images/svg/ChveronIcon'

const OrdersInProgress: React.FC = () => {
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [receiverId, setReceiverId] = useState('BPP_001')

  const { selectedUser } = useUserContext()

  const {
    data: ordersData,
    isLoading: _isLoading,
    refetch: _refetch,
  } = useGetOrders(selectedUser?._id || '', page, rowsPerPage, 'In-progress', {
    enabled: !!selectedUser?._id,
  })

  const orders = ordersData?.data || []
  const totalCount = orders.length

  const renderRow = (order: IOrderRow) => (
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
          <Typography variant={TypographyVariant.H4}>Orders In Progress</Typography>
          <Typography variant={TypographyVariant.H6}>Monitor orders currently being processed</Typography>
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
          <Typography variant={TypographyVariant.H6Bold}>BPP_001</Typography>
          <TableActions>
            <Button variant="outlined" startIcon={<CalenderIcon />} endIcon={<ChveronIcon />}>
              Filter by date
            </Button>
            <Button variant="outlined" startIcon={<ExportIcon />}>
              Export
            </Button>
          </TableActions>
        </TableHeader>
        <Table
          columns={columns}
          data={orders}
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
