import React, { useState } from 'react'
import Table from 'components/common/Table'
import { useUserContext } from 'context/userContext'
import useGetSettlements from 'hooks/queries/useGetSettlements'
import { columns } from 'pages/MiscSettlements/data'
import { ISettlementItem } from '@interfaces/settlement'
import dayjs from 'dayjs'
import { SettlementType } from 'enums/settlement'
import { StyledTableBodyCell } from 'styles/components/Table.styled'

interface ISettlementsTableProps {
  onExport?: () => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SettlementsTable: React.FC<ISettlementsTableProps> = ({ onExport }) => {
  const { selectedUser } = useUserContext()
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const { data: settlements, isLoading } = useGetSettlements(page, rowsPerPage, SettlementType.MISC, {
    enabled: !!selectedUser,
  })
  const rows = settlements?.data ?? []
  const totalCount = 0

  const renderRow = (item: ISettlementItem): JSX.Element => {
    const settlement = item.request.message.settlement
    const order = settlement.orders[0] ?? {}

    const formattedDate = item.request.context.timestamp
      ? dayjs(item.request.context.timestamp).format('YYYY-MM-DD')
      : '-'

    return (
      <>
        <StyledTableBodyCell>{settlement.id || '-'}</StyledTableBodyCell>
        <StyledTableBodyCell>{order.provider?.id || '-'}</StyledTableBodyCell>
        <StyledTableBodyCell>{order.provider?.bank_details?.account_no || '-'}</StyledTableBodyCell>
        <StyledTableBodyCell>{order.provider?.bank_details?.ifsc_code || '-'}</StyledTableBodyCell>
        <StyledTableBodyCell>₹{order.self?.amount?.value || '-'}</StyledTableBodyCell>
        <StyledTableBodyCell>{order.provider?.amount?.value || '-'}</StyledTableBodyCell>
        <StyledTableBodyCell>{formattedDate}</StyledTableBodyCell>
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
