import { addNewDiscountCode } from "../models/discount";
import { getAllOrders, getOrderNumber } from "../models/orders";
import { Item } from "../types/items";
import { OrdersSummary } from "../types/order";
import { v4 as uuidv4 } from "uuid";

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

export const generateDiscountCode = async (
  orderToConsiderForDiscount: number
): Promise<string> => {
  let orderNumber = await getOrderNumber();
  if (shouldBeGivenDiscount(orderNumber, orderToConsiderForDiscount)) {
    const discountCode = uuidv4();
    await addNewDiscountCode(discountCode, 10);
    return discountCode;
  }
  return null;
};

function shouldBeGivenDiscount(
  orderCount: number,
  orderToConsiderForDiscount: number
) {
  return (orderCount + 1) % orderToConsiderForDiscount === 0;
}
