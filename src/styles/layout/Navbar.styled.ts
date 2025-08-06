import { styled } from '@mui/material/styles'
import { Typography } from '@mui/material'
import colors from 'theme/colors'
import { typography } from 'theme/typography'

export const Container = styled('div')(() => ({
  width: '100%',
  height: '60px',
  borderRadius: '8px',
  padding: '14px 24px',
  background: colors.primary.main,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}))

export const Title = styled(Typography)(() => ({
  fontFamily: typography.h5_semibold.fontFamily,
  fontWeight: 700,
  fontSize: '18px',
  lineHeight: '24px',
  color: colors.primary.contrastText,
}))

export const ConfigContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
}))

export const ConfigLabel = styled('div')(() => ({
  fontFamily: typography.body5_medium.fontFamily,
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '15px',
  textAlign: 'right',
  verticalAlign: 'middle',
  color: colors.primary.contrastText,
}))

export const StyledSelect = styled('select')(() => ({
  width: '140px',
  height: '32px',
  padding: '8px 10px',
  border: `1px solid ${colors.border.main}`,
  borderRadius: '8px',
  fontFamily: typography.body5_medium.fontFamily,
  fontSize: '12px',
  background: colors.primary.main,
  color: colors.primary.contrastText,
  '& option': {
    fontFamily: typography.body5_medium.fontFamily,
    fontSize: '12px',
  },
  '& option:disabled': {
    color: colors.primary.contrastText,
  },
}))

export const Avatar = styled('div')(() => ({
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  backgroundColor: colors.neutral.main,
}))
