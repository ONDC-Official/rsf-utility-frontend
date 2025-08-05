import styled from 'styled-components'
import { Box, Typography } from '@mui/material'
import colors from '@theme/colors'
import { typography } from '@theme/typography'

export const SummaryCardContainer = styled(Box)<{ $bgColor: string }>`
  background: linear-gradient(135deg, ${({ $bgColor }) => $bgColor} 0%, rgba(255, 255, 255, 0.1) 100%);
  border-radius: 8px;
  padding: 20px;
  position: relative;
  overflow: hidden;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transform: translate(30px, -30px);
  }
`

export const SummaryCardLabel = styled(Typography)`
  font-family: ${typography.body2_medium.fontFamily};
  font-weight: ${typography.body2_medium.fontWeight};
  font-size: ${typography.body2_medium.fontSize};
  color: ${colors.background.light};
  margin-bottom: 4px;
`

export const SummaryCardValue = styled(Typography)`
  font-family: ${typography.h5_semibold.fontFamily};
  font-weight: ${typography.h5_semibold.fontWeight};
  font-size: ${typography.h5_semibold.fontSize};
  color: ${colors.background.light};
`