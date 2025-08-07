import { UseFormRegister, FieldErrors, UseFormWatch, UseFormReset, Control } from 'react-hook-form'

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

export interface IDomainConfigurationProps {
  register: UseFormRegister<IFormData>
  errors: FieldErrors<IFormData>
  role: string
  setValue: (name: keyof IFormData, value: any, options?: any) => void
  watch: UseFormWatch<IFormData>
  selectedUser: any
}

export interface IHeaderSectionProps {
  reset: UseFormReset<IFormData>
  setSelectedUser: (user: any) => void
}

export interface IProviderBankDetailsProps {
  control: Control<IFormData>
  errors: FieldErrors<IFormData>
}
