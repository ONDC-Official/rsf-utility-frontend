import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { SelectChangeEvent } from '@mui/material'
import { columns, receiverOptions } from 'pages/OrdersReady/data'
import useGetOrders from 'hooks/queries/useGetOrders'
import { useUserContext } from 'context/userContext'
import { IToastState, IOrderReady, ISettlePrepareRequest, ISettlePrepareResponse } from 'interfaces/ordersReady'
import { PrepareButtonState } from 'pages/OrdersReady/constants'
import { ROUTES } from 'constants/routes.constants'
import usePost from 'hooks/usePost'
import { buildApiUrl } from 'utils/helpers'
import { APIRoute } from 'enums/api'

const useOrdersReady = () => {
  const navigate = useNavigate()

  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [receiverId, setReceiverId] = useState('BPP_001')
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set())
  const [prepareButtonState, setPrepareButtonState] = useState<PrepareButtonState>(PrepareButtonState.DISABLED)
  const [toast, setToast] = useState<IToastState>({ isVisible: false, message: '', count: 0 })

  const { selectedUser } = useUserContext()
  const settlePreparePost = usePost<ISettlePrepareResponse>()

  const {
    data: ordersData,
    isLoading: _isLoading,
    refetch: _refetch,
  } = useGetOrders(selectedUser?._id || '', page, rowsPerPage, 'Completed', {
    enabled: !!selectedUser?._id,
  })

  const apiOrders = ordersData?.data || []
  const currentOrders = apiOrders.map((order) => ({
    id: order.id,
    orderId: order.orderId,
    collectorId: order.collectorId,
    receiverId: order.receiverId,
    totalOrderValue: order.totalOrderValue,
    commission: order.bffPercent,
    sellerType: order.msn ? 'MSN' : 'ISN',
    dueDate: order.dueDate,
  }))
  const totalCount = currentOrders.length

  useEffect(() => {
    const selectedCount = selectedOrders.size
    if (selectedCount === 0) {
      setPrepareButtonState(PrepareButtonState.DISABLED)
    } else {
      setPrepareButtonState(PrepareButtonState.PREPARE)
    }
  }, [selectedOrders])

  const handleCheckboxChange = useCallback((orderId: string, checked: boolean) => {
    setSelectedOrders((prev) => {
      const updated = new Set(prev)
      checked ? updated.add(orderId) : updated.delete(orderId)
      return updated
    })
  }, [])

  const handleSelectAll = useCallback((checked: boolean, currentPageItems: IOrderReady[]) => {
    setSelectedOrders((prev) => {
      const updated = new Set(prev)
      if (checked) {
        // Add all current page items to selection
        currentPageItems.forEach((item) => {
          updated.add(item.id)
        })
      } else {
        // Remove all current page items from selection
        currentPageItems.forEach((item) => {
          updated.delete(item.id)
        })
      }

      return updated
    })
  }, [])

  const handlePrepareClick = async () => {
    const count = selectedOrders.size
    if (prepareButtonState === PrepareButtonState.PREPARE && selectedUser?._id) {
      const selectedOrderIds = Array.from(selectedOrders)
      const orderIds = selectedOrderIds
        .map((selectedId) => {
          const order = currentOrders.find((o) => o.id === selectedId)
          return order?.orderId
        })
        .filter(Boolean) as string[]

      const url = buildApiUrl(APIRoute.SETTLE_PREPARE, { userId: selectedUser._id })
      const payload: ISettlePrepareRequest = { order_ids: orderIds }

      try {
        const response = await settlePreparePost.mutateAsync({ url, payload })

        if (response.success) {
          setToast({
            isVisible: true,
            message: response.message,
            count,
          })
          navigate(ROUTES.SETTLEMENT_GENERATOR)
        } else {
          setToast({
            isVisible: true,
            message: response.message,
            count: 0,
          })
        }
      } catch (error: any) {
        setToast({
          isVisible: true,
          message: error?.response?.data?.message || 'An error occurred while preparing settlement.',
          count: 0,
        })
      }
    }
  }

  const handleToastClose = () => {
    setToast((prev) => ({ ...prev, isVisible: false }))
  }

  useEffect(() => {
    if (toast.isVisible) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, isVisible: false }))
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [toast.isVisible])

  const handlePageChange = (newPage: number) => setPage(newPage)

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage)
    setPage(1)
  }

  const handleReceiverChange = (event: SelectChangeEvent<unknown>) => {
    setReceiverId(event.target.value as string)
    setSelectedOrders(new Set())
    setPage(1)
  }

  return {
    receiverId,
    receiverOptions,
    toast,
    selectedOrders,
    prepareButtonState,
    currentOrders,
    columns,
    totalCount,
    page,
    rowsPerPage,
    handleCheckboxChange,
    handleSelectAll,
    handlePrepareClick,
    handleToastClose,
    handleReceiverChange,
    handlePageChange,
    handleRowsPerPageChange,
  }
}

export default useOrdersReady
