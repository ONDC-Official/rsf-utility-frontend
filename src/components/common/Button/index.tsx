import React from 'react'
import { ButtonProps } from '@mui/material'
import { StyledButton } from '@styles/components/Button.styled'

interface CustomButtonProps extends ButtonProps {
  children: React.ReactNode
}

const Button: React.FC<CustomButtonProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>
}

export default Button
