export interface IOrder {
  id: string;
  orderId: string;
  collectorId: string;
  receiverId: string;
  orderStatus: 'In Progress' | 'Completed' | 'Pending';
  totalOrderValue: number;
  bffPercent: number;
  dueDate: string;
}