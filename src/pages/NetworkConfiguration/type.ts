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
  selectedType: string
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
  // Effective date fields
  effectiveDate1?: string
  effectiveDate2?: string
  effectiveDate3?: string
  effectiveDate4?: string
  effectiveDate5?: string
  effectiveDate6?: string
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

// Calendar component types
export interface ICalendarProps {
  value?: Date | null
  onChange?: (date: Date) => void
  disabled?: boolean
}

// Field configuration types
export interface IFieldValidation {
  min?: { value: number; message: string }
  max?: { value: number; message: string }
  pattern?: { value: RegExp; message: string }
  minLength?: { value: number; message: string }
}

export interface IFieldConfig {
  name: keyof IProvider
  label: string
  type: 'input' | 'select' | 'date'
  placeholder: string
  required: boolean
  validation?: IFieldValidation
}

export interface ITaxFieldConfig {
  name: keyof IFormData
  label: string
  type: 'input' | 'select' | 'date' | 'number'
  placeholder: string
  required: boolean
  hasTooltip?: boolean
  tooltipText?: string
  validation?: IFieldValidation
  options?: Array<{ value: string; label: string }>
}

export interface ITaxSection {
  section: string
  fields: ITaxFieldConfig[]
}

// Counterparty field config
export interface ICounterpartyFieldConfig {
  name: 'id' | 'nickName'
  label: string
  disabled: boolean
}

// Generic field config for mixed field types
export interface IGenericFieldConfig {
  name: string
  label: string
  type: string
  required: boolean
  placeholder: string
  options?: Array<{ value: string; label: string }>
  validation?: IFieldValidation
  hasTooltip?: boolean
  tooltipText?: string
}
