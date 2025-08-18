import { FC, useState, useEffect } from 'react'
import { SelectChangeEvent, Typography, Checkbox } from '@mui/material'
import Table from 'components/common/Table'
import Select from 'components/common/Select'
import { reconRequestColumns } from 'pages/ReconciliationManager/data'
import { RECONCILIATION_LABELS } from 'pages/ReconciliationManager/constants'
import { formatCurrency } from 'utils/formatters'
import { IReconRequestTableProps } from 'pages/ReconciliationManager/types'
import { useUserContext } from 'context/userContext'
import { useLoader } from 'context/loaderContext'
import useGetReconciliationData, { IReconciliationDataItem } from 'hooks/queries/useGetReconciliationData'
import { StatusChip } from 'styles/components/Chip.styled'
import { StyledTableBodyCell, TableBodyCheckboxCell } from 'styles/components/Table.styled'
import { usePaginatedSelectableData } from 'hooks/usePaginatedSelectableData'
import {
  TableContainer as Container,
  TableHeader as Header,
  TableReceiverSection,
  Wrapper,
} from 'styles/pages/ReconciliationManager.styled'
import { TypographyVariant } from 'enums/typography'
// import ExportIcon from 'assets/images/svg/ExportIcon'
// import Button from 'components/common/Button'

const ReconRequestTable: FC<IReconRequestTableProps> = ({ onCheckboxSelect }) => {
  const { selectedUser } = useUserContext()
  const [counterpartyId, setCounterpartyId] = useState('')
  const { showLoader, hideLoader } = useLoader()

  const {
    data: reconciliationData,
    isLoading,
    refetch: _refetch,
  } = useGetReconciliationData(selectedUser?._id || '', 1, 10, counterpartyId || undefined, {
    enabled: !!selectedUser?._id,
  })

  useEffect(() => {
    if (isLoading) {
      showLoader()
    } else {
      hideLoader()
    }
  }, [isLoading, showLoader, hideLoader])

  const settlements = reconciliationData?.data?.settlements || []

  const {
    currentItems: currentSettlements,
    selectedItems: selectedSettlements,
    totalCount,
    page,
    rowsPerPage,
    handlePageChange,
    handleRowsPerPageChange,
    handleCheckboxChange: originalHandleCheckboxChange,
    handleSelectAll: originalHandleSelectAll,
  } = usePaginatedSelectableData<IReconciliationDataItem>(settlements, (item) => item.order_id)

  // Custom handlers to call onCheckboxSelect with settlement data
  const handleCheckboxChange = (id: string, checked: boolean): void => {
    originalHandleCheckboxChange(id, checked)

    // Calculate new selection after the change
    const newSelected = new Set(selectedSettlements)
    if (checked) {
      newSelected.add(id)
    } else {
      newSelected.delete(id)
    }

    const selectedData = settlements.filter((settlement) => newSelected.has(settlement.order_id))
    onCheckboxSelect(newSelected.size, selectedData)
  }

  const handleSelectAll = (checked: boolean, items: IReconciliationDataItem[]): void => {
    originalHandleSelectAll(checked, items)

    if (checked) {
      onCheckboxSelect(items.length, items)
    } else {
      onCheckboxSelect(0, [])
    }
  }

  const handleCounterpartyChange = (event: SelectChangeEvent<unknown>): void => {
    setCounterpartyId(event.target.value as string)
  }

  const counterpartyOptions = selectedUser?.counterparty_infos?.map((info) => ({ 
    label: info.nickName, 
    value: info.id 
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

  const getItemId = (item: IReconciliationDataItem): string => item.order_id

  const renderRow = (settlement: IReconciliationDataItem): JSX.Element => (
    <>
      <TableBodyCheckboxCell>
        <Checkbox
          checked={selectedSettlements.has(settlement.order_id)}
          onChange={(e) => handleCheckboxChange(settlement.order_id, e.target.checked)}
          size="small"
        />
      </TableBodyCheckboxCell>
      <StyledTableBodyCell>{settlement.order_id}</StyledTableBodyCell>
      <StyledTableBodyCell>{settlement.collector_id}</StyledTableBodyCell>
      <StyledTableBodyCell>{settlement.receiver_id}</StyledTableBodyCell>
      <StyledTableBodyCell>{formatCurrency(settlement.total_order_value)}</StyledTableBodyCell>
      <StyledTableBodyCell>{formatCurrency(settlement.collector_settlement)}</StyledTableBodyCell>
      <StyledTableBodyCell>{formatCurrency(settlement.commission)}</StyledTableBodyCell>
      <StyledTableBodyCell>{formatCurrency(settlement.tcs)}</StyledTableBodyCell>
      <StyledTableBodyCell>{formatCurrency(settlement.tds)}</StyledTableBodyCell>
      <StyledTableBodyCell>{formatCurrency(settlement.withholding_amount)}</StyledTableBodyCell>
      <StyledTableBodyCell>
        <StatusChip label={settlement.status} size="small" color="error" />
      </StyledTableBodyCell>
      <StyledTableBodyCell>
        <span style={{ color: '#DC3545' }}>{settlement.error || 'N/A'}</span>
      </StyledTableBodyCell>
    </>
  )

  const renderEmptyState = (): JSX.Element => (
    <Typography variant={TypographyVariant.H6Regular} color="text.secondary">
      No reconciliation data available
    </Typography>
  )

  return (
    <Container>
      <Header>
        <TableReceiverSection>
          <Typography variant={TypographyVariant.Body1Medium}>{RECONCILIATION_LABELS.RECEIVER_LABEL}</Typography>
          <Select
            value={counterpartyId}
            onChange={handleCounterpartyChange}
            options={counterpartyOptions}
            size="small"
          />
        </TableReceiverSection>
      </Header>

      <Wrapper>
        <Table
          columns={reconRequestColumns}
          data={currentSettlements}
          totalCount={totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          renderRow={renderRow}
          selectedItems={selectedSettlements}
          onSelectAll={handleSelectAll}
          getItemId={getItemId}
          renderEmptyState={renderEmptyState}
        />
      </Wrapper>
    </Container>
  )
}

export default ReconRequestTable
