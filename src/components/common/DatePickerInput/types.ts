export interface IDatePickerInputProps {
  label?: string
  value?: Date | null
  onChange?: (date: Date | null) => void
  size?: 'small' | 'medium'
  disabled?: boolean
  placeholder?: string
  minDate?: Date | null
  maxDate?: Date | null
}
