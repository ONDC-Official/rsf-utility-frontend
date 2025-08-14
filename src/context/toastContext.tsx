import { FC, createContext, useContext, useState } from 'react'
import { Snackbar, Alert } from '@mui/material'
import { IToast } from 'interfaces/toastMessages'

const ToastContext = createContext<((toast: IToast) => void) | undefined>(undefined)

export const ToastProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<IToast | null>(null)

  const showToast = (t: IToast): void => setToast(t)
  const handleClose = (): void => setToast(null)

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <Snackbar open={!!toast} autoHideDuration={3500} onClose={handleClose}>
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={toast?.severity || 'info'}
          sx={{ display: toast ? 'flex' : 'none' }}
        >
          {toast?.message || ''}
        </Alert>
      </Snackbar>
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
