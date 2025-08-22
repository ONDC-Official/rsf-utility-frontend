import { FC, useState, useEffect, useCallback } from 'react'
import Toast from 'components/common/Toast'
import HeaderSection from 'pages/ReconciliationManager/HeaderSection'
import ReconciliationTabs from 'pages/ReconciliationManager/ReconciliationTabs'
import GenerateReconRequest from 'pages/ReconciliationManager/GenerateReconRequest'
import ReviewReconRequests from 'pages/ReconciliationManager/ReviewReconRequests'
import { Container } from 'styles/pages/SettlementGenerator.styled'
import OutgoingRequestsSection from 'pages/ReconciliationManager/OutgoingRequestSection'

const ReconciliationManager: FC = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [toast, setToast] = useState({ isVisible: false, message: '' })
  const [isGenerateButtonDisabled, setIsGenerateButtonDisabled] = useState(true)
  const [generateHandler, setGenerateHandler] = useState<(() => Promise<void>) | null>(null)

  const handleToastShow = (message: string): void => {
    setToast({ isVisible: true, message })
  }

  const handleToastClose = (): void => {
    setToast((prev) => ({ ...prev, isVisible: false }))
  }

  const handleSelectionChange = useCallback(
    (count: number, canGenerate: boolean, handler: () => Promise<void>): void => {
      setIsGenerateButtonDisabled(!canGenerate)
      setGenerateHandler(() => handler)
    },
    [],
  )

  const handleGenerateClick = useCallback(async (): Promise<void> => {
    if (generateHandler) {
      await generateHandler()
    }
  }, [generateHandler])

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

      <HeaderSection
        showGenerateButton={activeTab === 0}
        isGenerateButtonDisabled={isGenerateButtonDisabled}
        onGenerateClick={handleGenerateClick}
      />

      <ReconciliationTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 0 && (
        <GenerateReconRequest onToastShow={handleToastShow} onSelectionChange={handleSelectionChange} />
      )}

      {activeTab === 1 && <OutgoingRequestsSection onToastShow={handleToastShow} />}

      {activeTab === 2 && <ReviewReconRequests onToastShow={handleToastShow} />}
    </Container>
  )
}

export default ReconciliationManager
