import { styled } from '@mui/material/styles'
import { Typography } from '@mui/material'
import colors from 'theme/colors'
import typography from 'theme/typography'
import Button from 'components/common/Button'
import Select from 'components/common/Select'
import InputField from 'components/common/InputField'

export const Container = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
}))

export const HeaderSection = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'start',
}))

export const HeaderCard = styled('div')(() => ({
  borderRadius: '12px',
  padding: '0 16px 16px 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
}))

export const SectionTitle = styled(Typography)(() => ({
  fontWeight: typography.h3_semibold.fontWeight,
  color: colors.text.caption,
  fontSize: typography.h3_semibold.fontSize,
  lineHeight: typography.h3_semibold.lineHeight,
}))

export const SectionDescription = styled('div')(() => ({
  fontFamily: 'Inter',
  fontWeight: 400,
  fontSize: '18px',
  lineHeight: '24px',
  color: '#757575',
  margin: 0,
}))

export const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
})

export const ConfigurationBox = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  borderRadius: '20px',
  padding: '32px',
  background: colors.text.light,
  boxShadow: '6px 6px 54px 0px #0000000d',
}))

export const NetworkIdentityHeader = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  gap: '10px',
}))

export const SettlementHeader = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: '10px',
}))

export const NetworkIdentityTitle = styled('div')(() => ({
  fontFamily: 'Inter',
  fontWeight: 700,
  fontSize: '24px',
  lineHeight: '32px',
  color: colors.text.caption,
}))

export const ActionButton = styled(Button)(() => ({
  height: '50px',
  borderRadius: '8px',
  background: colors.text.light,
  border: '1px solid ${colors.border.main}',
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: 600,
  padding: '8px 10px',
  display: 'flex',
  gap: '5px',
  cursor: 'pointer',
  '&:hover': {
    background: '#f5f5f5',
  },
}))

export const LabelWrapper = styled('div')({
  display: 'flex',
  alignItems: 'flex-end',
  gap: '6px',
})

export const IconWrapper = styled('div')({
  cursor: 'pointer',
})

export const BulkButton = styled(Button)(() => ({
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: 600,
  padding: '8px 10px',
  display: 'flex',
  gap: '7px',
}))

export const DomainConfigContainer = styled('div')(() => ({
  border: '1px solid #dfe0e5',
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  borderRadius: '8px',
  marginBottom: '32px', // Add space below for section separation
}))

export const ConfigTitleSection = styled('div')(() => ({
  height: '64px',
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
}))

export const ErrorMessage = styled(Typography)({
  marginLeft: '14px',
  marginTop: '3px',
  display: 'block',
})

export const FormContainer = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '20px',
  marginTop: '20px',
  alignItems: 'start',
  '& > div': {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
}))

export const ConfigHeader = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  gridColumn: '1 / -1',
  color: colors.text.caption,
  fontWeight: typography.body2_semibold?.fontWeight || '600',
  fontSize: typography.body2_semibold?.fontSize || '12px',
}))

export const ButtonGroup = styled('div')(() => ({
  display: 'flex',
  gap: '20px',
}))

export const SaveButtonContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'end',
  marginBottom: '20px',
}))

export const RemoveWrapper = styled('div')({
  cursor: 'pointer',
})

export const StyledSelect = styled(Select)({
  '& .MuiSelect-select': {
    fontSize: '14px',
    color: colors.text.main,
  },
  '& .Mui-disabled': {
    backgroundColor: '#ececec',
  },
})

export const StyledInput = styled(InputField)({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    fontFamily: typography.body2_regular.fontFamily,
    fontSize: typography.body2_regular.fontSize,
    backgroundColor: colors.background.light,
    borderRadius: 10,
    '& fieldset': {
      borderColor: colors.neutral.main,
      borderRadius: 10,
      height: 62,
    },
    '&:hover fieldset': {
      borderColor: colors.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: colors.primary.main,
    },
    '& .MuiInputBase-input': {
      height: '100%',
      padding: '20px 14px',
      boxSizing: 'border-box',
    },
    '&.Mui-disabled': {
      backgroundColor: '#ececec',
    },
  },
  '& .MuiInputLabel-root': {
    display: 'none',
  },
})
