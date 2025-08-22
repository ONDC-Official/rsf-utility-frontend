import { useCallback } from 'react'
import usePost from 'hooks/usePost'
import usePatch from 'hooks/usePatch'
import { IApiResponse } from 'interfaces/api'
import { APIRoute } from 'enums/api'
import { buildApiUrl } from 'utils/helpers'
import { IFormData } from 'pages/NetworkConfiguration/type'
import { NetworkConfigPayload } from 'interfaces/networkConfigPayload'
import { IUser } from 'interfaces/user'

// helper to safely parse numbers
const toNumber = (val: unknown) => (val !== undefined && val !== null && val !== '' ? parseFloat(`${val}`) : 0)

const mapToPayload = (data: IFormData): NetworkConfigPayload => {
  const payload: Partial<NetworkConfigPayload> = {}

  const isBuyer = data?.role === 'Buyer App'
  const isSeller = data?.role === 'Seller App'
  const isMsn = data?.selectedType === 'MSN'

  payload.title = data.title
  payload.tcs_applicability = data.tcs_applicability || ''
  payload.tds_applicability = data.tds_applicability || ''

  // Role-based tax mapping
  if (isBuyer) {
    payload.np_tcs_effective = toNumber(data.buyerNpToNpTcs)
    payload.np_tds_effective = toNumber(data.buyerNpToNpTds)
  }

  if (isSeller) {
    payload.np_tcs_effective = toNumber(data.sellerNpToTcs)
    payload.np_tds_effective = toNumber(data.sellerNpToTds)

    if (isMsn) {
      payload.pr_tcs_effective = toNumber(data.sellerNpToProviderTcs)
      payload.pr_tds_effective = toNumber(data.sellerNpToProviderTds)
    }
  }

  if (!data._id) {
    payload.role = isSeller ? 'BPP' : 'BAP'
    payload.msn = isMsn
    payload.subscriber_url = data.subscriberUrl
    payload.domain = data.domainCategory
  }

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

  // Counterparty infos
  if (data.counterparty_infos?.length) {
    payload.counterparty_infos = data.counterparty_infos.map((cp) => ({
      id: cp.id,
      nickName: cp.nickName,
    }))
  }

  // Helper function to validate and convert date
  const convertToISODate = (dateValue: string | undefined): string | undefined => {
    if (!dateValue || dateValue.trim() === '') {
      return undefined
    }

    let date: Date
    if (dateValue.includes('/') && dateValue.split('/').length === 3) {
      const [day, month, year] = dateValue.split('/')
      date = new Date(`${month}/${day}/${year}`)
    } else {
      date = new Date(dateValue)
    }

    const isValid = !isNaN(date.getTime())
    console.log('Date validation - input:', dateValue, 'parsed date:', date, 'isValid:', isValid)
    return isValid ? date.toISOString() : undefined
  }

  const isoDate1 = convertToISODate(data.effectiveDate1)
  if (isoDate1) {
    payload.np_tcs_with_effective_date = isoDate1
  }

  const isoDate2 = convertToISODate(data.effectiveDate2)
  if (isoDate2) {
    payload.np_tds_with_effective_date = isoDate2
  }

  const isoDate3 = convertToISODate(data.effectiveDate3)
  if (isoDate3) {
    payload.np_tcs_with_effective_date = isoDate3
  }

  const isoDate4 = convertToISODate(data.effectiveDate4)
  if (isoDate4) {
    payload.np_tds_with_effective_date = isoDate4
  }

  const isoDate5 = convertToISODate(data.effectiveDate5)
  if (isoDate5) {
    payload.pr_tcs_with_effective_date = isoDate5
  }

  const isoDate6 = convertToISODate(data.effectiveDate6)
  if (isoDate6) {
    payload.pr_tds_with_effective_date = isoDate6
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
