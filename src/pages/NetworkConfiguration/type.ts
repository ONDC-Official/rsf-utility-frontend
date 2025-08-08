import { IUser } from 'interfaces/user'
import { FieldErrors, UseFormReset, Control } from 'react-hook-form'

export interface IProvider {
  providerId: string
  ifscCode: string
  accountNumber: string
  bankName: string
}

export interface ISelectedUser extends IUser {
  counterparty_ids: string[]
  createdAt: string
  updatedAt: string
  __v: number
}

export interface IFormData {
  role: string
  domainCategory: string
  type: string
  subscriberUrl: string
  providers?: IProvider[]
  buyerNpToNpTcs?: number
  buyerNpToNpTds?: number
  sellerNpToTcs?: number
  sellerNpToTds?: number
}

export interface IDomainConfigurationProps {
  errors: FieldErrors<IFormData>
  role: string
  type: string
  selectedUser: ISelectedUser | IUser | null
  control: Control<IFormData>
}

export interface IHeaderSectionProps {
  reset: UseFormReset<IFormData>
  setSelectedUser: (user: any) => void
  selectedUser: ISelectedUser | IUser | null
}

export interface IProviderBankDetailsProps {
  control: Control<IFormData>
  errors: FieldErrors<IFormData>
}
