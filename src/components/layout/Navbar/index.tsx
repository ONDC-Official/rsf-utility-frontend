import { FC } from 'react'
import {
  NavbarContainer,
  SystemTitle,
  ConfigContainer,
  ConfigLabel,
  StyledSelect,
  Avatar,
} from '../../../styles/layout/Navbar.styled'
import { configurationOptions } from './configurationOptions'

const Navbar: FC = () => {
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
