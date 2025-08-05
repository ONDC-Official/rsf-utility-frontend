import React from 'react'
import { SwitchProps } from '@mui/material'
import { IOSSwitch } from '@styles/components/Switch.styled'

interface CustomSwitchProps extends SwitchProps {
  label?: string
}

const Switch: React.FC<CustomSwitchProps> = ({ label, ...props }) => {
  return <IOSSwitch {...props} />
}

export default Switch