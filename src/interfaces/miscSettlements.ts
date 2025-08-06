export interface IGenerateMiscSettlementPayload {
  provider: {
    id?: string
    name: string
    bank_details: {
      account_no: string
      ifsc_code: string
    }
    amount: {
      currency: string
      value: string
    }
  }
  self?: {
    amount: {
      currency: string
      value: string
    }
  }
}

export type MiscSettlementFormValues = {
  selfAmount: string
  providerId: string
  providerAmount: string
  providerName: string
  bankAccountNumber: string
  ifscCode: string
}
