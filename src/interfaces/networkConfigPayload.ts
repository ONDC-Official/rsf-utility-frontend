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
  np_tcs: number
  np_tds: number
  pr_tcs: number
  pr_tds: number
  msn: boolean
  provider_details?: ProviderDetail[]
  counterparty_infos?: CounterpartyInfo[]
  tcs_applicability?: string
  tds_applicability?: string
}
