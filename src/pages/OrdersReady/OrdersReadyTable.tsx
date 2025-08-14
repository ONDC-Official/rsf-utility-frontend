import { FC } from 'react'
import { Typography } from '@mui/material'
import Table from 'components/common/Table'
import { IOrdersReadyTableProps } from 'pages/OrdersReady/types'
import { IOrderReady } from 'interfaces/ordersReady'
import { Container, Header, Actions } from 'styles/pages/OrdersReady.styled'
import { TypographyVariant } from 'enums/typography'
import Button from 'components/common/Button'

interface IOrdersReadyTableExtendedProps extends IOrdersReadyTableProps {
  receiverId: string
  selectedItems: Set<string>
  onSelectAll: (checked: boolean, currentPageItems: IOrderReady[]) => void
  onSaveDueDatesClick?: () => void
  showSaveButton?: boolean
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
  showSaveButton,
  onSaveDueDatesClick,
}) => {
  const getItemId = (item: IOrderReady): string => item.id

  return (
    <Container>
      <Header>
        <Actions>
          {showSaveButton && (
            <Button variant="contained" onClick={onSaveDueDatesClick}>
              Save Orders
            </Button>
          )}
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
