import { RefetchOptions, RefetchQueryFilters } from 'react-query'
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
  np_tcs: number
  np_tds: number
  pr_tcs: number
  pr_tds: number
  msn: boolean
  provider_details: ProviderDetails[]
  _id: string
}

export interface IUserContext {
  users: IUser[] | undefined
  selectedUser: IUser | null
  setSelectedUser: (user: IUser | null) => void
  isLoading: boolean
  refetch: (options?: RefetchOptions & RefetchQueryFilters) => Promise<any>
}
