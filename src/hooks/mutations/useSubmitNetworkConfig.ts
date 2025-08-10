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
  const payload: Partial<NetworkConfigPayload> = {}

  // Determine role conditions
  const isBuyer = data?.role === 'Buyer App'
  const isSeller = data?.role === 'Seller App'
  const isMsn = data?.type === 'MSN'

  payload.title = data.title

  // Buyer Role → only NP to NP TCS / NP to NP TDS
  if (isBuyer) {
    payload.np_tcs = parseFloat(`${data?.buyerNpToNpTcs}`)
    payload.np_tds = parseFloat(`${data?.buyerNpToNpTds}`)
  }

  // Seller Role with MSN false → only NP to NP TCS / NP to NP TDS
  if (isSeller && !isMsn) {
    payload.np_tcs = parseFloat(`${data?.sellerNpToTcs}`)
    payload.np_tds = parseFloat(`${data?.sellerNpToTds}`)
  }

  // Seller Role with MSN true → NP to NP TCS / NP to NP TDS / NP to Provider TCS / NP to Provider TDS
  if (isSeller && isMsn) {
    payload.np_tcs = parseFloat(`${data?.sellerNpToTcs}`)
    payload.np_tds = parseFloat(`${data?.sellerNpToTds}`)
    payload.pr_tcs = parseFloat(`${data?.sellerNpToTcs}`)
    payload.pr_tds = parseFloat(`${data?.sellerNpToTds}`)
  }

  // Common fields for new user creation
  if (!selectedUser) {
    payload.role = isSeller ? 'BPP' : 'BAP'
    payload.msn = isMsn
    payload.subscriber_url = data?.subscriberUrl
    // payload.domain = data?.domainCategory.toLowerCase().replace(/[^a-z0-9]/g, '')
    payload.domain = data?.domainCategory
  }

  // Providers only if not Buyer
  if (data?.providers?.length && !isBuyer) {
    payload.provider_details = data.providers.map(
      ({ providerId, accountNumber, ifscCode, bankName, providerName }) => ({
        provider_id: providerId,
        account_number: accountNumber,
        ifsc_code: ifscCode,
        bank_name: bankName,
        provider_name: providerName,
      }),
    )
  }

  return payload as NetworkConfigPayload
}

const useSubmitNetworkConfig = (): {
  triggerAsync: (data: IFormData) => Promise<IApiResponse<IUser>>
  isLoading: boolean
  error: unknown
  status: 'loading' | 'success' | 'idle'
} => {
  const { selectedUser } = useUserContext()

  const postMutation = usePost<IApiResponse<IUser>>()
  const patchMutation = usePatch<IApiResponse<IUser>>()

  const triggerAsync = useCallback(
    async (data: IFormData): Promise<IApiResponse<IUser>> => {
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
