import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import colors from 'theme/colors'
import { typography } from 'theme/typography'
import { SendRounded } from '@mui/icons-material'

export const Container = styled(Box)({
  background: colors.background.main,
  minHeight: '100%',
})

export const Header = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: 24,
})

export const HeaderLeft = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
})

export const HeaderRight = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
})

export const PageTitle = styled(Typography)({
  fontWeight: typography.h3_semibold.fontWeight,
  color: colors.text.primary,
  fontSize: typography.h3_semibold.fontSize,
  lineHeight: typography.h3_semibold.lineHeight,
})

export const PageSubtitle = styled(Typography)({
  color: colors.text.secondary,
  fontFamily: typography.body1_regular.fontFamily,
  fontSize: typography.body1_regular.fontSize,
})

export const Wrapper = styled(Box)({
  background: colors.background.light,
  boxShadow: `6px 6px 54px 0px ${colors.shadow.main}`,
  borderRadius: 8,
  overflow: 'hidden',
})

export const TableHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 24px',
})

export const TableActions = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
})

export const TableTitle = styled(Typography)({
  fontFamily: typography.h6_semibold.fontFamily,
  fontWeight: typography.h6_semibold.fontWeight,
  color: colors.text.primary,
  fontSize: typography.h6_semibold.fontSize,
})

export const SettlementDetailsContainer = styled(Box)({
  background: colors.background.light,
  border: `1px solid ${colors.neutral?.main || '#DFE0E5'}`,
  borderRadius: 8,
  padding: '20px 24px',
  marginBottom: 24,
})

export const SectionTitle = styled(Typography)({
  fontFamily: typography.h6_semibold.fontFamily,
  fontWeight: typography.h6_semibold.fontWeight,
  color: colors.text.primary,
  fontSize: typography.h6_semibold.fontSize,
})

export const FieldRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  marginBottom: 16,
})

export const FieldLabelBox = styled(Typography)({
  flex: 0.7,
  fontFamily: typography.body1_regular.fontFamily,
  fontSize: typography.body1_regular.fontSize,
  color: colors.text.primary,
})

export const FieldInputBox = styled(Box)({
  flex: 0.3,
})

export const FieldBox = styled(Box)({
  flex: 1,
})

export const ActionButtons = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
})

export const Divider = styled(Box)({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  color: colors.text.secondary,
  fontFamily: typography.body1_regular.fontFamily,
  fontSize: typography.body1_regular.fontSize,
  marginBottom: 16,

  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    height: '1px',
    backgroundColor: colors.neutral?.main || '#DFE0E5',
    top: '50%',
    width: '45%',
  },

  '&::before': {
    left: 0,
  },

  '&::after': {
    right: 0,
  },
})

export const RotatedSendIcon = styled(SendRounded)({
  transform: 'rotate(-45deg)',
  margin: '0 8px',
})
