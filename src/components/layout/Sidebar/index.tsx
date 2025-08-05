import React from 'react'

import { useLocation, useNavigate } from 'react-router-dom'
import { IconWrapper, Logo, MenuContainer, MenuItem, SidebarContainer, StyledText } from '@styles/layout/Layout.styled'
import Configuration from '@assets/images/svg/Configuration'
import OrderInProgress from '@assets/images/svg/OrderInProgress'
import OrderReady from '@assets/images/svg/OrderReady'
import SettlementGenerator from '@assets/images/svg/SettlementGenerator'
import SettlementDashboard from '@assets/images/svg/SettlementDashboard'
import Reconciliation from '@assets/images/svg/Reconciliation'
import MiscSettlements from '@assets/images/svg/MiscSettlements'
import NilSettlement from '@assets/images/svg/NilSettlement'
import OndcLogo from '@assets/images/svg/ondcLogo'

const menuItems = [
  { text: 'Configuration', icon: <Configuration />, path: '/configuration' },
  { text: 'Orders In Progress', icon: <OrderInProgress />, path: '/orders-progress' },
  { text: 'Orders Ready', icon: <OrderReady />, path: '/orders-ready' },
  { text: 'Settlement Generator', icon: <SettlementGenerator />, path: '/settlement-generator' },
  { text: 'Settlement Dashboard', icon: <SettlementDashboard />, path: '/settlement-dashboard' },
  { text: 'Reconciliation', icon: <Reconciliation />, path: '/reconciliation' },
  { text: 'Misc Settlements', icon: <MiscSettlements />, path: '/misc-settlements' },
  { text: 'Nil Settlement', icon: <NilSettlement />, path: '/nil-settlement' },
]

const Sidebar: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavigation = (path: string) => {
    navigate(path)
  }

  return (
    <SidebarContainer>
      <OndcLogo />

      <MenuContainer>
        {menuItems.map(({ text, icon, path }) => (
          <MenuItem key={text} onClick={() => handleNavigation(path)} active={location.pathname === path}>
            <IconWrapper>{icon}</IconWrapper>
            <StyledText>{text}</StyledText>
          </MenuItem>
        ))}
      </MenuContainer>
    </SidebarContainer>
  )
}

export default Sidebar
