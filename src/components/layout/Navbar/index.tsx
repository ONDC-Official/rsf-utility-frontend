import { FC, useState } from 'react'
import { MenuItem, SelectChangeEvent, Typography } from '@mui/material'
import { configurationOptions } from 'components/layout/Navbar/configurationOptions'
import { TypographyVariant } from 'enums/typography'
import {
  StyledAppBar,
  StyledToolbar,
  TitleContainer,
  RightSection,
  NavbarTitle,
  ConfigurationLabel,
  UserAvatar,
} from 'styles/layout/Navbar.styled'
import { NavbarSelect } from 'styles/components/Select.styled'

const Navbar: FC = () => {
  const [selectedConfig, setSelectedConfig] = useState<string>('')

  const handleConfigChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedConfig(event.target.value as string)
  }

  return (
    <StyledAppBar position="fixed">
      <StyledToolbar>
        <TitleContainer>
          <NavbarTitle variant={TypographyVariant.Caption1Semibold}>Reconciliation and Settlement System</NavbarTitle>
        </TitleContainer>

        <RightSection>
          <ConfigurationLabel variant={TypographyVariant.Body5Medium}>Settlement Configuration</ConfigurationLabel>

          <NavbarSelect
            value={selectedConfig}
            size="small"
            displayEmpty
            onChange={handleConfigChange}
            renderValue={(selected) => {
              if (!selected) {
                return (
                  <Typography variant={TypographyVariant.Body5Light} color="#FFFFFF">
                    Choose...
                  </Typography>
                )
              }

              const option = configurationOptions?.find((opt) => opt.value === selected)
              return <Typography variant={TypographyVariant.Body5Light}>{option?.label}</Typography>
            }}
          >
            {configurationOptions?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            )) ?? <MenuItem disabled>No options available</MenuItem>}
          </NavbarSelect>

          <UserAvatar>JD</UserAvatar>
        </RightSection>
      </StyledToolbar>
    </StyledAppBar>
  )
}

export default Navbar
