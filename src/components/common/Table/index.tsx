import React, { useState } from 'react'
import { Table as MUITable, TableRow, TableBody, Checkbox, Menu, MenuItem } from '@mui/material'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import Pagination from 'components/common/Pagination'
import {
  Container,
  StyledTableHead,
  StyledTableCell,
  StyledTableRow,
  Wrapper,
  StyledIconButton,
  TableHeaderCheckboxCell,
  HeaderLabelContainer,
} from 'styles/components/Table.styled'
import { ITableProps } from 'interfaces/table'

const Table = <T extends Record<string, unknown>>({
  columns = [],
  data = [],
  totalCount = 0,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  renderRow,
  hideCheckboxes = false,
}: ITableProps<T>) => {
  const [orderIdAnchorEl, setOrderIdAnchorEl] = useState<null | HTMLElement>(null)
  const [orderIdSortOrder, setOrderIdSortOrder] = useState<'asc' | 'desc' | null>(null)

  const handleOrderIdClick = (event: React.MouseEvent<HTMLElement>) => {
    setOrderIdAnchorEl(event.currentTarget)
  }

  const handleOrderIdClose = () => {
    setOrderIdAnchorEl(null)
  }

  const handleOrderIdSort = (order: 'asc' | 'desc') => {
    setOrderIdSortOrder(order)
    handleOrderIdClose()
  }

  return (
    <Container elevation={0}>
      <Wrapper>
        <MUITable>
          <StyledTableHead>
            <TableRow>
              {!hideCheckboxes && (
                <TableHeaderCheckboxCell>
                  <Checkbox />
                </TableHeaderCheckboxCell>
              )}
              {(columns || []).map((column, index) => (
                <StyledTableCell key={column.id}>
                  {index === 0 ? (
                    <HeaderLabelContainer>
                      {column.label}
                      <StyledIconButton size="small" onClick={handleOrderIdClick}>
                        {orderIdSortOrder === 'asc' ? (
                          <KeyboardArrowUp fontSize="small" />
                        ) : (
                          <KeyboardArrowDown fontSize="small" />
                        )}
                      </StyledIconButton>
                      <Menu
                        anchorEl={orderIdAnchorEl}
                        open={Boolean(orderIdAnchorEl)}
                        onClose={handleOrderIdClose}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                      >
                        <MenuItem onClick={() => handleOrderIdSort('asc')}>Sort Ascending</MenuItem>
                        <MenuItem onClick={() => handleOrderIdSort('desc')}>Sort Descending</MenuItem>
                      </Menu>
                    </HeaderLabelContainer>
                  ) : (
                    column.label
                  )}
                </StyledTableCell>
              ))}
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {(data || []).map((row, index) => (
              <StyledTableRow key={index} isLast={index === data.length - 1}>
                {renderRow(row, index)}
              </StyledTableRow>
            ))}
          </TableBody>
        </MUITable>
      </Wrapper>
      <Pagination
        count={totalCount}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Container>
  )
}

export default Table
