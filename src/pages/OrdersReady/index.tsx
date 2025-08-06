import { FC } from 'react'
import Toast from 'components/common/Toast'
import OrdersReadyHeader from 'pages/OrdersReady/OrdersReadyHeader'
import OrdersReadyRow from 'pages/OrdersReady/OrdersReadyRow'
import OrdersReadyTable from 'pages/OrdersReady/OrdersReadyTable'
import { IOrderReady } from 'interfaces/ordersReady'
import useOrdersReady from 'hooks/useOrdersReady'
import { PageContainer as Container } from 'styles/pages/OrdersReady.styled'

const OrdersReady: FC = () => {
  const {
    toast,
    selectedOrders,
    prepareButtonState,
    receiverId,
    handleReceiverChange,
    handlePrepareClick,
    handleToastClose,
    currentOrders,
    columns,
    page,
    rowsPerPage,
    totalCount,
    handleCheckboxChange,
    handleSelectAll,
    handlePageChange,
    handleRowsPerPageChange,
  } = useOrdersReady()

  const renderRow = (order: IOrderReady, index: number) => (
    <OrdersReadyRow
      key={index}
      order={order}
      selected={selectedOrders.has(order.id)}
      onCheckboxChange={handleCheckboxChange}
    />
  )

  return (
    <Container>
      <Toast isVisible={toast.isVisible} title="Orders Prepared" message={toast.message} onClose={handleToastClose} />

      <OrdersReadyHeader
        receiverId={receiverId}
        handleReceiverChange={handleReceiverChange}
        handlePrepareClick={handlePrepareClick}
        selectedCount={selectedOrders.size}
        prepareButtonState={prepareButtonState}
      />

      <OrdersReadyTable
        columns={columns}
        data={currentOrders}
        totalCount={totalCount}
        page={page}
        rowsPerPage={rowsPerPage}
        renderRow={renderRow}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        selectedItems={selectedOrders}
        onSelectAll={handleSelectAll}
      />
    </Container>
  )
}

export default OrdersReady
