import { FC, ReactNode } from 'react'
import { ButtonProps } from '@mui/material'
import { StyledButton } from '@styles/components/Button.styled'

interface CustomButtonProps extends ButtonProps {
  children: ReactNode
}

const Button: FC<CustomButtonProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>
}

export default Button
