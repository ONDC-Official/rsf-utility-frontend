import { FC } from 'react'
import { SelectChangeEvent, Typography } from '@mui/material'
import { TypographyVariant } from 'enums/typography'
import { StyledAppBar, StyledToolbar, TitleContainer, RightSection, StyledSelect } from 'styles/layout/Navbar.styled'
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
          <Typography variant={TypographyVariant.H6Bold}>Reconciliation and Settlement System</Typography>
        </TitleContainer>

        <RightSection>
          <Typography variant={TypographyVariant.Caption1Bold}>Configuration</Typography>

          <StyledSelect
            value={selectedUser?._id ?? ''}
            onChange={handleUserChange}
            options={userOptions}
            displayEmpty
            renderValue={(selected) => {
              if (!selected) return 'Choose...'
              const user = users?.find((u) => u._id === selected)
              return user?.title || 'n/a'
            }}
          />
        </RightSection>
      </StyledToolbar>
    </StyledAppBar>
  )
}

export default Navbar
