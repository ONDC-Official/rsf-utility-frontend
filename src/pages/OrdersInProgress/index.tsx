import React, { useState, useEffect } from 'react'
import { TableCell, Typography } from '@mui/material'
import Table from 'components/common/Table'
import Select from 'components/common/Select'
import RequiredFieldLabel from 'components/common/RequiredFieldLabel'
import useGetOrders from 'hooks/queries/useGetOrders'
import { useUserContext } from 'context/userContext'
import { useLoader } from 'context/loaderContext'
import { columns } from 'pages/OrdersInProgress/data'
import { TableCellStyles } from 'enums/styles'
import { TypographyVariant } from 'enums/typography'
import { IOrderRow } from 'pages/OrdersInProgress/types'
import { Container, Header, HeaderLeft, HeaderRight, Wrapper, TableHeader } from 'styles/pages/OrdersInProgress.styled'
import { DOMAIN_CATEGORY_LABELS } from 'constants/domains'
import StatusChip from 'components/common/StatusChip'
import { formatDate, formatCurrency, formatNumber } from 'utils/formatters'

const OrdersInProgress: React.FC = () => {
  const { selectedUser } = useUserContext()
  const { showLoader, hideLoader } = useLoader()

  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [counterpartyId, setCounterpartyId] = useState('')

  const counterpartyOptions =
    selectedUser?.counterparty_ids.map((id) => ({
      value: id,
      label: id,
    })) || []

  // Auto-select first option when counterparty options change
  useEffect(() => {
    if (counterpartyOptions.length > 0 && !counterpartyId) {
      setCounterpartyId(counterpartyOptions[0].value)
    }
  }, [counterpartyOptions, counterpartyId])

  // Reset selection when selected user changes to ensure sync
  useEffect(() => {
    if (counterpartyOptions.length > 0) {
      const currentIsValid = counterpartyOptions.some((option) => option.value === counterpartyId)
      if (!currentIsValid) {
        setCounterpartyId(counterpartyOptions[0].value)
      }
    }
  }, [selectedUser, counterpartyOptions, counterpartyId])

  const {
    data: ordersData,
    isLoading,
    refetch: _refetch,
  } = useGetOrders(
    selectedUser?._id || '',
    {
      page,
      limit: rowsPerPage,
      status: 'In-progress',
      counterpartyId,
    },
    {
      enabled: !!selectedUser?._id,
    },
  )

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
        <StatusChip status={order.orderStatus} />
      </TableCell>
      <TableCell sx={TableCellStyles.DEFAULT}>{formatCurrency(order.totalOrderValue)}</TableCell>
      <TableCell sx={TableCellStyles.DEFAULT}>
        {formatNumber(typeof order.bffPercent === 'number' ? order.bffPercent : String(order.bffPercent) || '0')}
      </TableCell>
      <TableCell sx={TableCellStyles.DEFAULT}>{DOMAIN_CATEGORY_LABELS[order.domain] || order.domain}</TableCell>
      <TableCell sx={TableCellStyles.DEFAULT}>
        {formatDate(typeof order.dueDate === 'string' ? order.dueDate : String(order.dueDate) || '')}
      </TableCell>
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
          <RequiredFieldLabel>Counterparty ID</RequiredFieldLabel>
          <Select
            value={counterpartyId}
            onChange={(e) => setCounterpartyId(e.target.value as string)}
            options={counterpartyOptions}
            size="small"
          />
        </HeaderRight>
      </Header>
      <Wrapper>
        <TableHeader>
          <Typography variant={TypographyVariant.H6Bold}>{counterpartyId}</Typography>
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
