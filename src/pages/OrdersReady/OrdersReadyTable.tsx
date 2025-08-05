import { FC, ReactNode } from 'react'
import { CalendarToday, GetApp } from '@mui/icons-material'
import Table from 'components/common/Table'
import { IOrderReady } from 'interfaces/ordersReady'
import { ITableColumn } from 'interfaces/table'
import { TableContainer, TableHeader, TableActions, TableTitle } from 'styles/pages/OrdersReady.styled'
import { OutlinedFilterButton, ContainedExportButton } from 'styles/components/Button.styled'

interface Props {
  columns: ITableColumn<IOrderReady>[]
  data: IOrderReady[]
  totalCount: number
  page: number
  rowsPerPage: number
  renderRow: (order: IOrderReady, index: number) => React.ReactNode
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rows: number) => void
}

const OrdersReadyTable: FC<Props> = ({
  columns,
  data,
  totalCount,
  page,
  rowsPerPage,
  renderRow,
  onPageChange,
  onRowsPerPageChange,
}) => {
  return (
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
}

export default OrdersReadyTable
