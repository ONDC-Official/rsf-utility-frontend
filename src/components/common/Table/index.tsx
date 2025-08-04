import React from 'react'
import { Table as MUITable, TableCell, TableHead, TableRow, TableBody, TableContainer, Checkbox } from '@mui/material'
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
  renderRow,
}: ITableProps<T>) {
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
                <StyledTableCell key={column.id}>{column.label}</StyledTableCell>
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
