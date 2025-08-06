import { ROUTES } from 'constants/routes.constants'
import Configuration from 'assets/images/svg/Configuration'
import OrderInProgress from 'assets/images/svg/OrderInProgress'
import OrderReady from 'assets/images/svg/OrderReady'
import SettlementGenerator from 'assets/images/svg/SettlementGenerator'
import SettlementDashboard from 'assets/images/svg/SettlementDashboard'
import Reconciliation from 'assets/images/svg/Reconciliation'
import MiscSettlements from 'assets/images/svg/MiscSettlements'
import NilSettlement from 'assets/images/svg/NilSettlement'

export const menuItems = [
  { text: 'Configuration', icon: <Configuration />, path: ROUTES.CONFIGURATION },
  { text: 'Orders In Progress', icon: <OrderInProgress />, path: ROUTES.ORDERS_IN_PROGRESS },
  { text: 'Orders Ready', icon: <OrderReady />, path: ROUTES.ORDERS_READY },
  { text: 'Settlement Generator', icon: <SettlementGenerator />, path: ROUTES.SETTLEMENT_GENERATOR },
  { text: 'Settlement Dashboard', icon: <SettlementDashboard />, path: ROUTES.SETTLEMENT_DASHBOARD },
  { text: 'Reconciliation', icon: <Reconciliation />, path: ROUTES.RECONCILIATION },
  { text: 'Misc Settlements', icon: <MiscSettlements />, path: ROUTES.MISC_SETTLEMENTS },
  { text: 'Nil Settlement', icon: <NilSettlement />, path: ROUTES.NIL_SETTLEMENT },
]
