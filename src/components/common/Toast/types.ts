export interface ToastProps {
  isVisible: boolean
  title: string
  message: string
  onClose: () => void
}
