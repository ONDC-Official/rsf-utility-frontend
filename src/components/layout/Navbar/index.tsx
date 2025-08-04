import React from 'react'
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
import { MenuItem } from '@mui/material'

const Navbar: React.FC = () => {
  const configurationOptions = [
    { value: 'config1', label: 'Choose...' },
    { value: 'config2', label: 'Configuration 1' },
    { value: 'config3', label: 'Configuration 2' },
  ]

  return (
    <div>
      <StyledAppBar position="fixed">
        <StyledToolbar>
          <TitleContainer>
            <NavbarTitle>Reconciliation and Settlement System</NavbarTitle>
          </TitleContainer>

          <RightSection>
            <ConfigurationLabel>Settlement Configuration</ConfigurationLabel>

            <NavbarSelect value="config1" size="small">
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
    </div>
  )
}

export default Navbar
