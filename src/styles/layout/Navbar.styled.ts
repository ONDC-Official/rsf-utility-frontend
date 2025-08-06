// @styles/layout/Navbar.styled.ts

import styled from 'styled-components'
import { Typography } from '@mui/material'

export const NavbarContainer = styled.div`
  width: 100%;
  height: 60px;
  border-radius: 10px;
  padding: 14px 24px;
  background: #0b3352;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const SystemTitle = styled(Typography)`
  font-family: Inter;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: #ffffff;
`

export const ConfigContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

export const ConfigLabel = styled.div`
  font-family: Inter;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  text-align: right;
  vertical-align: middle;
  color: #ffffff;
`

export const StyledSelect = styled.select`
  width: 140px;
  height: 32px;
  padding: 8px 10px;
  border: 1px solid #bfbfbf;
  border-radius: 8px;
  font-family: Inter;
  font-size: 12px;
  background: #0b3352;
  color: white;

  option {
    font-family: Inter;
    font-size: 12px;
  }

  option:disabled {
    color: #ffffff;
  }
`

export const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #ccc;
`
