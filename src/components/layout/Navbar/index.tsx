import { FC } from 'react'
import {
  Container,
  Title,
  ConfigContainer,
  ConfigLabel,
  StyledSelect,
  Avatar,
} from 'styles/layout/Navbar.styled'
import { configurationOptions } from './configurationOptions'

const Navbar: FC = () => {
  return (
    <Container>
      <Title>Reconciliation and Settlement System</Title>

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
    </Container>
  )
}

export default Navbar
