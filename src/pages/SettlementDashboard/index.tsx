import React, { useState } from 'react'
import { 
  TableRow, 
  TableCell, 
  Checkbox, 
  IconButton,
  Tooltip,
  Button
} from '@mui/material'
import { 
  CalendarToday, 
  GetApp, 
  Visibility
} from '@mui/icons-material'
import Table from '@components/common/Table'
import Select from '@components/common/Select'
import { ITableColumn } from '@interfaces/table'
import { ISettlementOrder } from '@interfaces/settlement'
import { generateSettlementOrderData } from '@data/settlementData'
import { OutlinedFilterButton, ContainedExportButton } from '@styles/components/Button.styled'
import {
  PageContainer,
  PageHeader,
  HeaderLeft,
  PageTitle,
  PageSubtitle,
  ReceiverLabel,
  TableContainer,
  TableHeader,
  TableTitle,
  StatusChip,
  ErrorContainer,
  FilterContainer,
  FilterRow,
  FilterLeft,
  FilterRight
} from '@styles/pages/SettlementDashboard.styled'

const SettlementDashboard: React.FC = () => {
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [counterpartyId, setCounterpartyId] = useState('')
  const [sortField, setSortField] = useState<string>('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const allOrders = generateSettlementOrderData(258)
  const totalCount = allOrders.length
  const startIndex = (page - 1) * rowsPerPage
  const currentOrders: any = allOrders.slice(startIndex, startIndex + rowsPerPage)

  const counterpartyOptions = [
    { value: 'BPP_001', label: 'BPP_001' },
    { value: 'BPP_002', label: 'BPP_002' },
    { value: 'BPP_003', label: 'BPP_003' },
  ]

  const columns: ITableColumn<ISettlementOrder>[] = [
    { id: 'orderId', label: 'Order ID', sortable: true },
    { id: 'collectorId', label: 'Collector ID', sortable: false },
    { id: 'receiverId', label: 'Receiver ID', sortable: false },
    { id: 'totalOrderValue', label: 'Total Order Value', sortable: false },
    { id: 'interNPSettlement', label: 'Inter NP Settlement', sortable: false },
    { id: 'commission', label: 'Commission', sortable: false },
    { id: 'status', label: 'Status', sortable: false },
    { id: 'settlementReference', label: 'Settlement Reference', sortable: false },
    { id: 'error', label: 'Error', sortable: false },
    { id: 'settlementInitiatedDate', label: 'Settlement Initiated Date', sortable: false },
    { id: 'actions', label: 'Actions', sortable: false },
  ]

  const renderRow :any= (order: ISettlementOrder, index: number) => (
    <TableRow key={order.id}>
      <TableCell padding="checkbox">
        <Checkbox />
      </TableCell>
      <TableCell>{order.orderId}</TableCell>
      <TableCell>{order.collectorId}</TableCell>
      <TableCell>{order.receiverId}</TableCell>
      <TableCell>₹{order.totalOrderValue.toFixed(2)}</TableCell>
      <TableCell>₹{order.interNPSettlement.toFixed(2)}</TableCell>
      <TableCell>₹{order.commission.toFixed(2)}</TableCell>
      <TableCell>
        <StatusChip status={order.status} label={order.status} />
      </TableCell>
      <TableCell>{order.settlementReference}</TableCell>
      <TableCell>
        <ErrorContainer>
          {order.hasError || order.error ? (
            <>
              <Tooltip title={order.errorMessage || order.error}>
                <IconButton size="small">
                  <Visibility fontSize="small" />
                </IconButton>
              </Tooltip>
              <span>{order.error}</span>
            </>
          ) : (
            '-'
          )}
        </ErrorContainer>
      </TableCell>
      <TableCell>{order.settlementInitiatedDate}</TableCell>
      <TableCell>
        {order.status === 'Not Settled' ? (
          <Button 
            variant="outlined" 
            size="small"
            sx={{ 
              textTransform: 'none',
              borderColor: '#1976d2',
              color: '#1976d2',
              '&:hover': {
                borderColor: '#1565c0',
                backgroundColor: 'rgba(25, 118, 210, 0.04)'
              }
            }}
          >
            Reconcile
          </Button>
        ) : (
          '-' // fallback when no button is shown
        )}
      </TableCell>
    </TableRow>
  )

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage)
    setPage(1)
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  return (
    <PageContainer>
      <PageHeader>
        <HeaderLeft>
          <PageTitle>Settlement Dashboard</PageTitle>
          <PageSubtitle>Monitor settlement status and manage reconciliation</PageSubtitle>
        </HeaderLeft>
        <FilterLeft>
          <ReceiverLabel>Counterparty ID</ReceiverLabel>
          <Select
            value={counterpartyId}
            onChange={(e) => setCounterpartyId(e.target.value as string)}
            options={counterpartyOptions}
            placeholder="Choose..."
          />
        </FilterLeft>
      </PageHeader>

      <TableContainer>
        <TableHeader>
          <TableTitle>BPP_001</TableTitle>
          <FilterContainer>
            <FilterRow>
              <FilterRight>
                <OutlinedFilterButton variant="outlined" startIcon={<CalendarToday />}>
                  Filter by date
                </OutlinedFilterButton>
                <ContainedExportButton variant="contained" startIcon={<GetApp />}>
                  Export
                </ContainedExportButton>
              </FilterRight>
            </FilterRow>
          </FilterContainer>
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
          onSort={handleSort}
          sortField={sortField}
          sortDirection={sortDirection}
        />
      </TableContainer>
    </PageContainer>
  )
}

export default SettlementDashboard
