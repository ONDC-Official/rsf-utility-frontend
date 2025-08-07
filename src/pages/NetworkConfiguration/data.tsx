import { IFormData, IProvider } from './type'

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
  npToProviderTax: 0,
  type: '',
  npToNpTax: 0,
  subscriberUrl: '',
  providers: [defaultProvider],
}
