import React, { useState, useEffect } from 'react'
import { TableCell, Typography } from '@mui/material'
import DateFilterButton from 'components/common/DateFilterButton'
import Table from 'components/common/Table'
import Select from 'components/common/Select'
import useGetOrders from 'hooks/queries/useGetOrders'
import { useUserContext } from 'context/userContext'
import { useLoader } from 'context/loaderContext'
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
const OrdersInProgress: React.FC = () => {
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [receiverId, setReceiverId] = useState('BPP_001')

  const { selectedUser } = useUserContext()
  const { showLoader, hideLoader } = useLoader()

  const {
    data: ordersData,
    isLoading,
    refetch: _refetch,
  } = useGetOrders(selectedUser?._id || '', page, rowsPerPage, 'In-progress', {
    enabled: !!selectedUser?._id,
  })

  useEffect(() => {
    if (isLoading) {
      showLoader()
    } else {
      hideLoader()
    }
  }, [isLoading, showLoader, hideLoader])

  const orders = ordersData?.data || []
  const totalCount = orders.length

  const renderRow = (order: IOrderRow): JSX.Element => (
    <>
      <TableCell sx={TableCellStyles.DEFAULT}>{order.orderId}</TableCell>
      <TableCell sx={TableCellStyles.DEFAULT}>{order.collectorId}</TableCell>
      <TableCell sx={TableCellStyles.DEFAULT}>{order.receiverId}</TableCell>
      <TableCell sx={TableCellStyles.DEFAULT}>
        <StatusChip label={order.orderStatus} size="small" />
      </TableCell>
      <TableCell sx={TableCellStyles.DEFAULT}>₹{order.totalOrderValue.toFixed(2)}</TableCell>
      <TableCell sx={TableCellStyles.DEFAULT}>{order.bffPercent}%</TableCell>
      <TableCell sx={TableCellStyles.DEFAULT}>{order.domain}</TableCell>
      <TableCell sx={TableCellStyles.DEFAULT}>{order.dueDate}</TableCell>
    </>
  )

  const handlePageChange = (newPage: number): void => {
    setPage(newPage)
  }

  const handleRowsPerPageChange = (newRowsPerPage: number): void => {
    setRowsPerPage(newRowsPerPage)
    setPage(1)
  }

  const renderEmptyState = (): JSX.Element => (
    <Typography variant={TypographyVariant.H6} color="text.secondary">
      No orders in progress
    </Typography>
  )

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
            <DateFilterButton variant="outlined" />
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
          renderEmptyState={renderEmptyState}
        />
      </Wrapper>
    </Container>
  )
}

export default OrdersInProgress
