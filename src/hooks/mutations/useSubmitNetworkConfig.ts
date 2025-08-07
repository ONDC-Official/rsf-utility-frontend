import { useCallback } from 'react'
import { useUserContext } from 'context/userContext'
import usePost from 'hooks/usePost'
import usePatch from 'hooks/usePatch'
import { IApiResponse } from '@interfaces/api'
import { APIRoute } from 'enums/api'
import { buildApiUrl } from 'utils/helpers'
import { IFormData } from 'pages/NetworkConfiguration/type'
import { NetworkConfigPayload } from 'interfaces/networkConfigPayload'
import { IUser } from '@interfaces/user'

const mapToPayload = (data: IFormData, selectedUser: IUser | null): NetworkConfigPayload => {
  const payload: Partial<NetworkConfigPayload> = {
    tcs: parseFloat(`${data?.npToNpTax}`),
    tds: parseFloat(`${data?.npToProviderTax}`),
  }

  if (!selectedUser) {
    payload.role = data?.role === 'Seller App' ? 'BPP' : 'BAP'
    payload.msn = data?.type === 'MSN'
    payload.subscriber_url = data?.subscriberUrl
    payload.domain = data?.domainCategory.toLowerCase().replace(/[^a-z0-9]/g, '')
  }

  if (data?.providers?.length && data?.role !== 'Buyer App') {
    payload.provider_details = data.providers.map(({ providerId, accountNumber, ifscCode, bankName }) => ({
      provider_id: providerId,
      account_number: accountNumber,
      ifsc_code: ifscCode,
      bank_name: bankName,
    }))
  }

  return payload as NetworkConfigPayload
}

const useSubmitNetworkConfig = () => {
  const { selectedUser } = useUserContext()

  const postMutation = usePost<IApiResponse<any>>()
  const patchMutation = usePatch<IApiResponse<any>>()

  const triggerAsync = useCallback(
    async (data: IFormData) => {
      const payload = mapToPayload(data, selectedUser)

      const isUpdate = Boolean(selectedUser?._id)
      const url = isUpdate ? buildApiUrl(`${APIRoute.USERS}/:id`, { id: selectedUser!._id }) : APIRoute.USERS

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
