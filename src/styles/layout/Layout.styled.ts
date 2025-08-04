import styled from 'styled-components'
import { Box } from '@mui/material'

export const LayoutContainer = styled(Box)`
  display: flex;
  min-height: 100vh;
`

export const MainContent = styled(Box)`
  flex: 1;
  margin-left: 280px;
  margin-top: 64px;
  background: #f5f5f5;
  min-height: calc(100vh - 64px);
  overflow-y: auto;
`

export const ContentArea = styled(Box)`
  padding: 24px;
  min-height: calc(100vh - 112px);
`

export const Footer = styled(Box)`
  background: #ffffff;
  padding: 16px 24px;
  border-top: 1px solid #ebebeb;
  text-align: center;
  color: #5b6578;
  font-size: 14px;
  font-family: 'Inter-Regular';
`
