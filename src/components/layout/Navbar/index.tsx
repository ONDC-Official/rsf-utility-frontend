import { FC, useMemo } from 'react'
import { SelectChangeEvent, Typography } from '@mui/material'
import { TypographyVariant } from 'enums/typography'
import { StyledAppBar, StyledToolbar, TitleContainer, RightSection, StyledSelect } from 'styles/layout/Navbar.styled'
import { useUserContext } from 'context/userContext'
import { useLocation } from 'react-router-dom'
import { sidebarMenuItems } from 'components/layout/Sidebar/sidebarMenuItems'

const Navbar: FC = () => {
  const { users, selectedUser, setSelectedUser } = useUserContext()
  const location = useLocation()

  const normalizedPath = useMemo(() => {
    return location.pathname.replace(/^\/rsf-sdk-utility/, '') || '/'
  }, [location.pathname])

  const currentTitle = useMemo(() => {
    const matchedItem = sidebarMenuItems.find((item) => normalizedPath.startsWith(item.path))
    return matchedItem?.text || 'ONDC Portal'
  }, [normalizedPath])

  const handleUserChange = (event: SelectChangeEvent<unknown>): void => {
    const selectedId = event.target.value as string
    if (selectedUser?._id === selectedId) return

    const userObj = users?.find((u) => u._id === selectedId) || null
    setSelectedUser(userObj)
  }

  const userOptions = useMemo(
    () =>
      users?.map((user) => ({
        label: user.title || 'n/a',
        value: user._id,
      })) ?? [],
    [users],
  )

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <TitleContainer>
          <Typography variant={TypographyVariant.H6Bold}>{currentTitle}</Typography>
        </TitleContainer>

        <RightSection>
          <Typography variant={TypographyVariant.Caption1Bold}>Settlement Configuration</Typography>

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
