import { deleteCart } from "../models/cart";
import { getDiscountByCode, updateDiscountStatus } from "../models/discount";
import { addNewOrder } from "../models/orders";
import { Discount, DiscountCodeStatus } from "../types/discount";
import { Item } from "../types/items";
import { CheckoutOrderSummary } from "../types/order";
import { getAllItemsByCartId } from "./cart";
import { v4 as uuidv4 } from "uuid";

export const checkout = async (
  cartId: string,
  userId: string,
  discountCode?: string
): Promise<CheckoutOrderSummary> => {
  try {
    let cartItems = await getAllItemsByCartId(cartId);
    if (cartItems.length == 0) {
      return {
        message:
          "No Items selected in the cart. Please select atleast one item to be able to checkout and order.",
        totalAmount: 0,
        finalAmount: 0,
        discountPercent: 0,
        discountAmount: 0,
      };
    }
    let totalAmount = getTotalAmount(cartItems);

    let { finalAmount, discountPercent, discountAmount } = await applyDiscount(
      discountCode,
      totalAmount
    );

    await saveOrderOnCheckout(userId, cartItems, discountAmount);
    await deleteCart(cartId);

    return {
      message: "Checked out successfully",
      totalAmount,
      finalAmount,
      discountPercent,
      discountAmount,
    };
  } catch (error) {
    console.error(`Error occurred while checking out`, error.message);
    throw error;
  }
};

const saveOrderOnCheckout = async (
  userId: string,
  cartItems: Item[],
  discountAmount: number
) => {
  await addNewOrder(uuidv4(), userId, cartItems, discountAmount);
};

const validateDiscountCode = async (discountCode: string): Promise<number> => {
  let discount: Discount = await getDiscountByCode(discountCode);
  if (discount) {
    await updateDiscountStatus(discount, DiscountCodeStatus.USED);
    return discount.percent;
  } else {
    return 0;
  }
};

const applyDiscount = async (discountCode: string, totalAmount: number) => {
  let discountPercent = await getDiscountPercent(discountCode);
  let discountAmount = (totalAmount * discountPercent) / 100;
  return {
    finalAmount: totalAmount - discountAmount,
    discountPercent,
    discountAmount,
  };
};

const getTotalAmount = (cartItems: Item[]) => {
  let totalAmount = 0;
  cartItems.forEach((item) => {
    totalAmount += item.price;
  });
  return totalAmount;
};

async function getDiscountPercent(discountCode: string) {
  let discountPercent = 0;
  if (discountCode) {
    discountPercent = await validateDiscountCode(discountCode);
  }
  return discountPercent;
}
