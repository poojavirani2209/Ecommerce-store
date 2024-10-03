export interface Order {
  id: string;
  items: string;
}

export interface OrdersSummary {
  itemsPurchased: number;
  totalItemsPurchasedAmount: number;
}

export interface CheckoutOrderSummary {
  message:string;
  totalAmount: number;
  discountPercent: number;
  discountAmount: number;
  finalAmount: number;
}
