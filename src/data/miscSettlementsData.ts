import { IMiscSettlement } from '@interfaces/miscSettlements'

export const miscSettlementsData: IMiscSettlement[] = [
  {
    id: '1',
    settlementReferenceNumber: 'MIS001',
    providerName: 'John Doe',
    accountNumber: '9876541465098',
    ifscCode: 'IBHD5406507',
    amount: 1500.0,
    providerAmount: 500.0,
    date: '2024-01-20',
  },
]

// Generate more data for pagination demo
export const generateMiscSettlementsData = (count: number = 0): IMiscSettlement[] => {
  const baseData = [...miscSettlementsData]
  const generatedData: IMiscSettlement[] = []

  for (let i = 0; i < count; i++) {
    const base = baseData[i % baseData.length]
    generatedData.push({
      ...base,
      id: `settlement-${i + 1}`,
      settlementReferenceNumber: `MIS${String(i + 1).padStart(3, '0')}`,
    })
  }

  return generatedData
}
