import { IOrderReady } from '@interfaces/ordersReady'

export const ordersReadyData: IOrderReady[] = [
  {
    id: '1',
    orderId: 'ORD001',
    collectorId: 'BAP_001',
    receiverId: 'BPP_001',
    totalOrderValue: 1500.0,
    commission: 150.0,
    sellerType: 'MSN',
    dueDate: '2024-01-20',
  },
  {
    id: '2',
    orderId: 'ORD003',
    collectorId: 'BAP_002',
    receiverId: 'BPP_001',
    totalOrderValue: 1600.0,
    commission: 160.0,
    sellerType: 'ISN',
    dueDate: '2024-01-20',
  },
  {
    id: '3',
    orderId: 'ORD001',
    collectorId: 'BAP_001',
    receiverId: 'BPP_001',
    totalOrderValue: 1500.0,
    commission: 150.0,
    sellerType: 'MSN',
    dueDate: '2024-01-20',
  },
  {
    id: '4',
    orderId: 'ORD003',
    collectorId: 'BAP_002',
    receiverId: 'BPP_001',
    totalOrderValue: 1500.0,
    commission: 170.0,
    sellerType: 'ISN',
    dueDate: '2024-01-20',
  },
  {
    id: '5',
    orderId: 'ORD003',
    collectorId: 'BAP_002',
    receiverId: 'BPP_001',
    totalOrderValue: 1500.0,
    commission: 150.0,
    sellerType: 'MSN',
    dueDate: '2024-01-20',
  },
]

export const generateOrdersReadyData = (count: number): IOrderReady[] => {
  const baseData = [...ordersReadyData]
  const generatedData: IOrderReady[] = []

  for (let i = 0; i < count; i++) {
    const baseOrder = baseData[i % baseData.length]
    generatedData.push({
      ...baseOrder,
      id: `order-ready-${i + 1}`,
      orderId: `ORD${String(i + 1).padStart(3, '0')}`,
    })
  }

  return generatedData
}