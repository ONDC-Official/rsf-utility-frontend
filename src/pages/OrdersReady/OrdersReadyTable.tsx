import { FC } from 'react'
import { GetApp } from '@mui/icons-material'
import Table from 'components/common/Table'
import DateFilterButton from 'components/common/DateFilterButton'
import { IOrdersReadyTableProps } from 'pages/OrdersReady/types'
import { IOrderReady } from 'interfaces/ordersReady'
import { Container, Header, Actions, Title } from 'styles/pages/OrdersReady.styled'
import { ContainedExportButton } from 'styles/components/Button.styled'

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
        <Title>BPP_001</Title>
        <Actions>
          <DateFilterButton 
            variant="outlined"
            onDateChange={(date) => console.log('Date selected:', date)}
          />
          <ContainedExportButton variant="contained" startIcon={<GetApp />}>
            Export
          </ContainedExportButton>
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
