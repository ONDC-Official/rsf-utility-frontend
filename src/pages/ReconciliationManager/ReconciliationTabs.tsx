import { ChangeEvent, FC } from 'react'
import { Tabs, Tab } from '@mui/material'
import { RECONCILIATION_LABELS } from 'pages/ReconciliationManager/constants'
import { IReconciliationTabsProps } from 'pages/ReconciliationManager/types'
import { Container } from 'styles/pages/ReconciliationManager.styled'

const ReconciliationTabs: FC<IReconciliationTabsProps> = ({ activeTab, onTabChange }) => {
  const handleChange = (_: ChangeEvent<unknown>, newValue: number): void => {
    onTabChange(newValue)
  }

  return (
    <Container>
      <Tabs value={activeTab} onChange={handleChange} indicatorColor="primary" textColor="primary" variant="standard">
        <Tab label={RECONCILIATION_LABELS.TAB_GENERATE} />
        <Tab label={RECONCILIATION_LABELS.TAB_REVIEW} />
      </Tabs>
    </Container>
  )
}

export default ReconciliationTabs
