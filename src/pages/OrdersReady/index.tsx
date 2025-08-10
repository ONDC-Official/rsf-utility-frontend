import { FC, useState } from 'react'
import Toast from 'components/common/Toast'
import OrdersReadyHeader from './OrdersReadyHeader'
import OrdersReadyRow from './OrdersReadyRow'
import OrdersReadyTable from './OrdersReadyTable'
import EditDueDateModal from './EditDueDateModal'
import { IOrderReady } from 'interfaces/ordersReady'
import useOrdersReady from 'hooks/useOrdersReady'
import { PageContainer as Container } from 'styles/pages/OrdersReady.styled'
import usePatchOrderDueDate from 'hooks/mutations/usePatchOrder'
import { useUserContext } from 'context/userContext'
import dayjs from 'dayjs'
import { useToast } from 'context/toastContext'
import { ORDER_PATCH_MESSAGES } from 'constants/toastMessages'

const OrdersReady: FC = () => {
  const {
    toast,
    selectedOrders,
    prepareButtonState,
    receiverId,
    // receiverOptions,
    // dateRange,
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

  const { selectedUser } = useUserContext()
  const muiToast = useToast()

  const [editedDueDates, setEditedDueDates] = useState<Map<string, string>>(new Map())
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState('')

  const patchMutation = usePatchOrderDueDate(selectedUser?._id || '')

  const handleDueDateChange = (orderId: string, newDueDate: string): void => {
    setEditedDueDates((prev) => {
      const updated = new Map(prev)
      updated.set(orderId, dayjs(newDueDate).format('YYYY-MM-DD'))
      return updated
    })
  }

  const resetEditedDueDates = (): void => {
    setEditedDueDates(new Map())
  }

  const handleSaveDueDates = async (): Promise<void> => {
    const payload = Array.from(editedDueDates.entries()).map(([order_id, due_date]) => ({
      order_id,
      due_date,
    }))

    try {
      const res = await patchMutation.patchOrderAsync(payload)
      if (res.success) {
        muiToast(ORDER_PATCH_MESSAGES.SUCCESS)
        resetEditedDueDates()
      } else {
        muiToast(ORDER_PATCH_MESSAGES.ERROR)
      }
    } catch (e) {
      muiToast(ORDER_PATCH_MESSAGES.ERROR)
    }
  }

  const handleEditClick = (orderId: string): void => {
    setSelectedOrderId(orderId)
    setEditModalOpen(true)
  }

  const handleEditModalClose = (): void => {
    setEditModalOpen(false)
    setSelectedOrderId('')
  }

  const handleEditModalConfirm = (): void => {
    setEditModalOpen(false)
    setSelectedOrderId('')
    // Refresh the page to show updated data
    window.location.reload()
  }

  const handleEditSuccess = (message: string): void => {
    // This will be called from the modal for additional handling if needed
  }

  const renderRow = (order: IOrderReady, index: number): JSX.Element => (
    <OrdersReadyRow
      editedDueDates={editedDueDates}
      key={index}
      order={{
        ...order,
        dueDate: editedDueDates.get(order.id) ?? order.dueDate,
      }}
      selected={selectedOrders.has(order.id)}
      onCheckboxChange={handleCheckboxChange}
      onDueDateChange={handleDueDateChange}
      onEditClick={handleEditClick}
    />
  )

  return (
    <Container>
      <Toast isVisible={toast.isVisible} title={toast.message} message={toast.message} onClose={handleToastClose} />

      <OrdersReadyHeader
        receiverId={receiverId}
        // receiverOptions={receiverOptions}
        handleReceiverChange={handleReceiverChange}
        handlePrepareClick={handlePrepareClick}
        selectedCount={selectedOrders.size}
        prepareButtonState={prepareButtonState}
      />

      <OrdersReadyTable
        receiverId={receiverId}
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
        showSaveButton={editedDueDates.size > 0}
        onSaveDueDatesClick={handleSaveDueDates}
      />

      <EditDueDateModal
        open={editModalOpen}
        onClose={handleEditModalClose}
        onConfirm={handleEditModalConfirm}
        orderId={selectedOrderId}
        onEditSuccess={handleEditSuccess}
      />
    </Container>
  )
}

export default OrdersReady
