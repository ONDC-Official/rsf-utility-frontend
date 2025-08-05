import React, { useState, useEffect } from 'react'
import { TableRow, TableCell, Checkbox, SelectChangeEvent, Box } from '@mui/material'
import { CalendarToday, GetApp } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import Table from '@components/common/Table'
import Select from '@components/common/Select'
import Toast from '@components/common/Toast'
import { ITableColumn } from '@interfaces/table'
import { IOrderReady, IToastState, PrepareButtonState } from '@interfaces/ordersReady'
import { generateOrdersReadyData } from '@data/ordersReadyData'
import { OutlinedFilterButton, ContainedExportButton } from '@styles/components/Button.styled'
import { PrepareButton } from '@styles/components/PrepareButton.styled'
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
} from '@styles/pages/OrdersReady.styled'

const OrdersReady: React.FC = () => {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [receiverId, setReceiverId] = useState('BPP_001')
  const [buttonRef, setButtonRef] = useState<HTMLElement | null>(null)
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set())
  const [prepareButtonState, setPrepareButtonState] = useState<PrepareButtonState>('disabled')
  const [toast, setToast] = useState<IToastState>({
    isVisible: false,
    message: '',
    count: 0,
  })

  const allOrders = generateOrdersReadyData(256)
  const totalCount = allOrders.length
  const startIndex = (page - 1) * rowsPerPage
  const currentOrders = allOrders.slice(startIndex, startIndex + rowsPerPage)

  const receiverOptions = [
    { value: 'BPP_001', label: 'BPP_001' },
    { value: 'BPP_002', label: 'BPP_002' },
    { value: 'BPP_003', label: 'BPP_003' },
  ]

  const columns: ITableColumn<IOrderReady>[] = [
    { id: 'orderId', label: 'Order ID' },
    { id: 'collectorId', label: 'Collector ID' },
    { id: 'receiverId', label: 'Receiver ID' },
    { id: 'totalOrderValue', label: 'Total Order Value' },
    { id: 'commission', label: 'Commission' },
    { id: 'sellerType', label: 'Seller Type' },
    { id: 'dueDate', label: 'Due Date' },
  ]

  useEffect(() => {
    const selectedCount = selectedOrders.size
    if (selectedCount === 0) {
      setPrepareButtonState('disabled')
    } else if (prepareButtonState === 'disabled' || prepareButtonState === 'prepare') {
      setPrepareButtonState('prepare')
    }
  }, [selectedOrders.size, prepareButtonState])

  const handleCheckboxChange = (orderId: string, checked: boolean) => {
    const newSelectedOrders = new Set(selectedOrders)
    if (checked) {
      newSelectedOrders.add(orderId)
    } else {
      newSelectedOrders.delete(orderId)
    }

    setSelectedOrders(newSelectedOrders)
  }

  const handlePrepareClick = () => {
    if (prepareButtonState === 'prepare') {
      const selectedCount = selectedOrders.size
      setToast({
        isVisible: true,
        message: `${selectedCount} order${selectedCount > 1 ? 's' : ''} have been prepared for settlement.`,
        count: selectedCount,
      })
      setPrepareButtonState('generate')
    } else if (prepareButtonState === 'generate') {
      navigate('/settlement-generator')
    }
  }

  const handleToastClose = () => {
    setToast((prev) => ({ ...prev, isVisible: false }))
  }

  useEffect(() => {
    if (toast.isVisible) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, isVisible: false }))
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [toast.isVisible])

  const renderRow = (order: IOrderReady, index: number) => (
    <TableRow key={order.id}>
      <TableCell padding="checkbox">
        <Checkbox
          checked={selectedOrders.has(order.id)}
          onChange={(e) => handleCheckboxChange(order.id, e.target.checked)}
        />
      </TableCell>
      <TableCell>{order.orderId}</TableCell>
      <TableCell>{order.collectorId}</TableCell>
      <TableCell>{order.receiverId}</TableCell>
      <TableCell>₹{order.totalOrderValue.toFixed(2)}</TableCell>
      <TableCell>₹{order.commission.toFixed(2)}</TableCell>
      <TableCell>{order.sellerType}</TableCell>
      <TableCell>{order.dueDate}</TableCell>
    </TableRow>
  )

  const getButtonText = () => {
    const selectedCount = selectedOrders.size
    if (prepareButtonState === 'disabled') {
      return 'Prepare (0 selected)'
    } else if (prepareButtonState === 'prepare') {
      return `Prepare (${selectedCount} selected)`
    } else {
      return `Generate (${selectedCount} selected)`
    }
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage)
    setPage(1)
  }

  const handleReceiverChange = (event: SelectChangeEvent<unknown>) => {
    setReceiverId(event.target.value as string)
  }

  return (
    <PageContainer>
      <Toast isVisible={toast.isVisible} title="Orders Prepared" message={toast.message} onClose={handleToastClose} />

      <PageHeader>
        <HeaderLeft>
          <PageTitle>Orders Ready</PageTitle>
          <PageSubtitle>Select orders to prepare for settlement</PageSubtitle>
        </HeaderLeft>

        <HeaderRight>
          <ReceiverLabel>Receiver ID</ReceiverLabel>
          <Select value={receiverId} onChange={handleReceiverChange} options={receiverOptions} size="small" />
          <Box sx={{ position: 'relative' }} ref={setButtonRef}>
            <PrepareButton
              variant="outlined"
              onClick={handlePrepareClick}
              disabled={prepareButtonState === 'disabled'}
              $isDisabled={prepareButtonState === 'disabled'}
              $isActive={prepareButtonState === 'prepare' || prepareButtonState === 'generate'}
            >
              {getButtonText()}
            </PrepareButton>
          </Box>
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

export default OrdersReady
