import styled from 'styled-components'
import { Box } from '@mui/material'
import colors from '@theme/colors'
import { typography } from '@theme/typography'

export const LayoutContainer = styled(Box)`
  display: flex;
  min-height: 100vh;
`

export const MainContent = styled(Box)`
  flex: 1;
  margin-left: 280px;
  margin-top: 64px;
  background: ${colors.background.main};
  min-height: calc(100vh - 64px);
  overflow-y: auto;
`

export const ContentArea = styled(Box)`
  padding: 24px;
  min-height: calc(100vh - 112px);
`

export const Footer = styled(Box)`
  background: ${colors.background.light};
  padding: 16px 24px;
  border-top: 1px solid ${colors.border.main};
  text-align: center;
  color: ${colors.text.secondary};
  font-size: ${typography.body2_regular.fontSize};
  font-family: ${typography.body2_regular.fontFamily};
`
