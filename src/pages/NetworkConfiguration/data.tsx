import { IFormData, IProvider } from 'pages/NetworkConfiguration/type'

export const defaultProvider: IProvider = {
  providerId: '',
  ifscCode: '',
  accountNumber: '',
  bankName: '',
  providerName: '',
}

export const defaultFormData: IFormData = {
  title: '',
  role: '',
  domainCategory: '',
  buyerNpToNpTcs: 0,
  buyerNpToNpTds: 0,
  sellerNpToTcs: 0,
  sellerNpToTds: 0,
  sellerNpToProviderTcs: 0,
  sellerNpToProviderTds: 0,
  selectedType: '',
  subscriberUrl: '',
  tcs_applicability: '',
  tds_applicability: '',
  providers: [defaultProvider],
  counterparty_infos: [],
  effectiveDate1: '',
  effectiveDate2: '',
  effectiveDate3: '',
  effectiveDate4: '',
  effectiveDate5: '',
  effectiveDate6: '',
}
