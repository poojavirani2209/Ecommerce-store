import express from "express";
import * as checkoutController from "../controllers/checkout";
import { validate } from "../common/validation";
import { CheckoutSchema } from "../types/checkout";

let checkoutRouter = express.Router();

checkoutRouter.post("/", async (req, res) => {
  try {
    validate(CheckoutSchema, req.body);
    let { cartId, userId, discountCode } = req.body;
    let checkoutResponse = await checkoutController.checkout(cartId, userId,discountCode);
    res.status(200).json({ ...checkoutResponse });
  } catch (error) {
    res.status(500).json({
      error: `Error occurred while checkout.`,
      details: error.message,
    });
  }
});

export default checkoutRouter;
