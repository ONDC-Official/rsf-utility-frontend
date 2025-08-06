import { ISettlementDashboardOrder } from 'interfaces/settlementDashboard'

export const settlementDashboardData: ISettlementDashboardOrder[] = [
  {
    id: '1',
    orderId: 'ORD001',
    collectorId: 'BAP_001',
    receiverId: 'BPP_001',
    totalOrderValue: 1500.0,
    interNpSettlement: 1323.0,
    commission: 150.0,
    interNpSettlementStatus: 'Not Settled',
    selfStatus: 'Not Settled',
    providerStatus: 'Not Settled',
  },
  {
    id: '2',
    orderId: 'ORD003',
    collectorId: 'BAP_002',
    receiverId: 'BPP_001',
    totalOrderValue: 1200.0,
    interNpSettlement: 882.0,
    commission: 100.0,
    interNpSettlementStatus: 'Settled',
    selfStatus: 'Settled',
    providerStatus: 'Settled',
  },
]

export const generateSettlementDashboardData = (count: number): ISettlementDashboardOrder[] => {
  const baseData = [...settlementDashboardData]
  const generatedData: ISettlementDashboardOrder[] = []

  for (let i = 0; i < count; i++) {
    const baseOrder = baseData[i % baseData.length]

    generatedData.push({
      ...baseOrder,
      id: `dashboard-order-${i + 1}`,
      orderId: `ORD${String(i + 1).padStart(3, '0')}`,
    })
  }

  return generatedData
}
