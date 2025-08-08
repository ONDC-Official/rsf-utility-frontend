import { FC, useState } from 'react'
import { Typography } from '@mui/material'
import Table from 'components/common/Table'
import DateRangePickerButton from 'components/common/DateRangePickerButton'
import { IDateRange } from 'components/common/DateRangePickerButton/types'
import { IOrdersReadyTableProps } from 'pages/OrdersReady/types'
import { IOrderReady } from 'interfaces/ordersReady'
import { Container, Header, Actions } from 'styles/pages/OrdersReady.styled'
import { TypographyVariant } from 'enums/typography'

interface IOrdersReadyTableExtendedProps extends IOrdersReadyTableProps {
  selectedItems: Set<string>
  onSelectAll: (checked: boolean, currentPageItems: IOrderReady[]) => void
}

const renderEmptyState = (): JSX.Element => (
  <Typography variant={TypographyVariant.H6} color="text.secondary">
    No orders in ready
  </Typography>
)

const OrdersReadyTable: FC<IOrdersReadyTableExtendedProps> = ({
  columns,
  data,
  totalCount,
  page,
  rowsPerPage,
  renderRow,
  onPageChange,
  onRowsPerPageChange,
  selectedItems,
  onSelectAll,
}) => {
  const [dateRange, setDateRange] = useState<IDateRange>({ startDate: null, endDate: null })
  const getItemId = (item: IOrderReady): string => item.id

  const handleDateRangeChange = (newDateRange: IDateRange): void => {
    setDateRange(newDateRange)
  }

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
      <Table
        columns={columns}
        data={data}
        totalCount={totalCount}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        renderRow={renderRow}
        selectedItems={selectedItems}
        onSelectAll={onSelectAll}
        getItemId={getItemId}
        renderEmptyState={renderEmptyState}
      />
    </Container>
  )
}

export default OrdersReadyTable
