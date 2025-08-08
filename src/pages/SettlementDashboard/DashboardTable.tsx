import { FC, useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import DateRangePickerButton from 'components/common/DateRangePickerButton'
import Table from 'components/common/Table'
import DashboardRow from 'pages/SettlementDashboard/DashboardRow'
import { ISettlementDashboardOrder } from 'interfaces/settlementDashboard'
import { TypographyVariant } from 'enums/typography'
import { columns } from 'pages/SettlementDashboard/data'
import { IDashboardTableProps } from 'pages/SettlementDashboard/types'
import { usePaginatedSelectableData } from 'hooks/usePaginatedSelectableData'
import { IDateRange } from 'components/common/DateRangePickerButton/types'
import {
  TableContainer as Container,
  TableHeader as Header,
  Actions,
  Wrapper,
} from 'styles/pages/SettlementDashboard.styled'

const DashboardTable: FC<IDashboardTableProps> = ({ orders }) => {
  const [dateRange, setDateRange] = useState<IDateRange>({ startDate: null, endDate: null })
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

  const handleDateRangeChange = (newDateRange: IDateRange): void => {
    setDateRange(newDateRange)
  }

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
          <DateRangePickerButton
            variant="outlined"
            selectedDateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
          />
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
