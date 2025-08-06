  import { IMiscSettlement } from '@interfaces/miscSettlement'
import { ITableColumn } from 'interfaces/table'
  
  export const columns: ITableColumn<IMiscSettlement>[] = [
    { id: 'settlementReferenceNumber', label: 'Settlement Reference Number', sortable: true },
    { id: 'providerName', label: 'Provider Name', sortable: false },
    { id: 'accountNumber', label: 'Account Number', sortable: false },
    { id: 'ifscCode', label: 'IFSC Code', sortable: false },
    { id: 'amount', label: 'Amount', sortable: false },
    { id: 'providerAmount', label: 'Provider Amount', sortable: false },
    { id: 'date', label: 'Date', sortable: false },
  ]
