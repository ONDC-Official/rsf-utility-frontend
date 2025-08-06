import { AlertColor } from '@mui/material'

export interface IToastMessage {
  message: string
  severity: AlertColor
}

export interface IToastGroup {
  SUCCESS: IToastMessage
  ERROR: IToastMessage
}

export interface IToast {
  message: string
  severity: 'success' | 'error' | 'info' | 'warning'
}
