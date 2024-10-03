import express, { NextFunction, Request, Response } from "express";
import * as cartController from "../controllers/cart";
import { validate } from "../common/validation";
import { addItemsToCartSchema, getCartSchema } from "../types/cart";

let cartRouter = express.Router();

cartRouter.post("/add", async (req, res) => {
  try {
    validate(addItemsToCartSchema, req.body);
    const { items, userId } = req.body;

    let cartId = await cartController.addItemsToCart(items, userId);
    res.status(200).json({ cartId });
  } catch (error) {
    res.status(500).json({
      error: `Error occurred while adding item to cart.`,
      details: error.message,
    });
  }
});

cartRouter.get("/:cartId", async (req, res) => {
  try {
    validate(getCartSchema, req.params);
    const { cartId } = req.params;

    let items = await cartController.getAllItemsByCartId(cartId);
    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({
      error: `Error occurred while getting items from cart.`,
      details: error.message,
    });
  }
});
export default cartRouter;
