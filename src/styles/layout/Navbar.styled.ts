import { styled } from '@mui/material/styles'
import { AppBar, Toolbar, Box, Typography, Avatar } from '@mui/material'
import colors from 'theme/colors'
import Select from 'components/common/Select'

export const StyledAppBar = styled(AppBar)({
  background: `${colors.primary.main} !important`,
  boxShadow: 'none !important',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: 20,
  marginBottom: 16,
})

export const StyledToolbar = styled(Toolbar)({
  minHeight: '48px !important',
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

export const StyledSelect = styled(Select)({
  width: '140px',
  height: '24px',
  justifyContent: 'space-between',
  borderRadius: '8px',
  paddingTop: '8px',
  paddingRight: '10px',
  paddingBottom: '8px',
  paddingLeft: '10px',
  border: `1px solid ${colors.button.subHeading}`,
  backgroundColor: colors.primary.main,
  fontSize: '12px',
  fontFamily: 'Inter',
  color: colors.primary.contrastText,

  '& .MuiSelect-select': {
    display: 'flex',
    alignItems: 'center',
    padding: 0,
    height: '100%',
  },

  '& .MuiSelect-icon': {
    color: colors.primary.contrastText,
  },
})
export const UserAvatar = styled(Avatar)({
  width: 32,
  height: 32,
  backgroundColor: colors.primary.light,
})
