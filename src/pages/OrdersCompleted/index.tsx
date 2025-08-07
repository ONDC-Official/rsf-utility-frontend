import React, { useState } from 'react'
import { TableCell } from '@mui/material'
import { CalendarToday, GetApp } from '@mui/icons-material'
import Table from 'components/common/Table'
import Select from 'components/common/Select'
import useGetOrders from 'hooks/queries/useGetOrders'
import { useUserContext } from 'context/userContext'
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

const receiverOptions = [
  { value: 'BPP_001', label: 'BPP_001' },
  { value: 'BPP_002', label: 'BPP_002' },
  { value: 'BPP_003', label: 'BPP_003' },
]

const columns = [
  { id: 'orderId', label: 'Order ID' },
  { id: 'collectorId', label: 'Collector ID' },
  { id: 'receiverId', label: 'Receiver ID' },
  { id: 'totalOrderValue', label: 'Total Order Amount' },
  { id: 'commission', label: 'Commission' },
  { id: 'sellerType', label: 'Seller Type' },
  { id: 'dueDate', label: 'Due Date' },
]

const OrdersCompleted: React.FC = () => {
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [receiverId, setReceiverId] = useState('BPP_001')

  const { selectedUser } = useUserContext()

  const {
    data: ordersData,
    isLoading: _isLoading,
    refetch: _refetch,
  } = useGetOrders(selectedUser?._id || '', page, rowsPerPage, 'Completed', {
    enabled: !!selectedUser?._id,
  })

  const orders = ordersData?.data || []
  const totalCount = orders.length

  const renderRow = (order: any) => {
    const sellerType = order.msn ? 'MSN' : 'ISN'

    return (
      <>
        <TableCell sx={TableCellStyles.DEFAULT}>{order.orderId}</TableCell>
        <TableCell sx={TableCellStyles.DEFAULT}>{order.collectorId}</TableCell>
        <TableCell sx={TableCellStyles.DEFAULT}>{order.receiverId}</TableCell>
        <TableCell sx={TableCellStyles.DEFAULT}>₹{order.totalOrderValue.toFixed(2)}</TableCell>
        <TableCell sx={TableCellStyles.DEFAULT}>{order.bffPercent}</TableCell>
        <TableCell sx={TableCellStyles.DEFAULT}>
          <StatusChip label={sellerType} size="small" />
        </TableCell>
        <TableCell sx={TableCellStyles.DEFAULT}>{order.dueDate}</TableCell>
      </>
    )
  }

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
          <PageTitle variant={TypographyVariant.H3Semibold}>Orders Completed</PageTitle>
          <PageSubtitle>View completed orders and their settlement details</PageSubtitle>
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
            <ContainedExportButton variant="contained" startIcon={<GetApp />}>
              Export
            </ContainedExportButton>
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

export default OrdersCompleted
