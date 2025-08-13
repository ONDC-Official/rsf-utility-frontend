export interface IToastProps {
  isVisible: boolean
  title: string
  message: string
  details?: string
  severity?: 'success' | 'error' | 'warning' | 'info'
  onClose: () => void
}
