import { FC } from 'react'
import { CalendarToday, GetApp } from '@mui/icons-material'
import Table from 'components/common/Table'
import { IOrdersReadyTableProps } from 'pages/OrdersReady/types'
import { TableContainer, TableHeader, TableActions, TableTitle } from 'styles/pages/OrdersReady.styled'
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
      data={data}
      totalCount={totalCount}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      renderRow={renderRow}
    />
  </TableContainer>
)

export default OrdersReadyTable
