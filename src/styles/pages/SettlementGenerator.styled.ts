import { styled } from '@mui/material/styles'
import { Box, IconButton, Typography } from '@mui/material'
import colors from 'theme/colors'
import { typography } from 'theme/typography'
import { StyledTableBodyCell } from 'styles/components/Table.styled'

export const Container = styled(Box)({
  background: colors.background.main,
  minHeight: '100%',
})

export const PageHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: 8,
})

export const Left = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
})

export const Right = styled(Box)({
  display: 'flex',
  alignItems: 'center',
})

export const PageTitle = styled(Typography)({
  fontFamily: typography.h3_semibold.fontFamily,
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

export const AlertContainer = styled(Box)({
  background: colors.alert.light,
  border: `1px solid ${colors.alert.main}`,
  color: colors.alert.main,
  borderRadius: 8,
  padding: '12px 16px',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  fontFamily: typography.body2_medium.fontFamily,
  fontSize: typography.body2_medium.fontSize,
})

export const SettlementModeContainer = styled(Box)({
  background: colors.background.light,
  border: `1px solid ${colors.neutral.main}`,
  borderRadius: 8,
  padding: '20px 24px',
  marginBottom: 24,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const ModeLeft = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
})

export const ModeRight = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
})

export const ModeContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
})

export const ModeRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
})

export const CustomDateLabel = styled(Typography)({
  fontFamily: typography.body2_medium.fontFamily,
  fontWeight: typography.body2_medium.fontWeight,
  color: colors.text.primary,
  fontSize: typography.body2_medium.fontSize,
  marginBottom: 8,
})

export const ModeTitle = styled(Typography)({
  fontFamily: typography.h6_semibold.fontFamily,
  fontWeight: typography.h6_semibold.fontWeight,
  color: colors.text.primary,
  fontSize: typography.h6_semibold.fontSize,
})

export const ModeDescription = styled(Typography)({
  fontFamily: typography.body2_regular.fontFamily,
  color: colors.text.secondary,
  fontSize: typography.body2_regular.fontSize,
})

export const CounterpartyLabel = styled(Typography)({
  color: colors.text.primary,
  fontFamily: typography.body2_medium.fontFamily,
  fontWeight: typography.body2_medium.fontWeight,
  fontSize: typography.body2_medium.fontSize,
})

export const OrderSelectionContainer = styled(Box)({
  background: colors.background.light,
  boxShadow: `6px 6px 54px 0px ${colors.shadow.main}`,
  borderRadius: 8,
  overflow: 'hidden',
  marginBottom: 24,
})

export const OrderSelectionHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 24px',
  borderBottom: `1px solid ${colors.border.main}`,
})

export const SectionTitle = styled(Typography)({
  fontFamily: typography.h6_semibold.fontFamily,
  fontWeight: typography.h6_semibold.fontWeight,
  color: colors.text.primary,
  fontSize: typography.h6_semibold.fontSize,
})

export const ActionButtons = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
})

export const SummaryContainer = styled(Box)({
  background: colors.background.light,
  boxShadow: '6px 6px 54px 0px rgba(0, 0, 0, 0.05)',
  borderRadius: 8,
  padding: 24,
  marginBottom: 24,
})

export const SummaryHeader = styled(Typography)({
  fontFamily: typography.h6_semibold.fontFamily,
  fontWeight: typography.h6_semibold.fontWeight,
  color: colors.text.primary,
  fontSize: typography.h6_semibold.fontSize,
  marginBottom: 20,
})

export const SummaryCards = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 16,
  marginBottom: 24,
})

export const Divider = styled(Box)({
  height: 1,
  background: colors.border.main,
  margin: '24px 0',
})

export const CustomDateSection = styled(Box)({
  marginBottom: 24,
})

export const ButtonSection = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
})

export const PayloadPreviewContainer = styled(Box)({
  background: colors.background.light,
  boxShadow: '6px 6px 54px 0px rgba(0, 0, 0, 0.05)',
  borderRadius: 8,
  padding: 24,
})

export const PayloadHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginTop: 20,
})

export const PayloadActions = styled(Box)({
  display: 'flex',
  gap: 16,
})

export const JsonPreview = styled(Box)({
  background: colors.background.main,
  borderRadius: 8,
  padding: 16,
  fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
  fontSize: 12,
  lineHeight: 1.4,
  color: colors.text.primary,
  whiteSpace: 'pre-wrap',
  overflowX: 'auto',
  maxHeight: 400,
  overflowY: 'auto',
})

export const PlaceholderText = styled('span')({
  color: colors.text.disabled,
})

export const ModalContainer = styled(Box)({
  position: 'absolute',
  top: '10%',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '600px',
  maxWidth: '90vw',
  maxHeight: '80vh',
  overflowY: 'auto',
})

export const Content = styled(Box)({
  background: colors.background.light,
  borderRadius: 8,
  boxShadow: `6px 6px 54px 0px ${colors.shadow.main}`,
  padding: 0,
})

export const ModalTitle = styled(Typography)({
  fontFamily: typography.h6_semibold.fontFamily,
  fontWeight: typography.h6_semibold.fontWeight,
  color: colors.text.primary,
  fontSize: typography.h6_semibold.fontSize,
})

export const CloseButton = styled(IconButton)({
  padding: '8px',
  color: colors.text.secondary,
})

export const StyledForm = styled('form')({
  padding: '24px',
})

export const FormRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '16px',
  marginBottom: '16px',
})

export const ButtonContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '12px',
  marginTop: '24px',
  paddingTop: '24px',
  borderTop: `1px solid ${colors.border.main}`,
})

export const Header = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 24px',
  borderBottom: `1px solid ${colors.border.main}`,
})

export const ActionsCell = styled(StyledTableBodyCell)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
})

export const OrderSummaryFormBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  maxHeight: '55vh',
  overflowY: 'auto',
  paddingRight: '1rem',
}))

export const OrderSummaryFormRow = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-end',
  gap: '1rem',
  flexWrap: 'wrap',
  border: `1px solid ${colors.border.main}`,
  padding: '1rem',
  borderRadius: '8px',
}))
