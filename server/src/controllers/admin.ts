import { getAllOrders } from "../models/orders";
import { Item } from "../types/items";
import { OrdersSummary } from "../types/order";

export const getAdminSummary = async (): Promise<OrdersSummary> => {
  try {
    let allOrders = await getAllOrders();
    let ordersSummary: OrdersSummary = {
      itemsPurchased: 0,
      totalItemsPurchasedAmount: 0,
    };

    for (let order of allOrders) {
      let items: Item[] = JSON.parse(order.items);
      ordersSummary.itemsPurchased =
        ordersSummary.itemsPurchased + items.length;
      for (let item of items) {
        ordersSummary.totalItemsPurchasedAmount =
          ordersSummary.totalItemsPurchasedAmount + item.price;
      }
    }

    return ordersSummary;
  } catch (error: any) {
    console.error(`Error while getting summary of all orders.`, error);
    throw new Error(error);
  }
};
