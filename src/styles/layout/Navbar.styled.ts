import { styled } from '@mui/material/styles'
import { AppBar, Toolbar, Box, Typography, Avatar } from '@mui/material'
import colors from 'theme/colors'

export const StyledAppBar = styled(AppBar)({
  background: `${colors.primary.main} !important`,
  boxShadow: 'none !important',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
})

export const StyledToolbar = styled(Toolbar)({
  paddingLeft: '300px !important',
  paddingRight: '24px !important',
  minHeight: '64px !important',
})

export const TitleContainer = styled(Box)({
  flex: 1,
})

export const RightSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
})

export const NavbarTitle = styled(Typography)({
  color: colors.primary.contrastText,
})

export const ConfigurationLabel = styled(Typography)({
  color: colors.primary.contrastText,
})

export const UserAvatar = styled(Avatar)({
  width: 32,
  height: 32,
  backgroundColor: colors.primary.light,
})
