import { FC, ChangeEvent } from 'react'
import { Pagination as MUIPagination, SelectChangeEvent } from '@mui/material'
import Select from 'components/common/Select'
import { IPaginationProps } from 'components/common/Pagination/types'
import { ROWS_PER_PAGE_OPTIONS } from 'components/common/Pagination/data'
import { TypographyVariant } from 'enums/typography'
import {
  Container,
  PaginationInfo,
  Wrapper,
  PaginationShowContainer,
  PaginationShowText,
} from 'styles/components/Pagination.styled'

const Pagination: FC<IPaginationProps> = ({
  count = 0,
  page = 1,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePageChange = (_: ChangeEvent<unknown>, value: number) => {
    onPageChange?.(value)
  }

  const handleRowsPerPageChange = (event: SelectChangeEvent<unknown>) => {
    onRowsPerPageChange?.(Number(event.target.value))
  }

  const startEntry = count > 0 ? (page - 1) * rowsPerPage + 1 : 0
  const endEntry = Math.min(page * rowsPerPage, count)

  return (
    <Container>
      <Wrapper>
        <PaginationInfo variant={TypographyVariant.Body5Regular}>
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
          <PaginationShowText variant={TypographyVariant.Body5Regular}>Show</PaginationShowText>
          <Select value={rowsPerPage} onChange={handleRowsPerPageChange} options={ROWS_PER_PAGE_OPTIONS} size="small" />
          <PaginationShowText variant={TypographyVariant.Body5Regular}>entries</PaginationShowText>
        </PaginationShowContainer>
      </Wrapper>
    </Container>
  )
}

export default Pagination
