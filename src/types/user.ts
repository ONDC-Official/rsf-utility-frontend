export interface ProviderDetails {
  provider_id: string
  account_number: string
  ifsc_code: string
  bank_name: string
}

export interface IUser {
  role: string
  subscriber_url: string
  domain: string
  tcs: number
  tds: number
  msn: boolean
  provider_details: ProviderDetails[]
  _id: string
}
