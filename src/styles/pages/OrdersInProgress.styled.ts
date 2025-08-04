import styled from 'styled-components'
import { Box, Typography } from '@mui/material'

export const PageContainer = styled(Box)`
  background: #f5f5f5;
  min-height: 100%;
`

export const PageHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
`

export const HeaderLeft = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const HeaderRight = styled(Box)`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const PageTitle = styled(Typography)`
  font-family: 'Inter-Bold';
  font-weight: 600;
  color: #213049;
  font-size: 32px;
  line-height: 40px;
`

export const PageSubtitle = styled(Typography)`
  color: #5b6578;
  font-family: 'Inter-Regular';
  font-size: 16px;
`

export const ReceiverLabel = styled(Typography)`
  color: #213049;
  font-family: 'Inter-Medium';
  font-weight: 500;
  font-size: 14px;
`

export const TableContainer = styled(Box)`
  background: #ffffff;
  box-shadow: 6px 6px 54px 0px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  overflow: hidden;
`

export const TableHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #ebebeb;
`

export const TableActions = styled(Box)`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const TableTitle = styled(Typography)`
  font-family: 'Inter-SemiBold';
  font-weight: 600;
  color: #213049;
  font-size: 20px;
`