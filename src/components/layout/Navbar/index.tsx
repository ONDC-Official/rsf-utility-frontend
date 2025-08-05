// Navbar.tsx

import React from 'react'
import {
  NavbarContainer,
  SystemTitle,
  ConfigContainer,
  ConfigLabel,
  StyledSelect,
  Avatar,
} from '@styles/layout/Navbar.styled'

const Navbar: React.FC = () => {
  const configurationOptions = [
    { value: 'config1', label: 'Choose...' },
    { value: 'config2', label: 'Configuration 1' },
    { value: 'config3', label: 'Configuration 2' },
  ]

  return (
    <NavbarContainer>
      <SystemTitle>Reconciliation and Settlement System</SystemTitle>

      <ConfigContainer>
        <ConfigLabel>Settlement Configuration</ConfigLabel>
        <StyledSelect>
          {configurationOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
        <Avatar />
      </ConfigContainer>
    </NavbarContainer>
  )
}

export default Navbar
