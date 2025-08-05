import React, { useState } from 'react'
import { TableRow, TableCell, Checkbox, SelectChangeEvent } from '@mui/material'
import { CalendarToday, GetApp, Warning, Event, Visibility, Download } from '@mui/icons-material'
import Table from '@components/common/Table'
import Select from '@components/common/Select'
import Switch from '@components/common/Switch'
import InputField from '@components/common/InputField'
import SummaryCard from '@components/common/SummaryCard'
import { ITableColumn } from '@interfaces/table'
import { ISettlementOrder, ISettlementSummary } from '@interfaces/settlementGenerator'
import { generateSettlementOrdersData, generatePayloadData } from '@data/settlementGeneratorData'
import { OutlinedFilterButton, ContainedExportButton } from '@styles/components/Button.styled'
import {
  PageContainer,
  PageHeader,
  HeaderLeft,
  HeaderRight,
  PageTitle,
  PageSubtitle,
  AlertContainer,
  SettlementModeContainer,
  ModeLeft,
  ModeRight,
  ModeContent,
  ModeTitle,
  ModeDescription,
  CounterpartyLabel,
  OrderSelectionContainer,
  OrderSelectionHeader,
  SectionTitle,
  ActionButtons,
  SummaryContainer,
  SummaryHeader,
  SummaryCards,
  Divider,
  CustomDateSection,
  ButtonSection,
  PayloadPreviewContainer,
  PayloadHeader,
  PayloadActions,
  JsonPreview,
  ModeRow,
  CustomDateLabel,
} from '@styles/pages/SettlementGenerator.styled'

const SettlementGenerator: React.FC = () => {
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [counterpartyId, setCounterpartyId] = useState('')
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set())
  const [isManualMode, setIsManualMode] = useState(true)
  const [customDueDate, setCustomDueDate] = useState('')
  const [showPayloadPreview, setShowPayloadPreview] = useState(false)

  const allOrders = generateSettlementOrdersData(256)
  const totalCount = allOrders.length
  const startIndex = (page - 1) * rowsPerPage
  const currentOrders = allOrders.slice(startIndex, startIndex + rowsPerPage)

  const counterpartyOptions = [
    { value: 'COUNTER_001', label: 'Counterparty 001' },
    { value: 'COUNTER_002', label: 'Counterparty 002' },
  ]

  const columns: ITableColumn<ISettlementOrder>[] = [
    { id: 'orderId', label: 'Order ID' },
    { id: 'collectorId', label: 'Collector ID' },
    { id: 'receiverId', label: 'Receiver ID' },
    { id: 'totalOrderValue', label: 'Total Order Value' },
    { id: 'commission', label: 'Commission' },
    { id: 'interNpTax', label: 'Inter NP Tax' },
    { id: 'interNpSettlement', label: 'Inter NP Settlement' },
    { id: 'provider', label: 'Provider' },
    { id: 'dueDate', label: 'Due Date' },
  ]

  const handleCheckboxChange = (orderId: string, checked: boolean) => {
    const newSelectedOrders = new Set(selectedOrders)
    if (checked) {
      newSelectedOrders.add(orderId)
    } else {
      newSelectedOrders.delete(orderId)
    }
    setSelectedOrders(newSelectedOrders)
  }

  const calculateSummary = (): ISettlementSummary => {
    const selectedOrdersList = Array.from(selectedOrders)
    const selectedOrdersData = allOrders.filter((order) => selectedOrdersList.includes(order.id))
    const totalAmount = selectedOrdersData.reduce((sum, order) => sum + order.interNpSettlement, 0)

    return {
      selectedOrders: selectedOrders.size,
      totalAmount,
      batchSize: '1 batch',
    }
  }

  const handleGeneratePreview = () => {
    setShowPayloadPreview(true)
  }

  const renderRow = (order: ISettlementOrder, index: number) => (
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
      <TableCell>₹{order.interNpTax.toFixed(2)}</TableCell>
      <TableCell>₹{order.interNpSettlement.toFixed(2)}</TableCell>
      <TableCell>{order.provider}</TableCell>
      <TableCell>{order.dueDate}</TableCell>
    </TableRow>
  )

  const summary = calculateSummary()
  const payloadData = generatePayloadData(Array.from(selectedOrders), summary.totalAmount)

  return (
    <PageContainer>
      <PageHeader>
        <HeaderLeft>
          <PageTitle>Settlement Generator</PageTitle>
          <PageSubtitle>Select orders to prepare for settlement</PageSubtitle>
        </HeaderLeft>

        <HeaderRight>
          <AlertContainer>
            <Warning fontSize="small" />
            Settlement Window closes at 11:00 PM
          </AlertContainer>
        </HeaderRight>
      </PageHeader>

      <SettlementModeContainer>
        <ModeContent>
          <ModeTitle>Settlement Mode</ModeTitle>
          <ModeRow>
            <Switch checked={isManualMode} onChange={(e) => setIsManualMode(e.target.checked)} />
            <ModeDescription>Manual Mode Manually select orders for settlement</ModeDescription>
          </ModeRow>
        </ModeContent>

        <ModeRight>
          <CounterpartyLabel>Counterparty ID</CounterpartyLabel>
          <Select
            value={counterpartyId}
            onChange={(e: SelectChangeEvent<unknown>) => setCounterpartyId(e.target.value as string)}
            options={counterpartyOptions}
            displayEmpty
            size="small"
            renderValue={(selected) => {
              if (!selected) {
                return <span style={{ color: '#9CA3AF' }}>Choose...</span>
              }
              return selected as React.ReactNode
            }}
          />
        </ModeRight>
      </SettlementModeContainer>

      <OrderSelectionContainer>
        <OrderSelectionHeader>
          <SectionTitle>Select Orders for Settlement</SectionTitle>
          <ActionButtons>
            <OutlinedFilterButton variant="outlined" startIcon={<CalendarToday />}>
              Filter by date
            </OutlinedFilterButton>
            <ContainedExportButton variant="contained" startIcon={<GetApp />}>
              Export
            </ContainedExportButton>
          </ActionButtons>
        </OrderSelectionHeader>

        <Table
          columns={columns}
          data={currentOrders}
          totalCount={totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
          renderRow={renderRow}
        />
      </OrderSelectionContainer>

      {selectedOrders.size > 0 && (
        <SummaryContainer>
          <SummaryHeader>Settlement Summary</SummaryHeader>
          <SummaryCards>
            <SummaryCard label="Selected Orders" value={summary.selectedOrders} bgColor="#F59E0B" />
            <SummaryCard
              label="Total Settlement Amount"
              value={`₹${summary.totalAmount.toLocaleString()}`}
              bgColor="#EF4444"
            />
            <SummaryCard label="Batch Size" value={summary.batchSize} bgColor="#3B82F6" />
          </SummaryCards>

          <Divider />

          <CustomDateSection>
            <InputField
              customLabel="Custom Due Date (optional)"
              placeholder="dd/mm/yyyy"
              value={customDueDate}
              onChange={(e) => setCustomDueDate(e.target.value)}
              trailingIcon={<Event />}
            />
          </CustomDateSection>

          <ButtonSection>
            <ContainedExportButton variant="contained" startIcon={<Visibility />} onClick={handleGeneratePreview}>
              Generate & Preview Payload
            </ContainedExportButton>
            <OutlinedFilterButton variant="outlined" startIcon={<Event />}>
              Schedule Settlement
            </OutlinedFilterButton>
          </ButtonSection>
        </SummaryContainer>
      )}

      {showPayloadPreview && (
        <PayloadPreviewContainer>
          <PayloadHeader>
            <SectionTitle>Settlement Payload Preview</SectionTitle>
            <PayloadActions>
              <ContainedExportButton variant="contained" startIcon={<Visibility />}>
                Trigger Settlement API
              </ContainedExportButton>
              <OutlinedFilterButton variant="outlined" startIcon={<Download />}>
                Download Payload
              </OutlinedFilterButton>
            </PayloadActions>
          </PayloadHeader>

          <JsonPreview>{JSON.stringify(payloadData, null, 2)}</JsonPreview>
        </PayloadPreviewContainer>
      )}
    </PageContainer>
  )
}

export default SettlementGenerator
