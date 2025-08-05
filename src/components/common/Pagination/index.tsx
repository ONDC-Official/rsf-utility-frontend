import { FC, ChangeEvent } from 'react'
import { Pagination as MUIPagination, SelectChangeEvent } from '@mui/material'
import Select from 'components/common/Select'
import { PaginationProps } from 'components/common/Pagination/types'
import {
  Container,
  PaginationInfo,
  PaginationControls,
  PaginationShowContainer,
  PaginationShowText,
} from 'styles/components/Pagination.styled'

const Pagination: FC<PaginationProps> = ({ count, page, rowsPerPage, onPageChange, onRowsPerPageChange }) => {
  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    // event is required by MUI but not used in our implementation
    void event
    onPageChange?.(value)
  }

  const handleRowsPerPageChange = (event: SelectChangeEvent<unknown>) => {
    onRowsPerPageChange?.(Number(event.target.value))
  }

  const startEntry = (page - 1) * rowsPerPage + 1
  const endEntry = Math.min(page * rowsPerPage, count)

  return (
    <Container>
      <PaginationControls>
        <PaginationInfo variant="body5_regular">
          Showing {startEntry} to {endEntry} of {count} entries
        </PaginationInfo>

        <MUIPagination
          count={Math.ceil(count / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          size="small"
          shape="rounded"
        />

        <PaginationShowContainer>
          <PaginationShowText variant="body5_regular">Show</PaginationShowText>
          <Select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            options={[
              { value: 5, label: '5' },
              { value: 10, label: '10' },
              { value: 20, label: '20' },
            ]}
            size="small"
          />
          <PaginationShowText variant="body5_regular">entries</PaginationShowText>
        </PaginationShowContainer>
      </PaginationControls>
    </Container>
  )
}

export default Pagination
