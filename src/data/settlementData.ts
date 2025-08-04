import { ISettlement, ISettlementSummary, ISettlementOrder } from '@interfaces/settlement'

export const settlementData: ISettlement[] = [
  {
    id: '1',
    settlementId: 'SET001',
    collectorId: 'BAP_001',
    receiverId: 'BPP_001',
    settlementStatus: 'Completed',
    totalAmount: 15000.0,
    commissionAmount: 375.0,
    netAmount: 14625.0,
    settlementDate: '2024-01-20',
    transactionCount: 45,
    settlementType: 'Daily',
    paymentMethod: 'Bank Transfer',
    remarks: 'Settlement completed successfully'
  },
  {
    id: '2',
    settlementId: 'SET002',
    collectorId: 'BAP_002',
    receiverId: 'BPP_001',
    settlementStatus: 'Pending',
    totalAmount: 8500.0,
    commissionAmount: 212.5,
    netAmount: 8287.5,
    settlementDate: '2024-01-21',
    transactionCount: 23,
    settlementType: 'Daily',
    paymentMethod: 'UPI',
    remarks: 'Awaiting bank confirmation'
  },
  {
    id: '3',
    settlementId: 'SET003',
    collectorId: 'BAP_001',
    receiverId: 'BPP_002',
    settlementStatus: 'In Progress',
    totalAmount: 22000.0,
    commissionAmount: 550.0,
    netAmount: 21450.0,
    settlementDate: '2024-01-22',
    transactionCount: 67,
    settlementType: 'Weekly',
    paymentMethod: 'Bank Transfer',
    remarks: 'Processing settlement'
  },
  {
    id: '4',
    settlementId: 'SET004',
    collectorId: 'BAP_003',
    receiverId: 'BPP_001',
    settlementStatus: 'Failed',
    totalAmount: 12000.0,
    commissionAmount: 300.0,
    netAmount: 11700.0,
    settlementDate: '2024-01-19',
    transactionCount: 34,
    settlementType: 'Daily',
    paymentMethod: 'Digital Wallet',
    remarks: 'Bank account details invalid'
  },
  {
    id: '5',
    settlementId: 'SET005',
    collectorId: 'BAP_002',
    receiverId: 'BPP_002',
    settlementStatus: 'Completed',
    totalAmount: 18500.0,
    commissionAmount: 462.5,
    netAmount: 18037.5,
    settlementDate: '2024-01-18',
    transactionCount: 52,
    settlementType: 'Daily',
    paymentMethod: 'Bank Transfer',
    remarks: 'Settlement completed successfully'
  },
  {
    id: '6',
    settlementId: 'SET006',
    collectorId: 'BAP_001',
    receiverId: 'BPP_003',
    settlementStatus: 'Pending',
    totalAmount: 9500.0,
    commissionAmount: 237.5,
    netAmount: 9262.5,
    settlementDate: '2024-01-23',
    transactionCount: 28,
    settlementType: 'On-Demand',
    paymentMethod: 'UPI',
    remarks: 'Manual settlement requested'
  },
  {
    id: '7',
    settlementId: 'SET007',
    collectorId: 'BAP_003',
    receiverId: 'BPP_002',
    settlementStatus: 'Completed',
    totalAmount: 32000.0,
    commissionAmount: 800.0,
    netAmount: 31200.0,
    settlementDate: '2024-01-17',
    transactionCount: 89,
    settlementType: 'Weekly',
    paymentMethod: 'Bank Transfer',
    remarks: 'Settlement completed successfully'
  },
  {
    id: '8',
    settlementId: 'SET008',
    collectorId: 'BAP_002',
    receiverId: 'BPP_001',
    settlementStatus: 'In Progress',
    totalAmount: 7500.0,
    commissionAmount: 187.5,
    netAmount: 7312.5,
    settlementDate: '2024-01-24',
    transactionCount: 19,
    settlementType: 'Daily',
    paymentMethod: 'Digital Wallet',
    remarks: 'Processing settlement'
  }
]

export const generateSettlementData = (count: number): ISettlement[] => {
  const baseData = [...settlementData]
  const generatedData: ISettlement[] = []

  for (let i = 0; i < count; i++) {
    const baseSettlement = baseData[i % baseData.length]
    generatedData.push({
      ...baseSettlement,
      id: `settlement-${i + 1}`,
      settlementId: `SET${String(i + 1).padStart(3, '0')}`,
    })
  }

  return generatedData
}

export const settlementSummary: ISettlementSummary = {
  totalSettlements: 156,
  totalAmount: 2450000.0,
  pendingAmount: 180000.0,
  completedAmount: 2150000.0,
  failedAmount: 120000.0,
  averageSettlementValue: 15705.13,
  successRate: 85.9
}

export const settlementOrderData: ISettlementOrder[] = [
  {
    id: '1',
    orderId: 'ORD001',
    collectorId: 'BAP_001',
    receiverId: 'BPP_001',
    totalOrderValue: 1500.00,
    interNPSettlement: 1323.00,
    commission: 150.00,
    status: 'Not Settled',
    settlementReference: '-',
    error: '70023',
    settlementInitiatedDate: '2024-01-20',
    hasError: true,
    errorCode: '70023',
    errorMessage: 'Lorem ipsum dolor sit amet, consecte'
  },
  {
    id: '2',
    orderId: 'ORD003',
    collectorId: 'BAP_002',
    receiverId: 'BPP_001',
    totalOrderValue: 1200.00,
    interNPSettlement: 882.00,
    commission: 100.00,
    status: 'Settled',
    settlementReference: 'STL2024011',
    error: '',
    settlementInitiatedDate: '2024-01-20',
    hasError: false
  },
  {
    id: '3',
    orderId: 'ORD001',
    collectorId: 'BAP_001',
    receiverId: 'BPP_001',
    totalOrderValue: 1500.00,
    interNPSettlement: 1323.00,
    commission: 150.00,
    status: 'Not Settled',
    settlementReference: '-',
    error: '70023',
    settlementInitiatedDate: '2024-01-20',
    hasError: true,
    errorCode: '70023',
    errorMessage: 'Lorem ipsum dolor sit amet, consecte'
  },
  {
    id: '4',
    orderId: 'ORD003',
    collectorId: 'BAP_002',
    receiverId: 'BPP_001',
    totalOrderValue: 1200.00,
    interNPSettlement: 882.00,
    commission: 100.00,
    status: 'Settled',
    settlementReference: 'STL20240117001',
    error: '',
    settlementInitiatedDate: '2024-01-20',
    hasError: false
  },
  {
    id: '5',
    orderId: 'ORD003',
    collectorId: 'BAP_002',
    receiverId: 'BPP_001',
    totalOrderValue: 1200.00,
    interNPSettlement: 882.00,
    commission: 100.00,
    status: 'Settled',
    settlementReference: 'STL20240117001',
    error: '',
    settlementInitiatedDate: '2024-01-20',
    hasError: false
  }
]

export const generateSettlementOrderData = (count: number): ISettlementOrder[] => {
  const baseData = [...settlementOrderData]
  const generatedData: ISettlementOrder[] = []

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