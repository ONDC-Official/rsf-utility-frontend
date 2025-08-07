import { FC } from 'react'
import { Typography } from '@mui/material'
import Table from 'components/common/Table'
import DateFilterButton from 'components/common/DateFilterButton'
import { IOrdersReadyTableProps } from 'pages/OrdersReady/types'
import { IOrderReady } from 'interfaces/ordersReady'
import { Container, Header, Actions } from 'styles/pages/OrdersReady.styled'
import { TypographyVariant } from 'enums/typography'

interface IOrdersReadyTableExtendedProps extends IOrdersReadyTableProps {
  selectedItems: Set<string>
  onSelectAll: (checked: boolean, currentPageItems: IOrderReady[]) => void
}

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
  const getItemId = (item: IOrderReady) => item.id

  return (
    <Container>
      <Header>
        <Typography variant={TypographyVariant.H6Bold}>BPP_001</Typography>
        <Actions>
          <DateFilterButton variant="outlined" onDateChange={(date) => console.log('Date selected:', date)} />
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
      />
    </Container>
  )
}

export default OrdersReadyTable
