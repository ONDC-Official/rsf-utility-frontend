import { FC } from 'react'
import Table from 'components/common/Table'
import { IOrdersReadyTableProps } from 'pages/OrdersReady/types'
import { IOrderReady } from 'interfaces/ordersReady'
import { Container, Header, Actions } from 'styles/pages/OrdersReady.styled'
import Button from 'components/common/Button'

import CalenderIcon from 'assets/images/svg/CalendarIcon'
import ExportIcon from 'assets/images/svg/ExportIcon'
import ChveronIcon from 'assets/images/svg/ChveronIcon'
import { Typography } from '@mui/material'
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
          <Button variant="outlined" startIcon={<CalenderIcon />} endIcon={<ChveronIcon />}>
            Filter by date
          </Button>
          <Button variant="outlined" startIcon={<ExportIcon />}>
            Export
          </Button>
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
