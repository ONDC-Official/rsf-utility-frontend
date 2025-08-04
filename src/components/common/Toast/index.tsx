import React from 'react'
import { Close } from '@mui/icons-material'
import { Package } from 'lucide-react'
import {
  ToastContainer,
  ToastContent,
  ToastIconContainer,
  ToastTextContainer,
  ToastTitle,
  ToastMessage,
  ToastCloseButton,
} from '@styles/components/Toast.styled'

interface ToastProps {
  isVisible: boolean
  title: string
  message: string
  onClose: () => void
}

const Toast: React.FC<ToastProps> = ({ isVisible, title, message, onClose }) => {
  return (
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
}

export default Toast