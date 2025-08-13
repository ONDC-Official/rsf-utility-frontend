import { FC, createContext, useContext, useEffect, useState } from 'react'
import { IToast } from 'interfaces/toastMessages'
import Toast from 'components/common/Toast'

let globalToastHandler: ((toast: IToast) => void) | null = null
export const setToastHandler = (handler: (toast: IToast) => void) => {
  globalToastHandler = handler
}

export const toastErrorFromApi = (error: any) => {
  if (!globalToastHandler) return

  const apiError = error?.response?.data
  const detailsError = apiError?.details?.error

  globalToastHandler({
    message: apiError?.message || 'Something went wrong',
    severity: 'error',
    details: detailsError,
  })
}

const ToastContext = createContext<((toast: IToast) => void) | undefined>(undefined)

export const ToastProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<IToast | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const showToast = (t: IToast): void => {
    setToast(t)
    setIsVisible(true)

    setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => setToast(null), 300)
    }, 3500)
  }

  const handleClose = (): void => {
    setIsVisible(false)
    setTimeout(() => setToast(null), 300)
  }

  useEffect(() => {
    setToastHandler(showToast)
  }, [])

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toast && (
        <Toast isVisible={isVisible} title={toast.message} message={toast.details || ''} onClose={handleClose} />
      )}
    </ToastContext.Provider>
  )
}

export const useToast = (): ((toast: IToast) => void) => {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return ctx
}
