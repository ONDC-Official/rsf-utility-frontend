import { useState } from 'react'
import { TableRow, TableCell, Checkbox, TextField } from '@mui/material'
import { CalendarToday, GetApp, CloudUpload, Bolt, Link as LinkIcon } from '@mui/icons-material'
import Table from 'components/common/Table'
import { columns } from './data'
import { IMiscSettlement, IMiscSettlementForm } from 'interfaces/miscSettlement'
import { generateMiscSettlementData } from 'data/miscSettlementData'
import {
  Container,
  Header,
  HeaderLeft,
  PageTitle,
  PageSubtitle,
  BulkUploadButton,
  Wrapper,
  SettlementDetailsContent,
  CardTitle,
  FormGrid,
  AmountSection,
  AmountLabel,
  AmountInput,
  CreateSettlementButton,
  TableContainer,
  TableHeader,
  TableTitle,
  FilterContainer,
  FilterButton,
  ExportButton,
} from 'styles/pages/MiscSettlements.styled'

const MiscSettlements: React.FC = () => {
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [sortField, setSortField] = useState<string>('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const [formData, setFormData] = useState<IMiscSettlementForm>({
    providerName: '',
    accountNumber: '',
    ifscCode: '',
    amountToTransfer: 0,
  })

  const allSettlements = generateMiscSettlementData(256)
  const totalCount = allSettlements.length
  const startIndex = (page - 1) * rowsPerPage
  const currentSettlements = allSettlements.slice(startIndex, startIndex + rowsPerPage)

  const renderRow = (settlement: IMiscSettlement, index: number) => (
    <TableRow key={settlement.id}>
      <TableCell padding="checkbox">
        <Checkbox />
      </TableCell>
      <TableCell>{settlement.settlementReferenceNumber}</TableCell>
      <TableCell>{settlement.providerName}</TableCell>
      <TableCell>{settlement.accountNumber}</TableCell>
      <TableCell>{settlement.ifscCode}</TableCell>
      <TableCell>₹{settlement.amount.toFixed(2)}</TableCell>
      <TableCell>₹{settlement.providerAmount.toFixed(2)}</TableCell>
      <TableCell>{settlement.date}</TableCell>
    </TableRow>
  )

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage)
    setPage(1)
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleFormChange = (field: keyof IMiscSettlementForm, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleCreateSettlement = () => {
    // TODO: Implement settlement creation logic
    console.log('Creating settlement:', formData)
  }

  const handleBulkUpload = () => {
    // TODO: Implement bulk upload logic
    console.log('Bulk upload clicked')
  }

  const handleFilterByDate = () => {
    // TODO: Implement date filter logic
    console.log('Filter by date clicked')
  }

  const handleExport = () => {
    // TODO: Implement export logic
    console.log('Export clicked')
  }

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <PageTitle>Miscellaneous Settlements</PageTitle>
          <PageSubtitle>Create ad-hoc settlements for special cases</PageSubtitle>
        </HeaderLeft>
        <BulkUploadButton variant="contained" startIcon={<CloudUpload />} onClick={handleBulkUpload}>
          Bulk Upload
        </BulkUploadButton>
      </Header>

      <Wrapper>
        <SettlementDetailsContent>
          <CardTitle>
            <LinkIcon />
            Settlement Details
          </CardTitle>

          <AmountSection>
            <AmountLabel>Amount to Transfer to Provider</AmountLabel>
            <AmountInput
              fullWidth
              variant="outlined"
              value={formData.amountToTransfer}
              onChange={(e) => handleFormChange('amountToTransfer', parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              InputProps={{
                startAdornment: <span style={{ marginRight: '8px' }}>₹</span>,
              }}
            />
          </AmountSection>

          <FormGrid>
            <TextField
              fullWidth
              label="Provider Name"
              variant="outlined"
              value={formData.providerName}
              onChange={(e) => handleFormChange('providerName', e.target.value)}
              placeholder="Enter provider name"
            />
            <TextField
              fullWidth
              label="Bank Account Number"
              variant="outlined"
              value={formData.accountNumber}
              onChange={(e) => handleFormChange('accountNumber', e.target.value)}
              placeholder="Enter account number"
            />
            <TextField
              fullWidth
              label="IFSC Code"
              variant="outlined"
              value={formData.ifscCode}
              onChange={(e) => handleFormChange('ifscCode', e.target.value)}
              placeholder="Enter IFSC code"
            />
          </FormGrid>

          <CreateSettlementButton variant="contained" startIcon={<Bolt />} onClick={handleCreateSettlement}>
            Create a Trigger Settlement
          </CreateSettlementButton>
        </SettlementDetailsContent>
      </Wrapper>

      <TableContainer>
        <TableHeader>
          <TableTitle>Miscellaneous Settlement Details</TableTitle>
          <FilterContainer>
            <FilterButton variant="outlined" startIcon={<CalendarToday />} onClick={handleFilterByDate}>
              Filter by date
            </FilterButton>
            <ExportButton variant="contained" startIcon={<GetApp />} onClick={handleExport}>
              Export
            </ExportButton>
          </FilterContainer>
        </TableHeader>

        <Table
          columns={columns}
          data={currentSettlements}
          totalCount={totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          renderRow={renderRow}
          onSort={handleSort}
          sortField={sortField}
          sortDirection={sortDirection}
        />
      </TableContainer>
    </Container>
  )
}

export default MiscSettlements
