import { useCallback } from 'react'
import usePost from 'hooks/usePost'
import usePatch from 'hooks/usePatch'
import { IApiResponse } from '@interfaces/api'
import { APIRoute } from 'enums/api'
import { buildApiUrl } from 'utils/helpers'
import { IFormData } from 'pages/NetworkConfiguration/type'
import { NetworkConfigPayload } from 'interfaces/networkConfigPayload'
import { IUser } from '@interfaces/user'

// helper to safely parse numbers
const toNumber = (val: unknown) => (val !== undefined && val !== null && val !== '' ? parseFloat(`${val}`) : 0)

const mapToPayload = (data: IFormData): NetworkConfigPayload => {
  const payload: Partial<NetworkConfigPayload> = {}

  const isBuyer = data?.role === 'Buyer App'
  const isSeller = data?.role === 'Seller App'
  const isMsn = data?.type === 'MSN'

  payload.title = data.title
  payload.tcs_applicability = data.tcs_applicability || ''
  payload.tds_applicability = data.tds_applicability || ''

  // Role-based tax mapping
  if (isBuyer) {
    payload.np_tcs = toNumber(data.buyerNpToNpTcs)
    payload.np_tds = toNumber(data.buyerNpToNpTds)
  }

  if (isSeller) {
    payload.np_tcs = toNumber(data.sellerNpToTcs)
    payload.np_tds = toNumber(data.sellerNpToTds)

    if (isMsn) {
      payload.pr_tcs = toNumber(data.sellerNpToProviderTcs)
      payload.pr_tds = toNumber(data.sellerNpToProviderTds)
    }
  }

  // Common creation/update fields
  payload.role = isSeller ? 'BPP' : 'BAP'
  payload.msn = isMsn
  payload.subscriber_url = data.subscriberUrl
  payload.domain = data.domainCategory

  // Providers (only for seller)
  if (!isBuyer && data.providers?.length) {
    payload.provider_details = data.providers.map((p) => ({
      provider_id: p.providerId,
      account_number: p.accountNumber,
      ifsc_code: p.ifscCode,
      bank_name: p.bankName,
      provider_name: p.providerName,
    }))
  }

  return payload as NetworkConfigPayload
}

const useSubmitNetworkConfig = (): {
  triggerAsync: (data: IFormData) => Promise<IApiResponse<IUser>>
  isLoading: boolean
  error: unknown
  status: 'loading' | 'success' | 'idle'
} => {
  const postMutation = usePost<IApiResponse<IUser>>()
  const patchMutation = usePatch<IApiResponse<IUser>>()

  const triggerAsync = useCallback(
    async (data: IFormData): Promise<IApiResponse<IUser>> => {
      const payload = mapToPayload(data)

      const isUpdate = Boolean(data?._id)
      const url = isUpdate ? buildApiUrl(`${APIRoute.USERS}/:id`, { id: data._id! }) : APIRoute.USERS

      const result = isUpdate
        ? await patchMutation.mutateAsync({ url, payload })
        : await postMutation.mutateAsync({ url, payload })

      return result
    },
    [postMutation, patchMutation],
  )

  return {
    triggerAsync,
    isLoading: postMutation.isLoading || patchMutation.isLoading,
    error: postMutation.error || patchMutation.error,
    status:
      postMutation.status === 'loading' || patchMutation.status === 'loading'
        ? 'loading'
        : postMutation.status === 'success' || patchMutation.status === 'success'
        ? 'success'
        : 'idle',
  }
}

export default useSubmitNetworkConfig
