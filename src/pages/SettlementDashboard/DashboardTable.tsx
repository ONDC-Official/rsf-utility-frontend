import { FC, useEffect } from 'react'
import Table from 'components/common/Table'
import DashboardRow from 'pages/SettlementDashboard/DashboardRow'
import { ISettlementDashboardOrder } from 'interfaces/settlementDashboard'
import { columns } from 'pages/SettlementDashboard/data'
import { IDashboardTableProps } from 'pages/SettlementDashboard/types'
import { usePaginatedSelectableData } from 'hooks/usePaginatedSelectableData'
import {
  TableContainer as Container,
  TableHeader as Header,
  Actions,
  Wrapper,
} from 'styles/pages/SettlementDashboard.styled'
import CalenderIcon from 'assets/images/svg/CalendarIcon'
import ExportIcon from 'assets/images/svg/ExportIcon'
import ChveronIcon from 'assets/images/svg/ChveronIcon'
import Button from 'components/common/Button'
import { Typography } from '@mui/material'
import { TypographyVariant } from 'enums/typography'

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

  const getItemId = (item: ISettlementDashboardOrder): string => item.id

  const renderRow = (order: ISettlementDashboardOrder): JSX.Element => (
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
        <Typography variant={TypographyVariant.H6Bold}>BPP_001</Typography>
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
      </Wrapper>
    </Container>
  )
}

export default DashboardTable
