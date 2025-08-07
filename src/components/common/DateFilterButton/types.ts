export interface IDateFilterButtonProps {
  onDateChange?: (date: Date | null) => void
  selectedDate?: Date | null
  label?: string
  variant?: 'outlined' | 'contained' | 'text'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}