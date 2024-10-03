export interface Order {
  id: string;
  items: string;
  discountedAmount:number;
}

export interface OrdersSummary {
  itemsPurchased: number;
  totalItemsPurchasedAmount: number;
  discountCodes:string[];
  totalDiscountAmount:number;
}

export interface CheckoutOrderSummary {
  message:string;
  totalAmount: number;
  discountPercent: number;
  discountAmount: number;
  finalAmount: number;
}
