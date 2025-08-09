import { FC, useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import DateRangePickerButton from 'components/common/DateRangePickerButton'
import Table from 'components/common/Table'
import DashboardRow from 'pages/SettlementDashboard/DashboardRow'
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
// import ExportIcon from 'assets/images/svg/ExportIcon'
import { TypographyVariant } from 'enums/typography'
import { IUserSettlementItem } from '@interfaces/settlement'

const DashboardTable: FC<IDashboardTableProps> = ({ orders, counterpartyId }) => {
  const [dateRange, setDateRange] = useState<IDateRange>({ startDate: null, endDate: null })
  const getItemId = (item: IUserSettlementItem): string => item.order_id

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
  } = usePaginatedSelectableData<IUserSettlementItem>(orders, getItemId)

  useEffect(() => {
    setSelectedItems(new Set())
    setPage(1)
  }, [orders, setSelectedItems, setPage])

  const handleDateRangeChange = (newDateRange: IDateRange): void => {
    setDateRange(newDateRange)
  }

  const renderRow = (order: IUserSettlementItem): JSX.Element => (
    <DashboardRow
      key={order.order_id}
      order={order}
      selected={selectedItems.has(order.order_id)}
      onCheckboxChange={handleCheckboxChange}
    />
  )

  return (
    <Container>
      <Header>
        <Typography variant={TypographyVariant.H6Bold}>{counterpartyId}</Typography>
        <Actions>
          <DateRangePickerButton
            variant="outlined"
            selectedDateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
          />

          {/* <Button variant="outlined" startIcon={<ExportIcon />}>
            Export
          </Button> */}
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
          hideCheckboxes
        />
      </Wrapper>
    </Container>
  )
}

export default DashboardTable
