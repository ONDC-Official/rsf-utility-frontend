/**
 * Formats a date to YYYY-MM-DD format
 * @param date - Date string, Date object, or null/undefined
 * @returns Formatted date string or '-' if invalid
 */
export const formatDate = (date: string | Date | null | undefined): string => {
  if (!date) return '-'

  try {
    const dateObj = new Date(date)
    if (isNaN(dateObj.getTime())) return '-'

    return dateObj.toISOString().split('T')[0]
  } catch {
    return '-'
  }
}

/**
 * Formats a number to 2 decimal places
 * @param value - Number, string, or null/undefined
 * @returns Formatted number string with 2 decimal places or '0.00' if invalid
 */
export const formatNumber = (value: number | string | null | undefined): string => {
  if (value === null || value === undefined || value === '') return '0.00'

  const num = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(num)) return '0.00'

  return num.toFixed(2)
}

/**
 * Formats currency with ₹ symbol and 2 decimal places
 * @param value - Number, string, or null/undefined
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number | string | null | undefined): string => {
  return `₹${formatNumber(value)}`
}
