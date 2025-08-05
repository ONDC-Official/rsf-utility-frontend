import { FC } from 'react'
import { ICustomButtonProps } from 'components/common/Button/types'
import { StyledButton } from 'styles/components/Button.styled'

const Button: FC<ICustomButtonProps> = ({ children, ...props }) => <StyledButton {...props}>{children}</StyledButton>

export default Button
