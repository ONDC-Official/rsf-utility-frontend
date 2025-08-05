import { FC } from 'react'
import { IOSSwitch } from 'styles/components/Switch.styled'
import { CustomSwitchProps } from 'components/common/Switch/types'

const Switch: FC<CustomSwitchProps> = ({ ...props }) => <IOSSwitch {...props} />

export default Switch
