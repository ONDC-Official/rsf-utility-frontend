import { FC } from 'react'
import { IOSSwitch } from '@styles/components/Switch.styled'
import { CustomSwitchProps } from '@components/common/Switch/types'

const Switch: FC<CustomSwitchProps> = ({ label, ...props }) => {
  return <IOSSwitch {...props} />
}

export default Switch
