import { FC } from 'react'
import { CustomButtonProps } from 'components/common/Button/types'
import { StyledButton } from 'styles/components/Button.styled'

const Button: FC<CustomButtonProps> = ({ children, ...props }) => <StyledButton {...props}>{children}</StyledButton>

export default Button
