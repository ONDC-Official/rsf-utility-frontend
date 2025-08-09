import { IApiResponse } from '@interfaces/api'
import useGet from 'hooks/useGet'
import { UseQueryOptions, UseQueryResult } from 'react-query'
import { buildApiUrl } from 'utils/helpers'
import { APIRoute } from 'enums/api'

export interface IReconciliationApiResponse {
  settlements: IReconciliationDataItem[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface IReconciliationDataItem {
  order_id: string
  user_id: string
  settlement_id: string
  collector_id: string
  receiver_id: string
  total_order_value: number
  commission: number
  collector_settlement: number
  tds: number
  tcs: number
  withholding_amount: number
  inter_np_settlement: number
  provider_id: string
  due_date: string
  type: string
  settlement_reference: string
  provider_settlement_reference: string
  self_settlement_reference: string
  error: string
  status: string
  provider_status: string
  self_status: string
  transaction_db_ids: string[]
}

const useGetReconciliationData = (
  userId: string,
  page: number,
  limit: number,
  counterpartyId?: string,
  configs?: UseQueryOptions<IApiResponse<IReconciliationApiResponse>>,
): UseQueryResult<IApiResponse<IReconciliationApiResponse>> => {
  const baseUrl = buildApiUrl(APIRoute.SETTLEMENT, { userId })
  let url = `${baseUrl}?status=NOT_SETTLED`

  if (counterpartyId) {
    url += `&counterparty_id=${counterpartyId}`
  }

  return useGet<IReconciliationApiResponse>(
    `reconciliation-data-${userId}-${page}-${limit}-${counterpartyId || 'all'}`,
    url,
    {
      enabled: !!userId,
      ...configs,
    },
  )
}

export default useGetReconciliationData
