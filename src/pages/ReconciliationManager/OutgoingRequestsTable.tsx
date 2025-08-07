import { FC } from 'react'
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
import CalenderIcon from 'assets/images/svg/CalendarIcon'
import ExportIcon from 'assets/images/svg/ExportIcon'
import ChveronIcon from 'assets/images/svg/ChveronIcon'

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
          <Button variant="outlined" startIcon={<CalenderIcon />} endIcon={<ChveronIcon />}>
            Filter by date
          </Button>
          <Button variant="outlined" startIcon={<ExportIcon />}>
            Export
          </Button>
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
