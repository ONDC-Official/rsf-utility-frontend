import { IOrder } from '@interfaces/order'

export const ordersData: IOrder[] = [
  {
    id: '1',
    orderId: 'ORD001',
    collectorId: 'BAP_001',
    receiverId: 'BPP_001',
    orderStatus: 'In Progress',
    totalOrderValue: 1500.0,
    bffPercent: 2.5,
    dueDate: '2024-01-20',
  },
  {
    id: '2',
    orderId: 'ORD003',
    collectorId: 'BAP_002',
    receiverId: 'BPP_001',
    orderStatus: 'In Progress',
    totalOrderValue: 1500.0,
    bffPercent: 2.5,
    dueDate: '2024-01-20',
  },
  {
    id: '3',
    orderId: 'ORD001',
    collectorId: 'BAP_001',
    receiverId: 'BPP_001',
    orderStatus: 'In Progress',
    totalOrderValue: 1500.0,
    bffPercent: 2.5,
    dueDate: '2024-01-20',
  },
  {
    id: '4',
    orderId: 'ORD003',
    collectorId: 'BAP_002',
    receiverId: 'BPP_001',
    orderStatus: 'In Progress',
    totalOrderValue: 1500.0,
    bffPercent: 2.5,
    dueDate: '2024-01-20',
  },
  {
    id: '5',
    orderId: 'ORD003',
    collectorId: 'BAP_002',
    receiverId: 'BPP_001',
    orderStatus: 'In Progress',
    totalOrderValue: 1500.0,
    bffPercent: 2.5,
    dueDate: '2024-01-20',
  },
]

// Generate more data for pagination demo
export const generateOrdersData = (count: number): IOrder[] => {
  const baseData = [...ordersData]
  const generatedData: IOrder[] = []

  for (let i = 0; i < count; i++) {
    const baseOrder = baseData[i % baseData.length]
    generatedData.push({
      ...baseOrder,
      id: `order-${i + 1}`,
      orderId: `ORD${String(i + 1).padStart(3, '0')}`,
    })
  }

  return generatedData
}
