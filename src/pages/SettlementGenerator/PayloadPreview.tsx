import { FC } from 'react'
import { Visibility, Download } from '@mui/icons-material'
import { IPayloadPreviewProps } from 'pages/SettlementGenerator/types'
import {
  PayloadPreviewContainer as Container,
  PayloadHeader,
  PayloadActions,
  JsonPreview,
  SectionTitle,
} from 'styles/pages/SettlementGenerator.styled'
import { ContainedExportButton, OutlinedFilterButton } from 'styles/components/Button.styled'

const PayloadPreview: FC<IPayloadPreviewProps> = ({ data }) => (
  <Container>
    <PayloadHeader>
      <SectionTitle>Settlement Payload Preview</SectionTitle>
      <PayloadActions>
        <ContainedExportButton variant="contained" startIcon={<Visibility />}>
          Trigger Settlement API
        </ContainedExportButton>
        <OutlinedFilterButton variant="outlined" startIcon={<Download />}>
          Download Payload
        </OutlinedFilterButton>
      </PayloadActions>
    </PayloadHeader>

    <JsonPreview>{JSON.stringify(data, null, 2)}</JsonPreview>
  </Container>
)

export default PayloadPreview
