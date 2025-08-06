import { IMiscSettlement } from 'interfaces/miscSettlement'

export const generateMiscSettlementData = (count?: number): IMiscSettlement[] => {
  if (typeof count !== 'number' || count < 0) {
    throw new Error('Invalid count provided. It must be a non-negative number.')
  }

  const data: IMiscSettlement[] = []

  for (let i = 1; i <= count; i++) {
    const settlementNumber = `MIS${i.toString().padStart(3, '0')}`
    const providerName = `Provider ${i}`
    const accountNumber = `987654146509${i}`
    const ifscCode = `IBHD540650${i}`
    const amount = 1500 + i * 100
    const providerAmount = 500 + i * 50
    const date = new Date(2024, 0, 20 + i).toISOString().split('T')[0]

    data.push({
      id: i.toString(),
      settlementReferenceNumber: settlementNumber,
      providerName,
      accountNumber,
      ifscCode,
      amount,
      providerAmount,
      date,
    })
  }

  return data
}
