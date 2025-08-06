import styled from 'styled-components'
import TextField from '@mui/material/TextField'
import TaxesIcon from 'assets/images/svg/TaxesIcon'
import { MenuItem, Button as MuiButton, Select } from '@mui/material'
import RemoveIcon from 'assets/images/svg/RemoveIcon'
import BankIcon from 'assets/images/svg/BankIcon'

const MainContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
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

  &:hover {
    background: #f5f5f5 !important;
  }
`
const BulkButton = styled(MuiButton)`
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600 !important;
  padding: 8px 10px;
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

const ConfigurationsWrapper = styled.div`
  display: flex;
  gap: 50px;
  justify-content: space-evenly;
`

const ConfigGroup = styled.div`
  display: flex;
  gap: 20px;
`

const ConfigHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

const FormFieldsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`

const NetworkConfiguration = () => {
  return (
    <MainContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
        <HeaderCard>
          <SectionTitle>Network Configuration</SectionTitle>
          <SectionDescription>Configure your ONDC network parameters and settlement details</SectionDescription>
        </HeaderCard>
        <ActionButton variant="outlined">Add Domain</ActionButton>
      </div>
      <ConfigurationBox>
        <SettlementHeader>
          <NetworkIdentityHeader>
            <TaxesIcon />
            <NetworkIdentityTitle>Settlement Configuration</NetworkIdentityTitle>
          </NetworkIdentityHeader>
        </SettlementHeader>
        <ConfigurationsWrapper>
          <ConfigGroup>
            <DomainConfigContainer>
              <ConfigHeader>
                <div>Domain Configuration 1</div>
              </ConfigHeader>
              <ConfigTitleSection>
                <div>Title of a Configuration</div>
                <TextField fullWidth variant="outlined" placeholder="Enter title of a configuration" />
              </ConfigTitleSection>
              <FormFieldsContainer>
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
              </FormFieldsContainer>
            </DomainConfigContainer>
          </ConfigGroup>
        </ConfigurationsWrapper>
      </ConfigurationBox>
      <ConfigurationBox>
        <SettlementHeader>
          <NetworkIdentityHeader>
            <BankIcon />
            <NetworkIdentityTitle>Provider Bank Account Details</NetworkIdentityTitle>
          </NetworkIdentityHeader>
          <div style={{ display: 'flex', gap: '20px' }}>
            <ActionButton variant="outlined">Add Provider</ActionButton>
            <BulkButton variant="contained">Bulk upload</BulkButton>
          </div>
        </SettlementHeader>
        <ConfigurationsWrapper>
          <ConfigGroup>
            <DomainConfigContainer>
              <ConfigHeader>
                <div>Provider 1</div>
                <RemoveIcon />
              </ConfigHeader>
              <FormFieldsContainer>
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
              </FormFieldsContainer>
            </DomainConfigContainer>
          </ConfigGroup>
          <ConfigGroup>
            <DomainConfigContainer>
              <ConfigHeader>
                <div>Provider 1</div>
                <RemoveIcon />
              </ConfigHeader>
              <FormFieldsContainer>
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
              </FormFieldsContainer>
            </DomainConfigContainer>
          </ConfigGroup>
        </ConfigurationsWrapper>
      </ConfigurationBox>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <BulkButton variant="contained">Save & Proceed</BulkButton>
      </div>
    </MainContainer>
  )
}

export default NetworkConfiguration
