import { FC, useState, useEffect } from 'react'
import Toast from 'components/common/Toast'
import HeaderSection from 'pages/ReconciliationManager/HeaderSection'
import ReconciliationTabs from 'pages/ReconciliationManager/ReconciliationTabs'
import GenerateReconRequest from 'pages/ReconciliationManager/GenerateReconRequest'
import ReviewReconRequests from 'pages/ReconciliationManager/ReviewReconRequests'
import { generateReconciliationData } from 'data/reconciliationManagerData'
import { Container } from 'styles/pages/SettlementGenerator.styled'

const ReconciliationManager: FC = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [toast, setToast] = useState({ isVisible: false, message: '' })

  const allOrders = generateReconciliationData(256)

  const handleToastShow = (message: string): void => {
    setToast({ isVisible: true, message })
  }

  const handleToastClose = (): void => {
    setToast((prev) => ({ ...prev, isVisible: false }))
  }

  useEffect(() => {
    if (toast.isVisible) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, isVisible: false }))
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [toast.isVisible])

  return (
    <Container>
      <Toast
        isVisible={toast.isVisible}
        title="Reconciliation Generate"
        message={toast.message}
        onClose={handleToastClose}
      />

      <HeaderSection showGenerateButton={activeTab === 0} />

      <ReconciliationTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 0 && <GenerateReconRequest allOrders={allOrders} onToastShow={handleToastShow} />}

      {activeTab === 1 && <ReviewReconRequests onToastShow={handleToastShow} />}
    </Container>
  )
}

export default ReconciliationManager
