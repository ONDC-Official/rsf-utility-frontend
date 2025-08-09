import { FC, useCallback } from 'react'
import { Visibility, Download } from '@mui/icons-material'
import { IPayloadPreviewProps } from 'pages/SettlementGenerator/types'
import {
  PayloadPreviewContainer as Container,
  PayloadHeader,
  PayloadActions,
  JsonPreview,
  SectionTitle,
} from 'styles/pages/SettlementGenerator.styled'
import Button from 'components/common/Button'
import { useToast } from 'context/toastContext'
import { FILE_DOWNLOAD_MESSAGES } from 'constants/toastMessages'

const PayloadPreview: FC<IPayloadPreviewProps> = ({ data, onTrigger }): JSX.Element => {
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
    } catch (error) {
      toast(FILE_DOWNLOAD_MESSAGES.ERROR)
    }
  }, [data])

  return (
    <Container>
      <PayloadHeader>
        <SectionTitle>Settlement Payload Preview</SectionTitle>
        <PayloadActions>
          <Button variant="outlined" startIcon={<Visibility />} onClick={onTrigger}>
            Trigger Settlement API
          </Button>
          <Button variant="outlined" startIcon={<Download />} onClick={handleDownload} disabled={!data}>
            Download Payload
          </Button>
        </PayloadActions>
      </PayloadHeader>

      <JsonPreview>{JSON.stringify(data, null, 2)}</JsonPreview>
    </Container>
  )
}

export default PayloadPreview
