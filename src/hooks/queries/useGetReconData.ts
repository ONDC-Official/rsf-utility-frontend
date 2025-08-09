import { IApiResponse } from '@interfaces/api'
import useGet from 'hooks/useGet'
import { UseQueryOptions, UseQueryResult } from 'react-query'
import { buildApiUrl } from 'utils/helpers'
import { APIRoute } from 'enums/api'
import { ReconStatus } from 'enums/recon'

export interface IReconDataItem {
  _id: string
  user_id: string
  order_id: string
  recon_status: string
  settlement_id: string
  payment_id: string
  transaction_db_ids: string[]
  recon_breakdown: {
    amount: number
    commission: number
    withholding_amount: number
    tcs: number
    tds: number
  }
  createdAt: string
  updatedAt: string
  __v: number
}

export interface IReconQueryParams {
  page?: number
  limit?: number
  recon_status?: ReconStatus[]
  counterparty_id?: string
}

export interface IReconApiResponse {
  recons: IReconDataItem[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

const useGetReconData = (
  userId: string,
  params?: IReconQueryParams,
  configs?: UseQueryOptions<IApiResponse<IReconApiResponse>>,
): UseQueryResult<IApiResponse<IReconApiResponse>> => {
  const baseUrl = buildApiUrl(APIRoute.RECON, { userId })

  const searchParams = new URLSearchParams()

  // if (params?.page) searchParams.append('page', String(params.page))
  // if (params?.limit) searchParams.append('limit', String(params.limit))
  if (params?.counterparty_id) searchParams.append('counterparty_id', params.counterparty_id)

  if (params?.recon_status) {
    params.recon_status.forEach((status) => searchParams.append('recon_status', status))
  }

  const url = searchParams.toString() ? `${baseUrl}?${searchParams.toString()}` : baseUrl

  return useGet<IReconApiResponse>(['recon-data', userId, params], url, {
    enabled: !!userId,
    ...configs,
  })
}

export default useGetReconData
