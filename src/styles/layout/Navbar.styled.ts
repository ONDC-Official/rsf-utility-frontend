import styled from 'styled-components'
import { AppBar, Toolbar, Box, Typography, Avatar } from '@mui/material'
import colors from '@theme/colors'
import { typography } from '@theme/typography'

export const StyledAppBar = styled(AppBar)`
  background: ${colors.primary.main} !important;
  box-shadow: none !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

export const StyledToolbar = styled(Toolbar)`
  margin-left: 300px !important;
  padding-right: 24px !important;
  min-height: 64px !important;
`

export const TitleContainer = styled(Box)`
  flex: 1;
`

export const RightSection = styled(Box)`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const NavbarTitle = styled(Typography)`
  color: ${colors.primary.contrastText};
  font-family: ${typography.caption1_semibold.fontFamily};
  font-weight: ${typography.caption1_semibold.fontWeight};
  font-size: ${typography.caption1_semibold.fontSize};
`

export const ConfigurationLabel = styled(Typography)`
  color: ${colors.primary.contrastText};
  font-family: ${typography.body2_medium.fontFamily};
  font-size: ${typography.body2_medium.fontSize};
`

export const UserAvatar = styled(Avatar)`
  width: 32px;
  height: 32px;
  background-color: ${colors.primary.light};
`
