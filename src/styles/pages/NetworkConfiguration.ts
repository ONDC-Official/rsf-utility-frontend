import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'
import colors from '@theme/colors'

export const 
Container = styled('div')(() => ({
  width: '100%',
  marginTop: '30px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
}))

export const HeaderSection = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}))

export const HeaderCard = styled('div')(() => ({
  borderRadius: '12px',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
}))

export const SectionTitle = styled('div')(() => ({
  fontFamily: 'Inter',
  fontWeight: 700,
  fontSize: '32px',
  lineHeight: '40px',
  color: colors.background.dark,
  margin: 0,
}))

export const SectionDescription = styled('div')(() => ({
  fontFamily: 'Inter',
  fontWeight: 400,
  fontSize: '18px',
  lineHeight: '24px',
  color: '#757575',
  margin: 0,
}))

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
  color: colors.background.dark,
}))

export const ActionButton = styled(Button)(() => ({
  height: '50px',
  borderRadius: '8px',
  background: colors.text.light,
  border: '1px solid ${colors.border.main} !important',
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: 600,
  padding: '8px 10px',
  display: 'flex',
  gap: '5px',
  '&:hover': {
    background: '#f5f5f5 !important',
  },
}))

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
  gap: '24px',
  padding: '20px',
  borderRadius: '8px',
}))

export const ConfigTitleSection = styled('div')(() => ({
  height: '64px',
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
}))

export const FormContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
}))

export const ConfigHeader = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
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
