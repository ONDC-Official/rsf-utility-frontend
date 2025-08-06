import { FC } from 'react'
import { CalendarToday, GetApp, MoveToInbox, RestartAlt } from '@mui/icons-material'
import Table from 'components/common/Table'
import StatusChip from 'components/common/StatusChip'
import { IOutgoingRequest } from 'interfaces/reconciliationManager'
import { outgoingRequestColumns } from 'pages/ReconciliationManager/data'
import { usePaginatedSelectableData } from 'hooks/usePaginatedSelectableData'
import { StyledTableBodyCell } from 'styles/components/Table.styled'
import { OutlinedFilterButton, ContainedExportButton } from 'styles/components/Button.styled'
import { RECONCILIATION_LABELS } from 'pages/ReconciliationManager/constants'
import { IOutgoingRequestsTableProps } from 'pages/ReconciliationManager/types'
import {
  TableContainer as Container,
  TableHeader as Header,
  TableActions as Actions,
  TableTitle as Title,
  ActionButton as Button,
  ErrorCell,
} from 'styles/pages/ReconciliationManager.styled'

const OutgoingRequestsTable: FC<IOutgoingRequestsTableProps> = ({ requests, onReinitiate }) => {
  const {
    currentItems: currentRequests,
    totalCount,
    page,
    rowsPerPage,
    handlePageChange,
    handleRowsPerPageChange,
  } = usePaginatedSelectableData<IOutgoingRequest>(requests)

  const getItemId = (item: IOutgoingRequest) => item.id

  const renderRow = (request: IOutgoingRequest) => (
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
          <Button variant="contained" size="small" startIcon={<MoveToInbox />}>
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
        <Title>{RECONCILIATION_LABELS.OUTGOING_TITLE}</Title>
        <Actions>
          <OutlinedFilterButton variant="outlined" startIcon={<CalendarToday />}>
            {RECONCILIATION_LABELS.FILTER_BY_DATE}
          </OutlinedFilterButton>
          <ContainedExportButton variant="outlined" startIcon={<GetApp />}>
            {RECONCILIATION_LABELS.EXPORT}
          </ContainedExportButton>
        </Actions>
      </Header>

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
    </Container>
  )
}

export default OutgoingRequestsTable
