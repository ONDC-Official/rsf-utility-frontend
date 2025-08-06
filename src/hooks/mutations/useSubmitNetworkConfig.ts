// hooks/useSubmitNetworkConfig.ts
import { useCallback } from 'react'
import { useUserContext } from 'context/userContext'
import usePost from 'hooks/usePost'
import usePatch from 'hooks/usePatch'
import { IApiResponse } from '@interfaces/api'
import { APIRoute } from 'enums/api'
import { buildApiUrl } from 'utils/helpers'

interface Provider {
  providerId: string
  ifscCode: string
  accountNumber: string
  bankName: string
}

interface FormData {
  title: string
  role: string
  domainCategory: string
  npToProviderTax: number
  type: string
  npToNpTax: number
  subscriberUrl: string
  providers: Provider[]
}

const mapToPayload = (data: FormData) => ({
  // title: data.title,
  role: data.role === 'Seller App' ? 'BPP' : 'BAP',
  subscriber_url: data.subscriberUrl,
  domain: data.domainCategory.toLowerCase().replace(/[^a-z0-9]/g, ''),
  tcs: parseFloat(`${data.npToNpTax}`),
  tds: parseFloat(`${data.npToProviderTax}`),
  msn: data.type === 'MSN',
  provider_details: data.providers.map(({ providerId, accountNumber, ifscCode, bankName }) => ({
    provider_id: providerId,
    account_number: accountNumber,
    ifsc_code: ifscCode,
    bank_name: bankName,
  })),
})

const useSubmitNetworkConfig = () => {
  const { selectedUser } = useUserContext()

  const postMutation = usePost<IApiResponse<any>>()
  const patchMutation = usePatch<IApiResponse<any>>()

  const triggerAsync = useCallback(
    async (data: FormData) => {
      const payload = mapToPayload(data)
      const isUpdate = Boolean(selectedUser?._id)
      const url = isUpdate
        ? buildApiUrl(APIRoute.UPDATE_USER, { id: selectedUser!._id })

        : buildApiUrl(APIRoute.CREATE_USER, {}) 

      const result = isUpdate
        ? await patchMutation.mutateAsync({ url, payload })
        : await postMutation.mutateAsync({ url, payload })

      return result
    },
    [selectedUser, postMutation, patchMutation],
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
