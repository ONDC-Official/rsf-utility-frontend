import React, { useState } from 'react'
import {
  Table as MUITable,
  TableRow,
  TableBody,
  Checkbox,
  Menu,
  MenuItem,
  TableCell,
  CircularProgress,
} from '@mui/material'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import Pagination from 'components/common/Pagination'
import { ITableProps } from 'interfaces/table'
import { SortOrder } from 'components/common/Table/type'
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
  selectedItems = new Set(),
  onSelectAll,
  getItemId,
  expandable = false,
  loading = false,
}: ITableProps<T> & { loading?: boolean }) => {
  const [orderIdAnchorEl, setOrderIdAnchorEl] = useState<null | HTMLElement>(null)
  const [orderIdSortOrder, setOrderIdSortOrder] = useState<SortOrder | null>(null)

  const handleOrderIdClick = (event: React.MouseEvent<HTMLElement>) => {
    setOrderIdAnchorEl(event.currentTarget)
  }

  const handleOrderIdClose = () => {
    setOrderIdAnchorEl(null)
  }

  const handleOrderIdSort = (order: SortOrder) => {
    setOrderIdSortOrder(order)
    handleOrderIdClose()
  }

  const handleSelectAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onSelectAll && getItemId) {
      onSelectAll(event.target.checked, data)
    }
  }

  const getSelectAllCheckboxState = () => {
    if (!getItemId || data.length === 0) {
      return { checked: false, indeterminate: false }
    }

    const currentPageIds = data.map(getItemId)
    const selectedCurrentPageItems = currentPageIds.filter((id) => selectedItems.has(id))
    if (selectedCurrentPageItems.length === currentPageIds.length) {
      return { checked: true, indeterminate: false }
    } else {
      return { checked: false, indeterminate: false }
    }
  }

  const selectAllState = getSelectAllCheckboxState()

  return (
    <Container elevation={0}>
      <Wrapper>
        <MUITable stickyHeader>
          <StyledTableHead>
            <TableRow>
              {expandable && <StyledTableCell></StyledTableCell>}
              {!hideCheckboxes && (
                <TableHeaderCheckboxCell>
                  <Checkbox
                    size="small"
                    checked={selectAllState.checked}
                    indeterminate={selectAllState.indeterminate}
                    onChange={handleSelectAllChange}
                  />
                </TableHeaderCheckboxCell>
              )}
              {(columns || []).map((column, index) => (
                <StyledTableCell key={column.id}>
                  {index === (expandable ? 1 : 0) ? (
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
                        <MenuItem onClick={() => handleOrderIdSort(SortOrder.ASC)}>Sort Ascending</MenuItem>
                        <MenuItem onClick={() => handleOrderIdSort(SortOrder.DESC)}>Sort Descending</MenuItem>
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length + (!hideCheckboxes ? 1 : 0) + (expandable ? 1 : 0)} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            ) : (
              (data || []).map((row, index) => (
                <StyledTableRow key={index} isLast={index === data.length - 1}>
                  {renderRow(row, index)}
                </StyledTableRow>
              ))
            )}
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
