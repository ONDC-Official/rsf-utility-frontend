import { useCallback, useState, type Dispatch, type SetStateAction } from 'react'

type UsePaginatedSelectableDataReturn<T> = {
  currentItems: T[]
  selectedItems: Set<string>
  totalCount: number
  page: number
  rowsPerPage: number
  handlePageChange: (newPage: number) => void
  handleRowsPerPageChange: (newRows: number) => void
  handleCheckboxChange: (id: string, checked: boolean) => void
  handleSelectAll: (checked: boolean, items: T[]) => void
  resetSelection: () => void
  setSelectedItems: Dispatch<SetStateAction<Set<string>>>
  setPage: Dispatch<SetStateAction<number>>
  setRowsPerPage: Dispatch<SetStateAction<number>>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function usePaginatedSelectableData<T extends Record<string, any>>(
  data: T[],
  getItemId?: (item: T) => string,
  defaultRowsPerPage = 10,
): UsePaginatedSelectableDataReturn<T> {
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage)
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())

  const resolveId = getItemId ?? ((item: T): string => String(item.id))

  const safeData = Array.isArray(data) ? data : []
  const totalCount = safeData.length
  const startIndex = (page - 1) * rowsPerPage
  const currentItems = safeData.slice(startIndex, startIndex + rowsPerPage)

  const handleCheckboxChange = useCallback((id: string, checked: boolean) => {
    setSelectedItems((prev) => {
      const updated = new Set(prev)
      checked ? updated.add(id) : updated.delete(id)
      return updated
    })
  }, [])

  const handleSelectAll = useCallback(
    (checked: boolean, items: T[]) => {
      setSelectedItems((prev) => {
        const updated = new Set(prev)
        items.forEach((item) => {
          const itemId = resolveId(item)
          checked ? updated.add(itemId) : updated.delete(itemId)
        })
        return updated
      })
    },
    [resolveId],
  )

  const handlePageChange = (newPage: number): void => setPage(newPage)

  const handleRowsPerPageChange = (newRows: number): void => {
    setRowsPerPage(newRows)
    setPage(1)
  }

  const resetSelection = (): void => setSelectedItems(new Set())

  return {
    currentItems,
    selectedItems,
    totalCount,
    page,
    rowsPerPage,
    handlePageChange,
    handleRowsPerPageChange,
    handleCheckboxChange,
    handleSelectAll,
    resetSelection,
    setSelectedItems,
    setPage,
    setRowsPerPage,
  }
}
