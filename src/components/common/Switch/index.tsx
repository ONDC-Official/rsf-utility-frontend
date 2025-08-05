import { FC } from 'react'
import { IOSSwitch } from 'styles/components/Switch.styled'
import { ICustomSwitchProps } from 'components/common/Switch/types'

const Switch: FC<ICustomSwitchProps> = ({ ...props }) => <IOSSwitch {...props} />

export default Switch
