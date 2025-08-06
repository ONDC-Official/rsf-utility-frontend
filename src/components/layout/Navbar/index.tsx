import { FC, useEffect } from 'react'
import { MenuItem, SelectChangeEvent, Typography } from '@mui/material'
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
import { IUser } from '@interfaces/user'
import { useUserContext } from 'context/userContext'
import { AccountCircle } from '@mui/icons-material'

const Navbar: FC = () => {
  const { users, selectedUser, setSelectedUser } = useUserContext()

  const handleUserChange = (event: SelectChangeEvent<unknown>) => {
    const selectedId = event.target.value as string
    const userObj = users?.find((u) => u._id === selectedId) || null
    setSelectedUser(userObj)
  }

  // Auto-select first user by default
  useEffect(() => {
    if (!selectedUser && users?.length) {
      setSelectedUser(users[0])
    }
  }, [users, selectedUser, setSelectedUser])

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <TitleContainer>
          <NavbarTitle variant={TypographyVariant.Caption1Semibold}>Reconciliation and Settlement System</NavbarTitle>
        </TitleContainer>

        <RightSection>
          <ConfigurationLabel variant={TypographyVariant.Body5Medium}>Subscriber</ConfigurationLabel>

          <NavbarSelect
            value={selectedUser?._id ?? ''}
            size="small"
            displayEmpty
            onChange={handleUserChange}
            renderValue={(selected) => {
              if (!selected) {
                return (
                  <Typography variant={TypographyVariant.Body5Light} color="#FFFFFF">
                    Choose...
                  </Typography>
                )
              }

              const option = users?.find((u) => u._id === selected)
              return <Typography variant={TypographyVariant.Body5Light}>{option?.subscriber_url}</Typography>
            }}
          >
            {users?.length ? (
              users.map((user: IUser) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.subscriber_url}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No users available</MenuItem>
            )}
          </NavbarSelect>

          <UserAvatar>
            <AccountCircle />
          </UserAvatar>
        </RightSection>
      </StyledToolbar>
    </StyledAppBar>
  )
}

export default Navbar
