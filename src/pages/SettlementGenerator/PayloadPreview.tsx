import { FC } from 'react'
import { Visibility, Download } from '@mui/icons-material'
import {
  PayloadPreviewContainer,
  PayloadHeader,
  PayloadActions,
  JsonPreview,
  SectionTitle,
} from '@styles/pages/SettlementGenerator.styled'
import { ContainedExportButton, OutlinedFilterButton } from '@styles/components/Button.styled'

interface Props {
  data: object
}

const PayloadPreview: FC<Props> = ({ data }) => (
  <PayloadPreviewContainer>
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
  </PayloadPreviewContainer>
)

export default PayloadPreview
