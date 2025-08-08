export interface IDateRange {
  startDate: Date | null
  endDate: Date | null
}

export interface IDateRangePickerButtonProps {
  onDateRangeChange?: (dateRange: IDateRange) => void
  selectedDateRange?: IDateRange
  variant?: 'outlined' | 'contained' | 'text'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}
