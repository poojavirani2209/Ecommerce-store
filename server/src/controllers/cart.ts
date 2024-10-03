import { addItemToCart, getItemsByCartId } from "../models/cart";
import { Item } from "../types/items";

export const addItemsToCart = async (items: Item[], userId: string) => {
  try {
    const cartId = `cart-${userId}`;
    await addItemToCart(cartId, items);
    console.log(`Items added to cart`);
    return cartId;
  } catch (error) {
    console.error(
      `Error occurred while adding items to cart for userid ${userId}.`,
      error
    );
    throw new Error(error);
  }
};

export const getAllItemsByCartId = async (cartId: string) => {
  try {
    let items: Item[] = await getItemsByCartId(cartId);
    return items;
  } catch (error) {
    console.error(`Error while getting items for cart by id ${cartId}`);
    throw new Error(error);
  }
};
