import { FC } from 'react'
import { CalendarToday, GetApp } from '@mui/icons-material'
import Table from 'components/common/Table'
import DashboardRow from 'pages/SettlementDashboard/DashboardRow'
import { ISettlementDashboardOrder } from 'interfaces/settlementDashboard'
import { columns } from 'pages/SettlementDashboard/data'
import { DASHBOARD_LABELS } from 'pages/SettlementDashboard/constants'
import { TableContainer, TableHeader, TableActions, TableTitle } from 'styles/pages/SettlementDashboard.styled'
import { OutlinedFilterButton, ContainedExportButton } from 'styles/components/Button.styled'

interface IDashboardTableProps {
  orders: ISettlementDashboardOrder[]
  totalCount: number
  page: number
  rowsPerPage: number
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rowsPerPage: number) => void
  selectedOrders: Set<string>
  onCheckboxChange: (id: string, checked: boolean) => void
  onSelectAll: (checked: boolean, currentPageItems: ISettlementDashboardOrder[]) => void
}

const DashboardTable: FC<IDashboardTableProps> = ({
  orders,
  totalCount,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  selectedOrders,
  onCheckboxChange,
  onSelectAll,
}) => {
  const getItemId = (item: ISettlementDashboardOrder) => item.id

  const renderRow = (order: ISettlementDashboardOrder, index: number) => (
    <DashboardRow
      key={order.id}
      order={order}
      selected={selectedOrders.has(order.id)}
      onCheckboxChange={onCheckboxChange}
    />
  )

  return (
    <TableContainer>
      <TableHeader>
        <TableTitle>BPP_001</TableTitle>
        <TableActions>
          <OutlinedFilterButton variant="outlined" startIcon={<CalendarToday />}>
            {DASHBOARD_LABELS.FILTER_BY_DATE}
          </OutlinedFilterButton>
          <ContainedExportButton variant="outlined" startIcon={<GetApp />}>
            {DASHBOARD_LABELS.EXPORT}
          </ContainedExportButton>
        </TableActions>
      </TableHeader>
      <Table
        columns={columns}
        data={orders}
        totalCount={totalCount}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        renderRow={renderRow}
        selectedItems={selectedOrders}
        onSelectAll={onSelectAll}
        getItemId={getItemId}
      />
    </TableContainer>
  )
}

export default DashboardTable
