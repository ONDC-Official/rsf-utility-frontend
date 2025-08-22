import { FC } from 'react'
import { Close, Inventory2, ErrorOutline, CheckCircle, InfoOutlined, WarningAmber } from '@mui/icons-material'
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

// ✅ Map severity to icon
const iconMap: Record<string, JSX.Element> = {
  success: <CheckCircle fontSize="small" color="success" />,
  error: <ErrorOutline fontSize="small" color="error" />,
  warning: <WarningAmber fontSize="small" color="warning" />,
  info: <InfoOutlined fontSize="small" color="info" />,
}

const Toast: FC<IToastProps> = ({ isVisible, title, message, details, severity = 'info', onClose }) => (
  <Container isVisible={isVisible}>
    <ToastContent>
      <ToastIconContainer>{iconMap[severity] || <Inventory2 fontSize="small" />}</ToastIconContainer>

      <ToastTextContainer>
        <ToastTitle>{title}</ToastTitle>

        <ToastMessage>
          {message}
          {details && <div style={{ fontSize: '0.85rem', marginTop: 4, color: '#666' }}>{details}</div>}
        </ToastMessage>
      </ToastTextContainer>

      <ToastCloseButton onClick={onClose}>
        <Close fontSize="small" />
      </ToastCloseButton>
    </ToastContent>
  </Container>
)

export default Toast
