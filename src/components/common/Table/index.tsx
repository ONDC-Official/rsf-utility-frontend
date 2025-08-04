import React from 'react'
import { Table as MUITable, TableCell, TableHead, TableRow, TableBody, TableContainer, Checkbox, IconButton } from '@mui/material'
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material'
import Pagination from '@components/common/Pagination'
import { StyledTableContainer, StyledTableHead, StyledTableCell } from '@styles/components/Table.styled'
import { ITableProps } from '@interfaces/table'

function Table<T extends Record<string, unknown>>({
  columns,
  data,
  totalCount,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onSort,
  sortField,
  sortDirection,
  renderRow,
  
}: ITableProps<T>) {
  const handleSort = (columnId: string) => {
    if (onSort && columns.find(col => col.id === columnId)?.sortable) {
      onSort(columnId)
    }
  }

  const renderSortIcon = (columnId: string) => {
    if (sortField !== columnId) return null
    return sortDirection === 'asc' ? <KeyboardArrowUp /> : <KeyboardArrowDown />
  }

  return (
    <StyledTableContainer elevation={0}>
      <TableContainer>
        <MUITable>
          <StyledTableHead>
            <TableRow>
              <StyledTableCell padding="checkbox">
                <Checkbox />
              </StyledTableCell>
              {columns.map((column) => (
                <StyledTableCell 
                  key={column.id}
                  onClick={() => handleSort(column.id)}
                  style={{ 
                    cursor: column.sortable ? 'pointer' : 'default',
                    userSelect: 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {column.label}
                    {column.sortable && renderSortIcon(column.id)}
                  </div>
                </StyledTableCell>
              ))}
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {data.map((row, index) => (
              <React.Fragment key={index}>{renderRow(row, index)}</React.Fragment>
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
