import { FC } from 'react'
import { Close, Inventory2 } from '@mui/icons-material'
import { IToastProps } from 'components/common/Toast/types'
import {
  Container,
  ToastContent,
  ToastIconContainer,
  ToastTextContainer,
  ToastTitle,
  ToastMessage,
  ToastCloseButton,
} from 'styles/components/Toast.styled'

const Toast: FC<IToastProps> = ({ isVisible, title, message, onClose }) => (
  <Container isVisible={isVisible}>
    <ToastContent>
      <ToastIconContainer>
        <Inventory2 fontSize="small" />
      </ToastIconContainer>
      <ToastTextContainer>
        <ToastTitle>{title}</ToastTitle>
        <ToastMessage>{message}</ToastMessage>
      </ToastTextContainer>
      <ToastCloseButton onClick={onClose}>
        <Close fontSize="small" />
      </ToastCloseButton>
    </ToastContent>
  </Container>
)

export default Toast
