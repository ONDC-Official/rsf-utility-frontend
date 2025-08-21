import { styled } from '@mui/material/styles'
import { Typography } from '@mui/material'
import colors from 'theme/colors'
import Button from 'components/common/Button'
import Select from 'components/common/Select'
import InputField from 'components/common/InputField'

export const Container = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
}))

export const MainContainer = styled('div')(() => ({
  background: colors.background.light,
  boxShadow: colors.shadow.card,
  borderRadius: '12px',
  padding: '24px',
}))

export const HeaderSection = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '24px',
}))

export const HeaderTitle = styled('div')(() => ({
  fontFamily: 'Inter',
  fontWeight: 700,
  fontSize: '24px',
  lineHeight: '32px',
  color: colors.text.caption,
}))

export const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
})

export const DomainConfigContainer = styled('div')(() => ({
  background: colors.background.light,
  border: `1px solid ${colors.neutral.main}`,
  borderRadius: '12px',
  padding: '24px',
}))

export const SectionTitle = styled('div')(() => ({
  fontFamily: 'Inter',
  fontWeight: 600,
  fontSize: '18px',
  lineHeight: '24px',
  color: colors.text.caption,
  marginBottom: '20px',
}))

export const FullWidthFieldContainer = styled('div')(() => ({
  width: '100%',
  marginBottom: '20px',
}))

export const FieldRow = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '20px',
  marginBottom: '20px',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
}))

export const TaxContainer = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '20px',
  marginBottom: '20px',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
}))

export const TaxSection = styled('div')(() => ({
  border: `1px dashed ${colors.neutral.dashed}`,
  borderRadius: '8px',
  padding: '16px',
}))

export const ApplicabilityContainer = styled('div')(() => ({
  border: `1px dashed ${colors.neutral.dashed}`,
  borderRadius: '8px',
  padding: '16px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '20px',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
}))

export const TaxFieldRow = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '16px',
  marginBottom: '16px',
  '&:last-child': {
    marginBottom: 0,
  },
}))

export const ProviderContainer = styled('div')(() => ({
  background: colors.background.light,
  boxShadow: colors.shadow.card,
  borderRadius: '12px',
  padding: '24px',
}))

export const ProviderHeader = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '24px',
}))

export const ProviderButtonGroup = styled('div')(() => ({
  display: 'flex',
  gap: '12px',
}))

export const ProvidersGrid = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '16px',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
}))

export const ProviderSection = styled('div')(() => ({
  border: `1px solid ${colors.neutral.main}`,
  borderRadius: '8px',
  padding: '16px',
}))

export const ProviderSectionHeader = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
}))

export const ProviderFieldsContainer = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '16px',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
}))

export const CounterpartyContainer = styled('div')(() => ({
  background: colors.background.light,
  boxShadow: colors.shadow.card,
  borderRadius: '12px',
  padding: '24px',
}))

export const CounterpartyFieldsContainer = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '16px',
  '@media (max-width: 1200px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
}))

export const FieldContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
}))

export const FieldLabel = styled(Typography)(() => ({
  marginBottom: '8px',
}))

export const LabelWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
})

export const IconWrapper = styled('div')({
  cursor: 'pointer',
  height: '20px',
})

export const ProviderHeaderTitleContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
}))

export const ProviderSectionTitleNoMargin = styled(SectionTitle)(() => ({
  marginBottom: 0,
}))

export const BulkButton = styled(Button)(() => ({
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: 600,
  padding: '8px 16px',
  display: 'flex',
  gap: '8px',
}))

export const SaveButtonContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '12px',
  marginTop: '24px',
}))
export const StyledSelect = styled(Select)({
  '& .MuiOutlinedInput-root': {
    height: '48px',
    backgroundColor: colors.background.light,
    borderRadius: 8,
    overflow: 'hidden',
    '& fieldset': {
      borderColor: colors.neutral.main,
      borderRadius: 8,
    },
    '&:hover fieldset': {
      borderColor: colors.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: colors.primary.main,
    },
    '&.Mui-disabled': {
      backgroundColor: colors.neutral.disabled,
      '& .MuiSelect-select': {
        backgroundColor: 'transparent',
      },
    },
  },
  '& .MuiSelect-select': {
    fontSize: '14px',
    color: colors.text.main,
    padding: '12px 14px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  '& .MuiFormHelperText-root': {
    marginLeft: '0px',
    marginTop: '4px',
    fontSize: '12px',
    lineHeight: '16px',
  },
})

export const StyledInput = styled(InputField)({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    backgroundColor: colors.background.light,
    borderRadius: 8,
    height: '48px',
    overflow: 'hidden',
    '& fieldset': {
      borderColor: colors.neutral.main,
      borderRadius: 8,
    },
    '&:hover fieldset': {
      borderColor: colors.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: colors.primary.main,
    },
    '&.Mui-error fieldset': {
      borderColor: colors.error.main,
    },
    '&.Mui-error:hover fieldset': {
      borderColor: colors.error.main,
    },
    '&.Mui-error.Mui-focused fieldset': {
      borderColor: colors.error.main,
    },
    '&.Mui-disabled': {
      backgroundColor: colors.neutral.disabled,
      '& .MuiInputBase-input': {
        backgroundColor: 'transparent',
      },
    },
    '& .MuiInputBase-input': {
      height: '100%',
      padding: '12px 14px',
      boxSizing: 'border-box',
    },
  },
  '& .MuiInputLabel-root': {
    display: 'none',
  },
  '& .MuiFormHelperText-root': {
    marginLeft: '0px',
    marginTop: '4px',
    fontSize: '12px',
    lineHeight: '16px',
    '&.Mui-error': {
      color: colors.error.main,
    },
  },
})
