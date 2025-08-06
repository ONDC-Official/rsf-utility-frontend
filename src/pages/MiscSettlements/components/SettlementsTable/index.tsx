import React, { useState } from 'react'
import Table from 'components/common/Table'
import { TableCell } from '@mui/material'
import { TableCellStyles } from 'enums/styles'
import { useUserContext } from 'context/userContext'
import useGetSettlements from 'hooks/queries/useGetSettlements'
import { columns } from 'pages/MiscSettlements/data'
import { ISettlementItem } from '@interfaces/settlement'
import dayjs from 'dayjs'
import { SettlementType } from 'enums/settlement'

const SettlementsTable: React.FC = () => {
  const { selectedUser } = useUserContext()
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const { data: settlements, isLoading } = useGetSettlements(page, rowsPerPage, SettlementType.MISC, {
    enabled: !!selectedUser,
  })
  const rows = settlements?.data ?? []
  const totalCount = 0

  const renderRow = (item: ISettlementItem) => {
    const settlement = item.request.message.settlement
    const order = settlement.orders[0] ?? {}

    const formattedDate = item.request.context.timestamp
      ? dayjs(item.request.context.timestamp).format('YYYY-MM-DD')
      : '-'

    return (
      <>
        <TableCell sx={TableCellStyles.DEFAULT}>{settlement.id || '-'}</TableCell>
        <TableCell sx={TableCellStyles.DEFAULT}>{order.provider?.id || '-'}</TableCell>
        <TableCell sx={TableCellStyles.DEFAULT}>{order.provider?.bank_details?.account_no || '-'}</TableCell>
        <TableCell sx={TableCellStyles.DEFAULT}>{order.provider?.bank_details?.ifsc_code || '-'}</TableCell>
        <TableCell sx={TableCellStyles.DEFAULT}>₹{order.self?.amount?.value || '-'}</TableCell>
        <TableCell sx={TableCellStyles.DEFAULT}>{order.provider?.amount?.value || '-'}</TableCell>
        <TableCell sx={TableCellStyles.DEFAULT}>{formattedDate}</TableCell>
      </>
    )
  }

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
