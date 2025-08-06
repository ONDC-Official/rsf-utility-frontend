// @styles/layout/Navbar.styled.ts

import styled from 'styled-components'
import { Typography } from '@mui/material'
import colors from '../../theme/colors'
import { typography } from '../../theme/typography'

export const NavbarContainer = styled.div`
  width: 100%;
  height: 60px;
  border-radius: 8px;
  padding: 14px 24px;
  background: ${colors.primary.main};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const SystemTitle = styled(Typography)`
  font-family: ${typography.h5_semibold.fontFamily};
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: ${colors.primary.contrastText};
`

export const ConfigContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

export const ConfigLabel = styled.div`
  font-family: ${typography.body5_medium.fontFamily};
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  text-align: right;
  vertical-align: middle;
  color: ${colors.primary.contrastText};
`

export const StyledSelect = styled.select`
  width: 140px;
  height: 32px;
  padding: 8px 10px;
  border: 1px solid ${colors.border.main};
  border-radius: 8px;
  font-family: ${typography.body5_medium.fontFamily};
  font-size: 12px;
  background: ${colors.primary.main};
  color: ${colors.primary.contrastText};

  option {
    font-family: ${typography.body5_medium.fontFamily};
    font-size: 12px;
  }

  option:disabled {
    color: ${colors.primary.contrastText};
  }
`

export const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${colors.neutral.main};
`
