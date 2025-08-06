import TextField from '@mui/material/TextField'
import { MenuItem, Select } from '@mui/material'
import TaxesIcon from 'assets/images/svg/TaxesIcon'
import RemoveIcon from 'assets/images/svg/RemoveIcon'
import BankIcon from 'assets/images/svg/BankIcon'
import AddIcon from 'assets/images/svg/AddIcon'
import SaveIcon from 'assets/images/svg/SaveIcon'
import UploadIcon from 'assets/images/svg/UploadIcon'
import {
  Container,
  SectionTitle,
  SectionDescription,
  HeaderSection,
  HeaderCard,
  ActionButton,
  ConfigurationBox,
  SettlementHeader,
  NetworkIdentityHeader,
  NetworkIdentityTitle,
  DomainConfigContainer,
  ConfigHeader,
  ConfigTitleSection,
  FormContainer,
  ButtonGroup,
  BulkButton,
  SaveButtonContainer,
} from 'styles/pages/NetworkConfiguration'

const NetworkConfiguration = () => (
  <Container>
    <HeaderSection>
      <HeaderCard>
        <SectionTitle>Network Configuration</SectionTitle>
        <SectionDescription>Configure your ONDC network parameters and settlement details</SectionDescription>
      </HeaderCard>
      <ActionButton variant="outlined">
        <AddIcon />
        Add Configuration
      </ActionButton>
    </HeaderSection>

    <ConfigurationBox>
      <SettlementHeader>
        <NetworkIdentityHeader>
          <TaxesIcon />
          <NetworkIdentityTitle>Settlement Configuration</NetworkIdentityTitle>
        </NetworkIdentityHeader>
      </SettlementHeader>
      <DomainConfigContainer>
        <ConfigHeader>
          <div>Domain Configuration 1</div>
        </ConfigHeader>
        <ConfigTitleSection>
          <div>Title of a Configuration</div>
          <TextField fullWidth variant="outlined" placeholder="Enter title of a configuration" />
        </ConfigTitleSection>
        <FormContainer>
          <div>Role</div>
          <Select value="Seller App">
            <MenuItem value="Seller App">Seller App</MenuItem>
          </Select>
          <div>Domain Category</div>
          <Select value="F&B (RET11)">
            <MenuItem value="F&B (RET11)">F&B (RET11)</MenuItem>
          </Select>
          <div>NP-to-Provider Tax</div>
          <TextField fullWidth variant="outlined" value="0.00" />
        </FormContainer>
        <FormContainer>
          <div>Type</div>
          <Select value="MSN">
            <MenuItem value="MSN">MSN</MenuItem>
          </Select>
          <div>NP to NP Tax (%)</div>
          <TextField fullWidth variant="outlined" value="0.00" />
          <div>Subscriber URL</div>
          <TextField fullWidth variant="outlined" />
        </FormContainer>
      </DomainConfigContainer>
    </ConfigurationBox>

    <ConfigurationBox>
      <SettlementHeader>
        <NetworkIdentityHeader>
          <BankIcon />
          <NetworkIdentityTitle>Provider Bank Account Details</NetworkIdentityTitle>
        </NetworkIdentityHeader>
        <ButtonGroup>
          <ActionButton variant="outlined">
            <AddIcon />
            Add Provider
          </ActionButton>
          <BulkButton variant="contained">
            <UploadIcon />
            Bulk upload
          </BulkButton>
        </ButtonGroup>
      </SettlementHeader>
      <DomainConfigContainer>
        <ConfigHeader>
          <div>Provider 1</div>
          <RemoveIcon />
        </ConfigHeader>
        <FormContainer>
          <div>Provider ID</div>
          <TextField fullWidth variant="outlined" placeholder="Enter provider ID" />
          <div>IFSC Code</div>
          <TextField fullWidth variant="outlined" placeholder="Enter IFSC Code" />
        </FormContainer>
        <FormContainer>
          <div>Account Number</div>
          <TextField fullWidth variant="outlined" placeholder="Enter account number" />
          <div>Bank Name</div>
          <TextField fullWidth variant="outlined" placeholder="Enter bank name" />
        </FormContainer>
      </DomainConfigContainer>
    </ConfigurationBox>

    <SaveButtonContainer>
      <BulkButton variant="contained">
        <SaveIcon />
        Save & Proceed
      </BulkButton>
    </SaveButtonContainer>
  </Container>
)

export default NetworkConfiguration
