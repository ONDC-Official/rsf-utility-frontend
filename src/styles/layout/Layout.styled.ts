import { styled } from '@mui/material/styles'
import colors from 'theme/colors'
import { typography } from 'theme/typography'

export const Container = styled('div')({
  display: 'flex',
  gap: 20,
  height: '100vh',
  padding: 20,
})

export const Wrapper = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflowX: 'hidden',
})

export const Footer = styled('footer')({
  display: 'flex',
  justifyContent: 'center',
  padding: '16px 0',
})

export const FooterText = styled('p')({
  fontSize: 14,
  color: colors.text.secondary,
  fontFamily: typography.body1_regular.fontFamily,
})

export const Content = styled('main')({
  flex: 1,
  overflowY: 'auto',
})

export const SidebarContainer = styled('div')({
  width: 280,
  height: '97vh',
  borderRadius: 20,
  padding: '30px 0',
  background: colors.primary.main,
  color: colors.primary.contrastText,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

export const StyledText = styled('div')({
  fontFamily: typography.body2_medium.fontFamily,
  fontWeight: 500,
  fontStyle: 'normal',
  fontSize: 14,
  lineHeight: '20px',
  letterSpacing: 0,
  verticalAlign: 'middle',
  color: colors.primary.contrastText,
})

export const Logo = styled('img')({
  marginBottom: 40,
  width: 113,
})

export const MenuContainer = styled('div')({
  width: '100%',
  padding: 10,
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  marginTop: 40,
})

export const MenuItem = styled('div')<{ active: boolean }>(({ active }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '10px 16px',
  borderRadius: 100,
  cursor: 'pointer',
  background: active
    ? `linear-gradient(90deg, ${colors.primary.light} 0%, ${colors.primary.dark} 100%)`
    : 'transparent',
  color: colors.primary.contrastText,
  opacity: 1,
  transition: 'background 0.3s ease',
  fontFamily: typography.body2_medium.fontFamily,
  fontSize: 14,
  fontWeight: 500,
  lineHeight: '20px',
  '&:hover': {
    background: active
      ? `linear-gradient(90deg, ${colors.primary.light} 0%, ${colors.primary.dark} 100%)`
      : colors.primary.dark,
  },
}))

export const StyledIcon = styled('div')({})
