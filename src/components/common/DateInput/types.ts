export interface IDateInputProps {
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  name?: string
  inputRef?: any
  error?: boolean
  helperText?: string
  placeholder?: string
  disabled?: boolean
}
