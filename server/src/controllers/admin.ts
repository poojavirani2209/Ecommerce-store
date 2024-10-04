import {
  addNewDiscountCode,
  getAllDiscountsCodes,
  getDiscountByStatus,
  updateDiscountStatus,
} from "../models/discount";
import { getAllOrders, getOrderNumber } from "../models/orders";
import { Discount, DiscountCodeStatus } from "../types/discount";
import { Item } from "../types/items";
import { OrdersSummary } from "../types/order";
import { v4 as uuidv4 } from "uuid";

export const getAdminSummary = async (): Promise<OrdersSummary> => {
  try {
    let allOrders = await getAllOrders();
    let allDiscountCodes = await getAllDiscountsCodes();

    let ordersSummary: OrdersSummary = {
      itemsPurchased: 0,
      totalItemsPurchasedAmount: 0,
      discountCodes: [],
      totalDiscountAmount: 0,
    };

    for (let order of allOrders) {
      console.log(order);
      let items: Item[] = JSON.parse(order.items);
      ordersSummary.itemsPurchased =
        ordersSummary.itemsPurchased + items.length;
      ordersSummary.totalDiscountAmount =
        ordersSummary.totalDiscountAmount + order.discountAmount;
      for (let item of items) {
        ordersSummary.totalItemsPurchasedAmount =
          ordersSummary.totalItemsPurchasedAmount + item.price;
      }
    }

    ordersSummary.discountCodes = allDiscountCodes;
    return ordersSummary;
  } catch (error: any) {
    console.error(`Error while getting summary of all orders.`, error);
    throw error;
  }
};

export const generateDiscountCode = async (
  orderToConsiderForDiscount: number
): Promise<string> => {
  try {
    let orderNumber = await getOrderNumber();
    if (shouldBeGivenDiscount(orderNumber, orderToConsiderForDiscount)) {
      const discountCode = uuidv4();
      let activeDiscount: Discount = await getDiscountByStatus(
        DiscountCodeStatus.AVAILABLE
      );

      if (activeDiscount) {
        await updateDiscountStatus(activeDiscount, DiscountCodeStatus.EXPIRED);
      }
      await addNewDiscountCode(discountCode, 10);
      return discountCode;
    }
    return null;
  } catch (error) {
    console.error(`Error occurred while generating discount code`, error);
    throw error;
  }
};

function shouldBeGivenDiscount(
  orderCount: number,
  orderToConsiderForDiscount: number
) {
  return (orderCount + 1) % orderToConsiderForDiscount === 0;
}
