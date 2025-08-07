export interface IProvider {
  providerId: string
  ifscCode: string
  accountNumber: string
  bankName: string
}

export interface IFormData {
  title: string
  role: string
  domainCategory: string
  npToProviderTax: number
  type: string
  npToNpTax: number
  subscriberUrl: string
  providers?: IProvider[]
}
