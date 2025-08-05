import { styled } from '@mui/material/styles'
import { Drawer, Box, Typography, List, ListItemButton, ListItemText, ListItemIcon } from '@mui/material'
import colors from 'theme/colors'
import { typography } from 'theme/typography'

export const StyledDrawer = styled(Drawer)({
  '& .MuiDrawer-paper': {
    width: 280,
    background: colors.primary.main,
    color: colors.primary.contrastText,
    border: 'none',
  },
})

export const LogoContainer = styled(Box)({
  padding: '24px 20px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
})

export const LogoText = styled(Typography)({
  color: colors.primary.contrastText,
  fontWeight: typography.h6_semibold.fontWeight,
  fontSize: typography.h6_semibold.fontSize,
  fontFamily: typography.h6_semibold.fontFamily,
})

export const MenuList = styled(List)({
  padding: '20px 16px',
  flex: 1,
})

export const LogoutContainer = styled(Box)({
  padding: 16,
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
})

export const StyledListItemButton = styled(ListItemButton)<{ selected?: boolean }>(({ selected }) => ({
  borderRadius: '100px !important',
  marginBottom: 8,
  padding: '10px 16px',
  minHeight: 40,

  ...(selected && {
    background: `linear-gradient(90deg, ${colors.primary.light} 0%, ${colors.primary.dark} 100%) !important`,
    width: 220,

    '&:hover': {
      background: `linear-gradient(90deg, ${colors.primary.light} 0%, ${colors.primary.dark} 100%) !important`,
    },
  }),
}))

export const MenuItemText = styled(ListItemText)({
  '& .MuiTypography-root': {
    fontFamily: typography.body2_medium.fontFamily,
    fontWeight: typography.body2_medium.fontWeight,
    fontSize: typography.body2_medium.fontSize,
  },
})

export const StyledListItemIcon = styled(ListItemIcon)(({}) => ({
  color: 'inherit',
  minWidth: 40,
}))
