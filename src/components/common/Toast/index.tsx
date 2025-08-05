import { FC } from 'react'
import { Close } from '@mui/icons-material'
import { Package } from 'lucide-react'
import { ToastProps } from 'components/common/Toast/types'
import {
  ToastContainer,
  ToastContent,
  ToastIconContainer,
  ToastTextContainer,
  ToastTitle,
  ToastMessage,
  ToastCloseButton,
} from 'styles/components/Toast.styled'

const Toast: FC<ToastProps> = ({ isVisible, title, message, onClose }) => (
  <ToastContainer $isVisible={isVisible}>
    <ToastContent>
      <ToastIconContainer>
        <Package size={20} />
      </ToastIconContainer>
      <ToastTextContainer>
        <ToastTitle>{title}</ToastTitle>
        <ToastMessage>{message}</ToastMessage>
      </ToastTextContainer>
      <ToastCloseButton onClick={onClose}>
        <Close fontSize="small" />
      </ToastCloseButton>
    </ToastContent>
  </ToastContainer>
)

export default Toast
