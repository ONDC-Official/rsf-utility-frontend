import {
  Settings,
  Assignment,
  CheckCircle,
  Dashboard,
  Assessment,
  AccountBalance,
  Receipt,
  Description,
} from '@mui/icons-material'

export const sidebarMenuItems = [
  { text: 'Configuration', icon: Settings, path: '/configuration' },
  { text: 'Orders In Progress', icon: Assignment, path: '/orders-progress' },
  { text: 'Orders Ready', icon: CheckCircle, path: '/orders-ready' },
  { text: 'Settlement Generator', icon: Dashboard, path: '/settlement-generator' },
  { text: 'Settlement Dashboard', icon: Assessment, path: '/settlement-dashboard' },
  { text: 'Reconciliation', icon: AccountBalance, path: '/reconciliation' },
  { text: 'Misc Settlements', icon: Receipt, path: '/misc-settlements' },
  { text: 'Nil Settlement', icon: Description, path: '/nil-settlement' },
]
