import React, { useState } from 'react'
import { MenuItem, SelectChangeEvent } from '@mui/material'
import { configurationOptions } from '@components/layout/Navbar/configurationOptions'
import {
  StyledAppBar,
  StyledToolbar,
  TitleContainer,
  RightSection,
  NavbarTitle,
  ConfigurationLabel,
  UserAvatar,
} from '@styles/layout/Navbar.styled'
import { NavbarSelect } from '@styles/components/Select.styled'

const Navbar: React.FC = () => {
  const [selectedConfig, setSelectedConfig] = useState('')

  const handleConfigChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedConfig(event.target.value as string)
  }

  return (
    <StyledAppBar position="fixed">
      <StyledToolbar>
        <TitleContainer>
          <NavbarTitle>Reconciliation and Settlement System</NavbarTitle>
        </TitleContainer>

        <RightSection>
          <ConfigurationLabel>Settlement Configuration</ConfigurationLabel>

          <NavbarSelect
            value={selectedConfig}
            size="small"
            displayEmpty
            onChange={handleConfigChange}
            renderValue={(selected) => {
              if (!selected) {
                return <span style={{ color: '#FFFFFF' }}>Choose...</span>
              }

              const option = configurationOptions.find((opt) => opt.value === selected)
              return option?.label as React.ReactNode
            }}
          >
            {configurationOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </NavbarSelect>

          <UserAvatar>JD</UserAvatar>
        </RightSection>
      </StyledToolbar>
    </StyledAppBar>
  )
}

export default Navbar
