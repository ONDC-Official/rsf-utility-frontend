export interface ProviderDetail {
  provider_id: string
  account_number: string
  ifsc_code: string
  bank_name: string
}

export interface NetworkConfigPayload {
  role: 'BPP' | 'BAP'
  subscriber_url: string
  domain: string
  tcs: number
  tds: number
  msn: boolean
  provider_details?: ProviderDetail[]
}
