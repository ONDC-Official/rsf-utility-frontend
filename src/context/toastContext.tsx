import React, { createContext, useContext, useState } from 'react'
import { Snackbar, Alert } from '@mui/material'

interface IToast {
  message: string
  severity: 'success' | 'error' | 'info' | 'warning'
}

const ToastContext = createContext<((toast: IToast) => void) | undefined>(undefined)

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<IToast | null>(null)

  const showToast = (t: IToast) => setToast(t)
  const handleClose = () => setToast(null)

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

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return ctx
}
