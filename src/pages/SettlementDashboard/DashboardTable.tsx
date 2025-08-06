import { FC } from 'react'
import { CalendarToday, GetApp } from '@mui/icons-material'
import Table from 'components/common/Table'
import DashboardRow from 'pages/SettlementDashboard/DashboardRow'
import { ISettlementDashboardOrder } from 'interfaces/settlementDashboard'
import { columns } from 'pages/SettlementDashboard/data'
import { DASHBOARD_LABELS } from 'pages/SettlementDashboard/constants'
import { IDashboardTableProps } from 'pages/SettlementDashboard/types'
import {
  TableContainer as Container,
  TableHeader as Header,
  Actions,
  Title,
} from 'styles/pages/SettlementDashboard.styled'
import { OutlinedFilterButton, ContainedExportButton } from 'styles/components/Button.styled'

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
    <Container>
      <Header>
        <Title>BPP_001</Title>
        <Actions>
          <OutlinedFilterButton variant="outlined" startIcon={<CalendarToday />}>
            {DASHBOARD_LABELS.FILTER_BY_DATE}
          </OutlinedFilterButton>
          <ContainedExportButton variant="outlined" startIcon={<GetApp />}>
            {DASHBOARD_LABELS.EXPORT}
          </ContainedExportButton>
        </Actions>
      </Header>
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
    </Container>
  )
}

export default DashboardTable
