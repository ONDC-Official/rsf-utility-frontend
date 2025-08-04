import styled from 'styled-components'
import { Box, Typography } from '@mui/material'
import colors from '@theme/colors'
import { typography } from '@theme/typography'

export const ToastContainer = styled(Box)<{ $isVisible: boolean }>`
  position: absolute;
  top: 50px;
  right: 0;
  z-index: 9999;
  transition: all 0.3s ease-in-out;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
`

export const ToastContent = styled(Box)`
  background: ${colors.background.light};
  border: 1px solid ${colors.border.main};
  box-shadow: 0px 10px 40px 0px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 320px;
`

export const ToastIconContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`

export const ToastTextContainer = styled(Box)`
  flex: 1;
`

export const ToastTitle = styled(Typography)`
  font-family: ${typography.body2_semibold.fontFamily};
  font-weight: ${typography.body2_semibold.fontWeight};
  font-size: ${typography.body2_semibold.fontSize};
  color: ${colors.text.primary};
  margin-bottom: 2px;
`

export const ToastMessage = styled(Typography)`
  font-family: ${typography.body2_regular.fontFamily};
  font-weight: ${typography.body2_regular.fontWeight};
  font-size: ${typography.body2_regular.fontSize};
  color: ${colors.text.secondary};
`

export const ToastCloseButton = styled(Box)`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  color: ${colors.text.secondary};
  
  &:hover {
    color: ${colors.text.primary};
  }
`