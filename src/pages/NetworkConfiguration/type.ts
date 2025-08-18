import { IUser } from '@interfaces/user'
import { FieldErrors, UseFormReset, Control } from 'react-hook-form'

export interface IProvider {
  providerId: string
  ifscCode: string
  accountNumber: string
  bankName: string
  providerName: string
}

export interface ICounterpartyInfo {
  id: string
  nickName: string
}

export interface ISelectedUser extends IUser {
  counterparty_ids: string[]
  createdAt: string
  updatedAt: string
  __v: number
}

export interface IFormData {
  _id?: string
  title: string
  role: string
  domainCategory: string
  type: string
  subscriberUrl: string
  providers?: IProvider[]
  counterparty_infos?: ICounterpartyInfo[]
  buyerNpToNpTcs?: number
  buyerNpToNpTds?: number
  sellerNpToTcs?: number
  sellerNpToTds?: number
  sellerNpToProviderTcs?: number
  sellerNpToProviderTds?: number
  tcs_applicability?: string
  tds_applicability?: string
}

export interface IDomainConfigurationProps {
  errors: FieldErrors<IFormData>
  role: string
  type: string
  isEditing: boolean
  control: Control<IFormData>
}

export interface IHeaderSectionProps {
  reset: UseFormReset<IFormData>
  setSelectedUser: (user: IUser | null) => void
  selectedUser: IUser | null
}

export interface IProviderBankDetailsProps {
  control: Control<IFormData>
  errors: FieldErrors<IFormData>
}

export interface ICounterpartyInfosProps {
  control: Control<IFormData>
  errors: FieldErrors<IFormData>
  isEditing: boolean
}
