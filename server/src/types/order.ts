export interface Order {
  id: string;
  items: string;
}

export interface OrdersSummary {
  itemsPurchased: number;
  totalItemsPurchasedAmount: number;
}
