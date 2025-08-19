import { FC, useEffect, useRef, useState } from 'react'
import { Edit, Undo } from '@mui/icons-material'
import { Checkbox, Typography } from '@mui/material'
import Button from 'components/common/Button'
import DateRangePickerButton from 'components/common/DateRangePickerButton'
import Table from 'components/common/Table'
import { columns } from 'pages/SettlementGenerator/data'
import ReinitiateReconciliationModal from 'pages/SettlementGenerator/ReinitiateReconciliationModal'
import { IOrderTableProps } from 'pages/SettlementGenerator/types'
import { usePaginatedSelectableData } from 'hooks/usePaginatedSelectableData'
import { IUserSettlementItem } from 'interfaces/settlement'
import { ActionIconButton, StyledTableBodyCell, TableBodyCheckboxCell } from 'styles/components/Table.styled'
import { IDateRange } from 'components/common/DateRangePickerButton/types'
import { Container, Header, ActionsContainer } from 'styles/pages/OrdersReady.styled'
import { ActionsCell } from 'styles/pages/SettlementGenerator.styled'
import ExportIcon from 'assets/images/svg/ExportIcon'
import { formatCurrency } from 'utils/helpers'
import { useToast } from 'context/toastContext'
import { useUserContext } from 'context/userContext'
import { useLoader } from 'context/loaderContext'
import usePatchImportSettlements from 'hooks/mutations/usePatchImportSettlements'
import { SETTLEMENT_PATCH_MESSAGES } from 'constants/toastMessages'
import { TypographyVariant } from 'enums/typography'
import Select from 'components/common/Select'

const OrderTable: FC<IOrderTableProps> = ({
  allOrders,
  editedRows,
  counterpartyOptions,
  counterpartyId,
  setCounterpartyId,
  setEditedRows,
  onSelectedOrdersChange,
  onExport,
  handlePatchSettlements,
  refetchOrders,
  onDateRangeChange,
}) => {
  const toast = useToast()
  const { selectedUser } = useUserContext()
  const { showLoader, hideLoader } = useLoader()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const bulkImportMutation = usePatchImportSettlements(selectedUser?._id ?? '')

  const getItemId = (item: IUserSettlementItem): string => item.order_id

  const [dateRange, setDateRange] = useState<IDateRange>({ startDate: null, endDate: null })
  const {
    currentItems: orders,
    selectedItems: selectedOrders,
    totalCount,
    page,
    rowsPerPage,
    handlePageChange,
    handleRowsPerPageChange,
    handleCheckboxChange,
    handleSelectAll,
  } = usePaginatedSelectableData<IUserSettlementItem>(allOrders, getItemId)

  const [editingOrder, setEditingOrder] = useState<IUserSettlementItem | null>(null)

  useEffect(() => {
    onSelectedOrdersChange(selectedOrders)
  }, [selectedOrders, onSelectedOrdersChange])

  const handleSave = (updatedFields: Partial<IUserSettlementItem>): void => {
    if (!editingOrder) return
    setEditedRows((prev: Record<string, Partial<IUserSettlementItem>>) => ({
      ...prev,
      [editingOrder.order_id]: {
        ...prev[editingOrder.order_id],
        ...updatedFields,
      },
    }))
    setEditingOrder(null)
  }

  const handleDateRangeChange = (newDateRange: IDateRange): void => {
    setDateRange(newDateRange)
    // Notify parent component about date range change
    if (onDateRangeChange) {
      onDateRangeChange(newDateRange)
    }
  }

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return '-'
    try {
      const date = new Date(dateString)
      return date.toISOString().split('T')[0] // Returns YYYY-MM-DD format
    } catch {
      return dateString // Return original if parsing fails
    }
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      showLoader()
      const result = await bulkImportMutation.triggerAsync(file)
      if (result.success) {
        toast(SETTLEMENT_PATCH_MESSAGES.SUCCESS)
        refetchOrders()
      }
    } catch (error) {
    } finally {
      hideLoader()
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const renderRow = (order: IUserSettlementItem): JSX.Element => {
    const edited = editedRows[order.order_id]
    const isEdited = !!edited

    const merged = { ...order, ...(edited || {}) }

    return (
      <>
        <TableBodyCheckboxCell>
          <Checkbox
            checked={selectedOrders.has(order.order_id)}
            onChange={(e) => handleCheckboxChange(order.order_id, e.target.checked)}
            size="small"
          />
        </TableBodyCheckboxCell>
        <StyledTableBodyCell className={isEdited ? 'highlight' : ''}>{merged.order_id}</StyledTableBodyCell>
        <StyledTableBodyCell className={isEdited ? 'highlight' : ''}>{merged.collector_id}</StyledTableBodyCell>
        <StyledTableBodyCell className={isEdited ? 'highlight' : ''}>{merged.receiver_id}</StyledTableBodyCell>
        <StyledTableBodyCell className={isEdited ? 'highlight' : ''}>
          {formatCurrency(merged.total_order_value)}
        </StyledTableBodyCell>
        <StyledTableBodyCell className={isEdited ? 'highlight' : ''}>
          {formatCurrency(merged.commission)}
        </StyledTableBodyCell>
        <StyledTableBodyCell className={isEdited ? 'highlight' : ''}>
          {formatCurrency(merged.tcs || 0)}
        </StyledTableBodyCell>
        <StyledTableBodyCell className={isEdited ? 'highlight' : ''}>
          {formatCurrency(merged.tds || 0)}
        </StyledTableBodyCell>
        <StyledTableBodyCell className={isEdited ? 'highlight' : ''}>
          {formatCurrency(merged.withholding_amount)}
        </StyledTableBodyCell>
        <StyledTableBodyCell className={isEdited ? 'highlight' : ''}>
          {formatCurrency(merged.collector_settlement)}
        </StyledTableBodyCell>
        <StyledTableBodyCell className={isEdited ? 'highlight' : ''}>{merged.provider_id}</StyledTableBodyCell>
        <StyledTableBodyCell className={isEdited ? 'highlight' : ''}>{formatDate(merged.due_date)}</StyledTableBodyCell>
        <ActionsCell>
          <ActionIconButton size="small" onClick={() => setEditingOrder(order)}>
            <Edit fontSize="small" />
          </ActionIconButton>
          <ActionIconButton
            size="small"
            disabled={!isEdited}
            onClick={() => {
              setEditedRows((prev: Record<string, Partial<IUserSettlementItem>>) => {
                const newState = { ...prev }
                delete newState[order.order_id]
                return newState
              })
            }}
          >
            <Undo fontSize="small" />
          </ActionIconButton>
        </ActionsCell>
      </>
    )
  }

  const handleImportClick = (): void => {
    fileInputRef.current?.click()
  }

  return (
    <Container>
      <Header>
        <ActionsContainer>
          <Typography variant={TypographyVariant.Body1Medium}>Counterparty</Typography>
          <Select
            value={counterpartyId}
            onChange={(e) => setCounterpartyId(e.target.value as string)}
            options={counterpartyOptions}
            size="small"
            style={{ minWidth: '200px' }}
          />
        </ActionsContainer>

        <ActionsContainer>
          {Object.keys(editedRows).length > 0 && (
            <Button variant="contained" onClick={handlePatchSettlements}>
              Save edited order
            </Button>
          )}

          <DateRangePickerButton
            variant="outlined"
            selectedDateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
          />

          <Button variant="outlined" startIcon={<ExportIcon />} onClick={onExport}>
            Export
          </Button>

          <Button variant="outlined" startIcon={<ExportIcon />} onClick={handleImportClick}>
            Import
          </Button>
          <input type="file" accept=".csv" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange} />
        </ActionsContainer>
      </Header>

      <Table
        columns={columns}
        data={orders}
        totalCount={totalCount}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        renderRow={renderRow}
        selectedItems={selectedOrders}
        onSelectAll={handleSelectAll}
        getItemId={getItemId}
      />

      {editingOrder && (
        <ReinitiateReconciliationModal
          open={!!editingOrder}
          onClose={() => setEditingOrder(null)}
          data={{
            order_id: editingOrder.order_id,
            total_order_value: editingOrder.total_order_value ?? 0,
            commission: editingOrder.commission ?? 0,
            collector_settlement: editingOrder.collector_settlement ?? 0,
            tds: 0,
            tcs: 0,
            withholding_amount: editingOrder.withholding_amount ?? 0,
            inter_np_settlement: editingOrder.inter_np_settlement ?? 0,
          }}
          onSave={handleSave}
        />
      )}
    </Container>
  )
}

export default OrderTable
