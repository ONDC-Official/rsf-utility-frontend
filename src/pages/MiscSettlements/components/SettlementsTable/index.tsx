import React, { useState } from 'react'
import Table from 'components/common/Table'
import { TableCell } from '@mui/material'
import { TableCellStyles } from 'enums/styles'
import { useUserContext } from 'context/userContext'
import useGetSettlements from 'hooks/queries/useGetSettlements'
import { columns } from 'pages/MiscSettlements/data'
import { SettlementType } from 'constants/enum'

const SettlementsTable: React.FC = () => {
  const { selectedUser } = useUserContext()
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const { data: settlements, isLoading } = useGetSettlements(page, rowsPerPage, SettlementType.MISC, {
    enabled: !!selectedUser,
  })
  const rows = settlements?.data ?? []
  const totalCount = settlements?.data?.total ?? 0

  const renderRow = (item: any) => (
    <>
      <TableCell sx={TableCellStyles.DEFAULT}>{item.settlement_reference}</TableCell>
      <TableCell sx={TableCellStyles.DEFAULT}>{item.provider_id}</TableCell>
      <TableCell sx={TableCellStyles.DEFAULT}>{item.receiver_id}</TableCell>
      <TableCell sx={TableCellStyles.DEFAULT}>{item.status}</TableCell>
      <TableCell sx={TableCellStyles.DEFAULT}>₹{item.total_order_value.toFixed(2)}</TableCell>
      <TableCell sx={TableCellStyles.DEFAULT}>{item.type}</TableCell>
      <TableCell sx={TableCellStyles.DEFAULT}>{item.due_date}</TableCell>
    </>
  )

  return (
    <>
      <Table
        columns={columns}
        data={rows}
        totalCount={totalCount}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={(r) => {
          setRowsPerPage(r)
          setPage(1)
        }}
        renderRow={renderRow}
        loading={isLoading}
        hideCheckboxes
      />
    </>
  )
}

export default SettlementsTable
