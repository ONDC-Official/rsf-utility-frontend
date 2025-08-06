import styled from 'styled-components'
import TextField from '@mui/material/TextField'
import { MenuItem, Button as MuiButton, Select } from '@mui/material'
import TaxesIcon from 'assets/images/svg/TaxesIcon'
import RemoveIcon from 'assets/images/svg/RemoveIcon'
import BankIcon from 'assets/images/svg/BankIcon'
import AddIcon from 'assets/images/svg/AddIcon'
import SaveIcon from 'assets/images/svg/SaveIcon'
import UploadIcon from 'assets/images/svg/UploadIcon'

const MainContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
`

const HeaderCard = styled.div`
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const SectionTitle = styled.div`
  font-family: Inter;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: #000000;
  margin: 0;
`

const SectionDescription = styled.div`
  font-family: Inter;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #757575;
  margin: 0;
`

const ConfigurationBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-radius: 20px;
  padding: 32px;
  background: #ffffff;
  box-shadow: 6px 6px 54px 0px #0000000d;
`

const NetworkIdentityHeader = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`

const SettlementHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
`

const NetworkIdentityTitle = styled.div`
  font-family: Inter;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #000000;
`

const ActionButton = styled(MuiButton)`
  height: 50px;
  border-radius: 8px;
  background: #ffffff !important;
  border: 1px solid #bfc1ca !important;
  text-transform: none;
  font-size: 14px;
  font-weight: 600 !important;
  padding: 8px 10px;
  display: flex;
  gap: 5px;

  &:hover {
    background: #f5f5f5 !important;
  }
`

const BulkButton = styled(MuiButton)`
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600 !important;
  padding: 8px 10px;
  display: flex;
  gap: 7px;
`

const DomainConfigContainer = styled.div`
  border: 1px solid #dfe0e5;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px;
  border-radius: 8px;
`

const ConfigTitleSection = styled.div`
  height: 64px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const ConfigHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
`

const SaveButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 20px;
`

const NetworkConfiguration = () => {
  return (
    <MainContainer>
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
        <div>
          <DomainConfigContainer>
            <ConfigHeader>
              <div>Domain Configuration 1</div>
            </ConfigHeader>
            <ConfigTitleSection>
              <div>Title of a Configuration</div>
              <TextField fullWidth variant="outlined" placeholder="Enter title of a configuration" />
            </ConfigTitleSection>
            <div>
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
            </div>
          </DomainConfigContainer>
        </div>
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
        <div>
          <div>
            <DomainConfigContainer>
              <ConfigHeader>
                <div>Provider 1</div>
                <RemoveIcon />
              </ConfigHeader>
              <div>
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
              </div>
            </DomainConfigContainer>
          </div>
        </div>
      </ConfigurationBox>
      <SaveButtonContainer>
        <BulkButton variant="contained">
          <SaveIcon />
          Save & Proceed
        </BulkButton>
      </SaveButtonContainer>
    </MainContainer>
  )
}

export default NetworkConfiguration
