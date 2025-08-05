import { FC } from 'react'
import { CalendarToday, GetApp } from '@mui/icons-material'
import Table from 'components/common/Table'
import { IOrdersReadyTableProps } from 'pages/OrdersReady/types'
import { Container, Header, TableActions, TableTitle } from 'styles/pages/OrdersReady.styled'
import { OutlinedFilterButton, ContainedExportButton } from 'styles/components/Button.styled'

const OrdersReadyTable: FC<IOrdersReadyTableProps> = ({
  columns,
  data,
  totalCount,
  page,
  rowsPerPage,
  renderRow,
  onPageChange,
  onRowsPerPageChange,
}) => (
  <Container>
    <Header>
      <TableTitle>BPP_001</TableTitle>
      <TableActions>
        <OutlinedFilterButton variant="outlined" startIcon={<CalendarToday />}>
          Filter by date
        </OutlinedFilterButton>
        <ContainedExportButton variant="contained" startIcon={<GetApp />}>
          Export
        </ContainedExportButton>
      </TableActions>
    </Header>
    <Table
      columns={columns}
      data={data}
      totalCount={totalCount}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      renderRow={renderRow}
    />
  </Container>
)

export default OrdersReadyTable
