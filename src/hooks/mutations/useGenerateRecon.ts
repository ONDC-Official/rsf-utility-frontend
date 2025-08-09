import { IApiResponse } from '@interfaces/api'
import { APIRoute } from 'enums/api'
import usePost, { IParams } from 'hooks/usePost'
import { UseMutationResult } from 'react-query'
import { buildApiUrl } from 'utils/helpers'

export interface IReconDataItem {
  order_id: string
  // recon_data: {
  //   settlement_amount: number
  //   commission_amount: number
  //   withholding_amount: number
  //   tds: number
  //   tcs: number
  // }
}

export interface IGenerateReconPayload {
  recon_data: IReconDataItem[]
}

export interface IGenerateReconResponse {
  data: string
}

const useGenerateRecon = (
  userId: string,
): UseMutationResult<IApiResponse<IGenerateReconResponse>, unknown, IParams, unknown> & {
  generateAsync: (payload: IGenerateReconPayload) => Promise<IApiResponse<IGenerateReconResponse>>
} => {
  const mutation = usePost<IApiResponse<IGenerateReconResponse>>()

  const generateAsync = (payload: IGenerateReconPayload): Promise<IApiResponse<IGenerateReconResponse>> =>
    mutation.mutateAsync({
      url: buildApiUrl(APIRoute.GENERATE_RECON, { userId }),
      payload,
    })

  return { ...mutation, generateAsync }
}

export default useGenerateRecon
