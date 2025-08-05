import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { SelectChangeEvent } from '@mui/material'
import { columns, receiverOptions } from '@pages/OrdersReady/data'
import { generateOrdersReadyData } from 'data/ordersReadyData'
import { IToastState, PrepareButtonState } from 'interfaces/ordersReady'
import { ROUTES } from 'constants/routes.constants'

const useOrdersReady = () => {
  const navigate = useNavigate()

  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [receiverId, setReceiverId] = useState('BPP_001')
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set())
  const [prepareButtonState, setPrepareButtonState] = useState<PrepareButtonState>('disabled')
  const [toast, setToast] = useState<IToastState>({ isVisible: false, message: '', count: 0 })

  const allOrders = generateOrdersReadyData(256)
  const totalCount = allOrders.length
  const startIndex = (page - 1) * rowsPerPage
  const currentOrders = allOrders.slice(startIndex, startIndex + rowsPerPage)

  useEffect(() => {
    const selectedCount = selectedOrders.size
    if (selectedCount === 0) {
      setPrepareButtonState('disabled')
    } else if (prepareButtonState === 'disabled' || prepareButtonState === 'prepare') {
      setPrepareButtonState('prepare')
    }
  }, [selectedOrders, prepareButtonState])

  const handleCheckboxChange = useCallback((orderId: string, checked: boolean) => {
    setSelectedOrders((prev) => {
      const updated = new Set(prev)
      checked ? updated.add(orderId) : updated.delete(orderId)
      return updated
    })
  }, [])

  const handlePrepareClick = () => {
    const count = selectedOrders.size
    if (prepareButtonState === 'prepare') {
      setToast({
        isVisible: true,
        message: `${count} order${count > 1 ? 's' : ''} have been prepared for settlement.`,
        count,
      })
      setPrepareButtonState('generate')
    } else if (prepareButtonState === 'generate') {
      navigate(ROUTES.SETTLEMENT_GENERATOR)
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
    handlePrepareClick,
    handleToastClose,
    handleReceiverChange,
    handlePageChange,
    handleRowsPerPageChange,
  }
}

export default useOrdersReady
