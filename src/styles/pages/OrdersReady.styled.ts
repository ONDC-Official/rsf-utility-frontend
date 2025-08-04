import styled from 'styled-components'
import { Box, Typography } from '@mui/material'
import colors from '@theme/colors'
import { typography } from '@theme/typography'

export const PageContainer = styled(Box)`
  background: ${colors.background.main};
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
  font-family: ${typography.h3_semibold.fontFamily};
  font-weight: ${typography.h3_semibold.fontWeight};
  color: ${colors.text.primary};
  font-size: ${typography.h3_semibold.fontSize};
  line-height: ${typography.h3_semibold.lineHeight};
`

export const PageSubtitle = styled(Typography)`
  color: ${colors.text.secondary};
  font-family: ${typography.body1_regular.fontFamily};
  font-size: ${typography.body1_regular.fontSize};
`

export const ReceiverLabel = styled(Typography)`
  color: ${colors.text.primary};
  font-family: ${typography.body2_medium.fontFamily};
  font-weight: ${typography.body2_medium.fontWeight};
  font-size: ${typography.body2_medium.fontSize};
`

export const TableContainer = styled(Box)`
  background: ${colors.background.light};
  box-shadow: 6px 6px 54px 0px ${colors.shadow.main};
  border-radius: 8px;
  overflow: hidden;
`

export const TableHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid ${colors.border.main};
`

// export const TableHeaderLeft = styled(Box)`
//   display: flex;
//   align-items: center;
//   gap: 16px;
// `

export const TableActions = styled(Box)`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const TableTitle = styled(Typography)`
  font-family: ${typography.h6_semibold.fontFamily};
  font-weight: ${typography.h6_semibold.fontWeight};
  color: ${colors.text.primary};
  font-size: ${typography.h6_semibold.fontSize};
`