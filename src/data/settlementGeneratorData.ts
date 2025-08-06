import { ISettlementOrder, ISettlementPayload } from 'interfaces/settlementGenerator'

export const settlementOrdersData: ISettlementOrder[] = [
  {
    id: '1',
    orderId: 'ORD001',
    collectorId: 'BAP_001',
    receiverId: 'BPP_001',
    totalOrderValue: 1500.0,
    commission: 150.0,
    interNpTax: 27.0,
    bff: 10.0,
    discounts: 50.0,
    interNpSettlement: 1350.0,
    provider: 'PROVIDER_001',
    dueDate: '2024-01-20',
  },
  {
    id: '2',
    orderId: 'ORD001',
    collectorId: 'BAP_001',
    receiverId: 'BPP_001',
    totalOrderValue: 1500.0,
    commission: 150.0,
    interNpTax: 27.0,
    bff: 10.0,
    discounts: 0.0,
    interNpSettlement: 1350.0,
    provider: 'PROVIDER_001',
    dueDate: '2024-01-20',
  },
]

export const generateSettlementOrdersData = (count: number): ISettlementOrder[] => {
  const baseData = [...settlementOrdersData]
  const generatedData: ISettlementOrder[] = []

  for (let i = 0; i < count; i++) {
    const baseOrder = baseData[i % baseData.length]
    generatedData.push({
      ...baseOrder,
      id: `settlement-order-${i + 1}`,
      orderId: `ORD${String(i + 1).padStart(3, '0')}`,
    })
  }

  return generatedData
}

export const generatePayloadData = (selectedOrders: string[], totalAmount: number): ISettlementPayload => {
  return {
    context: {
      domain: 'retail',
      action: 'on_settle',
      version: '2.0.0',
      bap_id: 'BAP_001',
      bpp_id: 'BPP_001',
      timestamp: '2025-08-01T13:32:01.352Z',
    },
    message: {
      settlement: {
        id: 'SETTLE_175405512135Z',
        orders: selectedOrders,
      },
      total_amount: totalAmount,
      settlement_date: '2025-08-27',
    },
  }
}
