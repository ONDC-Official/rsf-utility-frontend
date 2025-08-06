import { FC, useEffect } from 'react'
import { TableCell, Typography } from '@mui/material'
import { CalendarToday, GetApp, Upload } from '@mui/icons-material'
import Table from 'components/common/Table'
import { generateMiscSettlementsData } from 'data/miscSettlementsData'
import { columns } from 'pages/MiscSettlements/data'
import { TableCellStyles } from 'enums/styles'
import { TypographyVariant } from 'enums/typography'
import { OutlinedFilterButton, ContainedExportButton } from 'styles/components/Button.styled'
import { IMiscSettlement } from '@interfaces/miscSettlements'
import {
  Container,
  Header,
  HeaderLeft,
  HeaderRight,
  PageTitle,
  PageSubtitle,
  Wrapper,
  TableHeader,
  TableActions,
  TableTitle,
  SectionTitle,
  SettlementDetailsContainer,
  FieldRow,
  FieldInputBox,
  Divider,
  FieldBox,
  FieldLabelBox,
  ActionButtons,
  RotatedSendIcon,
} from 'styles/pages/MiscSettlements.styled'
import InputField from 'components/common/InputField'
import { usePaginatedSelectableData } from 'hooks/usePaginatedSelectableData'
import Button from 'components/common/Button'

const MiscSettlements: FC = () => {
  const {
    currentItems,
    selectedItems,
    page,
    rowsPerPage,
    totalCount,
    handlePageChange,
    handleRowsPerPageChange,
    handleSelectAll,
    setSelectedItems,
    setPage,
  } = usePaginatedSelectableData<IMiscSettlement>(generateMiscSettlementsData(256))

  useEffect(() => {
    setSelectedItems(new Set())
    setPage(1)
  }, [setSelectedItems, setPage])

  const renderRow = (miscSettlement: IMiscSettlement) => (
    <>
      <TableCell sx={TableCellStyles.DEFAULT}>{miscSettlement.settlementReferenceNumber}</TableCell>
      <TableCell sx={TableCellStyles.DEFAULT}>{miscSettlement.providerName}</TableCell>
      <TableCell sx={TableCellStyles.DEFAULT}>{miscSettlement.accountNumber}</TableCell>
      <TableCell sx={TableCellStyles.DEFAULT}>{miscSettlement.ifscCode}</TableCell>
      <TableCell sx={TableCellStyles.DEFAULT}>₹{miscSettlement.amount.toFixed(2)}</TableCell>
      <TableCell sx={TableCellStyles.DEFAULT}>₹{miscSettlement.providerAmount.toFixed(2)}</TableCell>
      <TableCell sx={TableCellStyles.DEFAULT}>{miscSettlement.date}</TableCell>
    </>
  )

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <PageTitle variant={TypographyVariant.H3Semibold}>Miscellaneous Settlements</PageTitle>
          <PageSubtitle>Create ad-hoc settlements for special cases</PageSubtitle>
        </HeaderLeft>
        <HeaderRight>
          <ContainedExportButton variant="outlined" startIcon={<Upload />}>
            Bulk Upload
          </ContainedExportButton>
        </HeaderRight>
      </Header>

      <SettlementDetailsContainer>
        <Header>
          <HeaderLeft>
            <SectionTitle variant={TypographyVariant.H3Semibold}>Settlement Details</SectionTitle>
          </HeaderLeft>
        </Header>
        <FieldRow>
          <FieldLabelBox>
            <Typography variant={TypographyVariant.Body1Medium}>Amount to Transfer to Self</Typography>
          </FieldLabelBox>
          <FieldInputBox>
            <InputField name="selfAmount" placeholder="00.0" fullWidth />
          </FieldInputBox>
        </FieldRow>
        <Divider>OR</Divider>
        <FieldRow>
          <FieldLabelBox>
            <Typography variant={TypographyVariant.Body1Medium}>Amount to Transfer to Provider</Typography>
          </FieldLabelBox>
          <FieldInputBox>
            <InputField name="providerAmount" placeholder="00.0" fullWidth />
          </FieldInputBox>
        </FieldRow>
        <FieldRow>
          <FieldBox>
            <Typography variant={TypographyVariant.Body5Light}>Provider Name</Typography>
            <InputField name="providerName" placeholder="Enter provider name" fullWidth />
          </FieldBox>
          <FieldBox>
            <Typography variant={TypographyVariant.Body5Light}>Bank Account Number</Typography>
            <InputField name="bankAccountNumber" placeholder="Enter account number" fullWidth />
          </FieldBox>
          <FieldBox>
            <Typography variant={TypographyVariant.Body5Light}>IFSC Code</Typography>
            <InputField name="ifscCode" placeholder="Enter IFSC code" fullWidth />
          </FieldBox>
        </FieldRow>
        <ActionButtons>
          <Button variant="contained" startIcon={<RotatedSendIcon />}>
            Create a Trigger Settlement
          </Button>
        </ActionButtons>
      </SettlementDetailsContainer>

      <Wrapper>
        <TableHeader>
          <TableTitle variant={TypographyVariant.Caption1Semibold}>Miscellaneous Settlement Details</TableTitle>
          <TableActions>
            <OutlinedFilterButton variant="outlined" startIcon={<CalendarToday />}>
              Filter by date
            </OutlinedFilterButton>
            <ContainedExportButton variant="outlined" startIcon={<GetApp />}>
              Export
            </ContainedExportButton>
          </TableActions>
        </TableHeader>
        <Table
          columns={columns}
          data={currentItems}
          totalCount={totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          renderRow={renderRow}
          selectedItems={selectedItems}
          onSelectAll={handleSelectAll}
          hideCheckboxes={true}
        />
      </Wrapper>
    </Container>
  )
}

export default MiscSettlements
