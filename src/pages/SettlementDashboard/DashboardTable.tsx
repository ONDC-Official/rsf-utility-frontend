import { FC, useEffect } from 'react'
import { CalendarToday, GetApp } from '@mui/icons-material'
import Table from 'components/common/Table'
import DashboardRow from 'pages/SettlementDashboard/DashboardRow'
import { ISettlementDashboardOrder } from 'interfaces/settlementDashboard'
import { columns } from 'pages/SettlementDashboard/data'
import { DASHBOARD_LABELS } from 'pages/SettlementDashboard/constants'
import { IDashboardTableProps } from 'pages/SettlementDashboard/types'
import { usePaginatedSelectableData } from 'hooks/usePaginatedSelectableData'
import {
  TableContainer as Container,
  TableHeader as Header,
  Actions,
  Title,
} from 'styles/pages/SettlementDashboard.styled'
import { OutlinedFilterButton, ContainedExportButton } from 'styles/components/Button.styled'

const DashboardTable: FC<IDashboardTableProps> = ({ orders }) => {
  const {
    currentItems,
    selectedItems,
    page,
    rowsPerPage,
    totalCount,
    handlePageChange,
    handleRowsPerPageChange,
    handleCheckboxChange,
    handleSelectAll,
    setSelectedItems,
    setPage,
  } = usePaginatedSelectableData<ISettlementDashboardOrder>(orders)

  useEffect(() => {
    setSelectedItems(new Set())
    setPage(1)
  }, [orders, setSelectedItems, setPage])

  const getItemId = (item: ISettlementDashboardOrder) => item.id

  const renderRow = (order: ISettlementDashboardOrder, index: number) => (
    <DashboardRow
      key={order.id}
      order={order}
      selected={selectedItems.has(order.id)}
      onCheckboxChange={handleCheckboxChange}
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
        data={currentItems}
        totalCount={totalCount}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        renderRow={renderRow}
        selectedItems={selectedItems}
        onSelectAll={handleSelectAll}
        getItemId={getItemId}
      />
    </Container>
  )
}

export default DashboardTable
