export interface ProviderDetail {
  provider_id: string
  account_number: string
  ifsc_code: string
  bank_name: string
}

export interface CounterpartyInfo {
  id: string
  nickName: string
}

export interface NetworkConfigPayload {
  title: string
  role: 'BPP' | 'BAP'
  subscriber_url: string
  domain: string
  np_tcs_effective: number
  np_tds_effective: number
  pr_tcs_effective: number
  pr_tds_effective: number
  msn: boolean
  provider_details?: ProviderDetail[]
  counterparty_infos?: CounterpartyInfo[]
  tcs_applicability?: string
  tds_applicability?: string
  np_tcs_with_effective_date?: string
  np_tds_with_effective_date?: string
  pr_tcs_with_effective_date?: string
  pr_tds_with_effective_date?: string
}
