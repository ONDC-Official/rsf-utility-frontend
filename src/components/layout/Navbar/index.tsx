import { FC } from 'react'
import { SelectChangeEvent } from '@mui/material'
import { TypographyVariant } from 'enums/typography'
import {
  StyledAppBar,
  StyledToolbar,
  TitleContainer,
  RightSection,
  NavbarTitle,
  ConfigurationLabel,
  StyledSelect,
} from 'styles/layout/Navbar.styled'
import { useUserContext } from 'context/userContext'

const Navbar: FC = () => {
  const { users, selectedUser, setSelectedUser } = useUserContext()

  const handleUserChange = (event: SelectChangeEvent<unknown>): void => {
    const selectedId = event.target.value as string
    // Prevent unnecessary state updates which can cause re-render loops
    if (selectedUser?._id === selectedId) return
    const userObj = users?.find((u) => u._id === selectedId) || null
    setSelectedUser(userObj)
  }

  const userOptions =
    users?.map((user) => ({
      label: user.title || 'n/a',
      value: user._id,
    })) ?? []

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <TitleContainer>
          <NavbarTitle variant={TypographyVariant.Caption1Semibold}>Reconciliation and Settlement System</NavbarTitle>
        </TitleContainer>

        <RightSection>
          <ConfigurationLabel variant={TypographyVariant.Body5Medium}>Configuration</ConfigurationLabel>

          <StyledSelect
            value={selectedUser?._id ?? ''}
            onChange={handleUserChange}
            options={userOptions}
            displayEmpty
            renderValue={(selected) => {
              if (!selected) return 'Choose...'
              const user = users?.find((u) => u._id === selected)
              return user?.subscriber_url || 'Choose...'
            }}
          />
        </RightSection>
      </StyledToolbar>
    </StyledAppBar>
  )
}

export default Navbar
