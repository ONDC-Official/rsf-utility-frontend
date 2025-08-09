import { IFormData, IProvider } from 'pages/NetworkConfiguration/type'

export const defaultProvider: IProvider = {
  providerId: '',
  ifscCode: '',
  accountNumber: '',
  bankName: '',
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
  type: '',
  subscriberUrl: '',
  providers: [defaultProvider],
}
