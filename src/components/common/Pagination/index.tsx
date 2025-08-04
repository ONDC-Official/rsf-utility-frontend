import React from 'react'
import { Pagination as MUIPagination, SelectChangeEvent } from '@mui/material'
import Select from '@components/common/Select'
import {
  PaginationContainer,
  PaginationInfo,
  PaginationControls,
  PaginationShowContainer,
  PaginationShowText,
} from '@styles/components/Pagination.styled'

interface PaginationProps {
  count: number
  page: number
  rowsPerPage: number
  onPageChange?: (page: number) => void
  onRowsPerPageChange?: (rowsPerPage: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ count, page, rowsPerPage, onPageChange, onRowsPerPageChange }) => {
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    onPageChange?.(value)
  }

  const handleRowsPerPageChange = (event: SelectChangeEvent<unknown>) => {
    onRowsPerPageChange?.(Number(event.target.value))
  }

  const startEntry = (page - 1) * rowsPerPage + 1
  const endEntry = Math.min(page * rowsPerPage, count)

  return (
    <PaginationContainer>
      <PaginationInfo>
        Showing {startEntry} to {endEntry} of {count} entries
      </PaginationInfo>

      <PaginationControls>
        <MUIPagination
          count={Math.ceil(count / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          size="small"
          shape="rounded"
        />

        <PaginationShowContainer>
          <PaginationShowText>Show</PaginationShowText>
          <Select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            options={[
              { value: 5, label: '5' },
              { value: 10, label: '10' },
              { value: 20, label: '20' },
            ]}
          />
          <PaginationShowText>entries</PaginationShowText>
        </PaginationShowContainer>
      </PaginationControls>
    </PaginationContainer>
  )
}

export default Pagination
