import { addItemToCart, getAllCartDetails, getItemsByCartId } from "../models/cart";
import { Item } from "../types/items";

export const addItemsToCart = async (items: Item[], userId: string) => {
  const cartId = `cart-${userId}`;
  await addItemToCart(cartId, items);
  await getAllCartDetails();
  console.log(`Items added to cart`);
  return cartId;
};

export const getAllItemsByCartId = async (cartId: string) => {
  try {
    let items: Item[] = await getItemsByCartId(cartId);
    return items;
  } catch (err) {
    console.error(`Error while getting items for cart by id ${cartId}`);
  }
};
