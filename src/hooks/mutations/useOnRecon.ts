import { IApiResponse } from 'interfaces/api'
import { APIRoute } from 'enums/api'
import usePost, { IParams } from 'hooks/usePost'
import { UseMutationResult } from 'react-query'
import { buildApiUrl } from 'utils/helpers'

export interface IOnReconDataItem {
  order_id: string
  recon_accord: boolean
  due_date?: string
  on_recon_data?: {
    settlement_amount: number
    commission_amount: number
    withholding_amount: number
    tds: number
    tcs: number
  }
}

export interface IOnReconPayload {
  on_recon_data: IOnReconDataItem[]
}

export interface IOnReconResponse {
  success: boolean
  message: string
  data?: Record<string, unknown>
}

const useOnRecon = (
  userId: string,
): UseMutationResult<IApiResponse<IOnReconResponse>, unknown, IParams, unknown> & {
  onReconAsync: (payload: IOnReconPayload) => Promise<IApiResponse<IOnReconResponse>>
} => {
  const mutation = usePost<IApiResponse<IOnReconResponse>>()

  const onReconAsync = (payload: IOnReconPayload): Promise<IApiResponse<IOnReconResponse>> =>
    mutation.mutateAsync({
      url: buildApiUrl(APIRoute.ON_RECON, { userId }),
      payload,
    })

  return { ...mutation, onReconAsync }
}

export default useOnRecon
