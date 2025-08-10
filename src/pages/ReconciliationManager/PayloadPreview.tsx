import { FC, useCallback } from 'react'
import { Modal } from '@mui/material'
import { Visibility, Download, Close } from '@mui/icons-material'
import { IPayloadPreviewProps } from 'pages/SettlementGenerator/types'
import {
  ModalContainer,
  Content,
  Header,
  ModalTitle,
  CloseButton,
  PayloadHeader,
  PayloadActions,
  JsonPreview,
} from 'styles/pages/SettlementGenerator.styled'
import Button from 'components/common/Button'
import { useToast } from 'context/toastContext'
import { FILE_DOWNLOAD_MESSAGES } from 'constants/toastMessages'

const PayloadPreview: FC<IPayloadPreviewProps> = ({ data, onTrigger, open, onClose }): JSX.Element => {
  const toast = useToast()
  const handleDownload = useCallback((): void => {
    if (!data) {
      return toast(FILE_DOWNLOAD_MESSAGES.ERROR)
    }

    try {
      const jsonStr = JSON.stringify(data, null, 2)
      const blob = new Blob([jsonStr], { type: 'application/json' })
      const url = URL.createObjectURL(blob)

      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = 'download.json'
      anchor.click()

      URL.revokeObjectURL(url)
      onClose()
    } catch (error) {
      toast(FILE_DOWNLOAD_MESSAGES.ERROR)
    }
  }, [data])

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer>
        <Content>
          <Header>
            <ModalTitle>Settlement Payload Preview</ModalTitle>
            <CloseButton onClick={onClose}>
              <Close />
            </CloseButton>
          </Header>

          <div style={{ padding: '24px' }}>
            <JsonPreview>{data ? JSON.stringify(data, null, 2) : 'No data available'}</JsonPreview>

            <PayloadHeader>
              <PayloadActions>
                <Button variant="outlined" startIcon={<Visibility />} onClick={onTrigger}>
                  Trigger Settlement API
                </Button>
                <Button variant="outlined" startIcon={<Download />} onClick={handleDownload} disabled={!data}>
                  Download Payload
                </Button>
              </PayloadActions>
            </PayloadHeader>
          </div>
        </Content>
      </ModalContainer>
    </Modal>
  )
}

export default PayloadPreview
