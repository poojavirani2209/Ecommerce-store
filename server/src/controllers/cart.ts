import { addItemToCart, getItemsByCartId } from "../models/cart";

export const addItemsToCart = async (items: string[], userId: string) => {
  const cartId = `cart-${userId}`;
  for (let item of items) {
    await addItemToCart(cartId, item);
  }
  console.log(`Items added to cart`);
  return cartId;
};

export const getAllItemsByCartId = async (cartId: string) => {
  try {
    let items: string[] = await getItemsByCartId(cartId);
    return items;
  } catch (err) {
    console.error(`Error while getting items for cart by id ${cartId}`);
  }
};
