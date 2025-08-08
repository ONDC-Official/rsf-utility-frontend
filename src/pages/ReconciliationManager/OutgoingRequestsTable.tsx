import { FC, useState } from 'react'
import { MoveToInbox, RestartAlt } from '@mui/icons-material'
import Table from 'components/common/Table'
import StatusChip from 'components/common/StatusChip'
import { IOutgoingRequest } from 'interfaces/reconciliationManager'
import { outgoingRequestColumns } from 'pages/ReconciliationManager/data'
import { usePaginatedSelectableData } from 'hooks/usePaginatedSelectableData'
import { StyledTableBodyCell } from 'styles/components/Table.styled'
import { RECONCILIATION_LABELS } from 'pages/ReconciliationManager/constants'
import { IOutgoingRequestsTableProps } from 'pages/ReconciliationManager/types'
import {
  TableContainer as Container,
  TableHeader as Header,
  TableActions as Actions,
  ActionButton as Button,
  ErrorCell,
  Wrapper,
} from 'styles/pages/ReconciliationManager.styled'
import { Typography } from '@mui/material'
import { TypographyVariant } from 'enums/typography'
import DateRangePickerButton from 'components/common/DateRangePickerButton'
import { IDateRange } from 'components/common/DateRangePickerButton/types'

const OutgoingRequestsTable: FC<IOutgoingRequestsTableProps> = ({ requests, onReinitiate }) => {
  const [dateRange, setDateRange] = useState<IDateRange>({ startDate: null, endDate: null })
  const {
    currentItems: currentRequests,
    totalCount,
    page,
    rowsPerPage,
    handlePageChange,
    handleRowsPerPageChange,
  } = usePaginatedSelectableData<IOutgoingRequest>(requests)

  const getItemId = (item: IOutgoingRequest): string => item.id

  const handleDateRangeChange = (newDateRange: IDateRange): void => {
    setDateRange(newDateRange)
  }

  const renderRow = (request: IOutgoingRequest): JSX.Element => (
    <>
      <StyledTableBodyCell>{request.orderId}</StyledTableBodyCell>
      <StyledTableBodyCell>{request.receiverId}</StyledTableBodyCell>
      <StyledTableBodyCell>
        <StatusChip status={request.status} />
      </StyledTableBodyCell>
      <StyledTableBodyCell>{request.dueDate}</StyledTableBodyCell>
      <StyledTableBodyCell>{request.response}</StyledTableBodyCell>
      <StyledTableBodyCell>
        {request.status === 'Accepted' ? (
          <Button variant="contained" size="small" startIcon={<MoveToInbox />} sx={{ height: 'auto' }}>
            Move to Ready
          </Button>
        ) : (
          <Button variant="outlined" size="small" startIcon={<RestartAlt />} onClick={() => onReinitiate(request)}>
            Reinitiate
          </Button>
        )}
      </StyledTableBodyCell>
      <ErrorCell>{request.error || '-'}</ErrorCell>
    </>
  )

  return (
    <Container style={{ marginTop: '24px' }}>
      <Header>
        <Typography variant={TypographyVariant.H6Bold}>{RECONCILIATION_LABELS.OUTGOING_TITLE}</Typography>
        <Actions>
          <DateRangePickerButton
            variant="outlined"
            selectedDateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
          />
        </Actions>
      </Header>

      <Wrapper>
        <Table
          columns={outgoingRequestColumns}
          data={currentRequests}
          totalCount={totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          renderRow={renderRow}
          hideCheckboxes={true}
          getItemId={getItemId}
        />
      </Wrapper>
    </Container>
  )
}

export default OutgoingRequestsTable
