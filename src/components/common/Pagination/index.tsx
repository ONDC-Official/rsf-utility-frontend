import { FC, ChangeEvent } from 'react'
import { Pagination as MUIPagination, SelectChangeEvent } from '@mui/material'
import Select from 'components/common/Select'
import { IPaginationProps } from 'components/common/Pagination/types'
import {
  Container,
  PaginationInfo,
  Wrapper,
  PaginationShowContainer,
  PaginationShowText,
} from 'styles/components/Pagination.styled'

const Pagination: FC<IPaginationProps> = ({ count, page, rowsPerPage, onPageChange, onRowsPerPageChange }) => {
  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    onPageChange?.(value)
  }

  const handleRowsPerPageChange = (event: SelectChangeEvent<unknown>) => {
    onRowsPerPageChange?.(Number(event.target.value))
  }

  const startEntry = (page - 1) * rowsPerPage + 1
  const endEntry = Math.min(page * rowsPerPage, count)

  return (
    <Container>
      <Wrapper>
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
      </Wrapper>
    </Container>
  )
}

export default Pagination
