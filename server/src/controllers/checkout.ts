import { deleteCart } from "../models/cart";
import { addNewOrder } from "../models/orders";
import { Item } from "../types/items";
import { getAllItemsByCartId } from "./cart";
import { v4 as uuidv4 } from "uuid";

export const checkout = async (cartId:string,userId:string) => {
  try {
    let cartItems = await getAllItemsByCartId(cartId);
    await saveOrderOnCheckout(userId, cartItems);
    await deleteCart(cartId);
  } catch (error) {
    console.error(error.message);
  }
};

const saveOrderOnCheckout = async (userId: string, cartItems: Item[]) => {
  await addNewOrder(uuidv4(), userId, cartItems);
};