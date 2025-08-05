import React, { useState } from 'react'
import {
  Table as MUITable,
  TableRow,
  TableBody,
  TableContainer,
  Checkbox,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import Pagination from 'components/common/Pagination'
import { StyledTableContainer, StyledTableHead, StyledTableCell, StyledTableRow } from 'styles/components/Table.styled'
import { ITableProps } from 'interfaces/table'

const Table = <T extends Record<string, unknown>>({
  columns,
  data,
  totalCount,
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
    // Add your sorting logic here
  }

  return (
    <StyledTableContainer elevation={0}>
      <TableContainer sx={{ padding: '0 24px' }}>
        <MUITable>
          <StyledTableHead>
            <TableRow>
              {!hideCheckboxes && (
                <StyledTableCell padding="checkbox" sx={{ typography: 'body5_semibold', color: 'text.tertiary' }}>
                  <Checkbox />
                </StyledTableCell>
              )}
              {columns.map((column, index) => (
                <StyledTableCell key={column.id} sx={{ typography: 'body5_semibold', color: 'text.tertiary' }}>
                  {index === 0 ? ( // Assuming first column is Order ID
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {column.label}
                      <IconButton size="small" onClick={handleOrderIdClick} sx={{ padding: '2px' }}>
                        {orderIdSortOrder === 'asc' ? (
                          <KeyboardArrowUp fontSize="small" />
                        ) : orderIdSortOrder === 'desc' ? (
                          <KeyboardArrowDown fontSize="small" />
                        ) : (
                          <KeyboardArrowDown fontSize="small" />
                        )}
                      </IconButton>
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
                    </div>
                  ) : (
                    column.label
                  )}
                </StyledTableCell>
              ))}
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {data.map((row, index) => (
              <StyledTableRow key={index} isLast={index === data.length - 1}>
                {renderRow(row, index)}
              </StyledTableRow>
            ))}
          </TableBody>
        </MUITable>
      </TableContainer>
      <Pagination
        count={totalCount}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </StyledTableContainer>
  )
}

export default Table
