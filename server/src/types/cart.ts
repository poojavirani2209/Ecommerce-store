import Joi from "joi";
import { Item } from "./items";

export interface Cart {
  id: string;
  items: string;
}

interface AddItemsToCartRequestBody {
  items: Item[];
  userId: string;
}

interface GetCartRequestParams {
  cartId: string;
}

// Validation schemas
export const addItemsToCartSchema = Joi.object<AddItemsToCartRequestBody>({
  items: Joi.array()
    .items(
      Joi.object<Item>({
        id: Joi.string().required(),
        name: Joi.string().required(),
        price: Joi.number().positive().required(),
        category: Joi.string().required(),
      })
    )
    .min(1)
    .required(),
  userId: Joi.string().required(),
});

export const getCartSchema = Joi.object<GetCartRequestParams>({
  cartId: Joi.string().required(),
});
