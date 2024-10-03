import express from "express";
import * as checkoutController from "../controllers/checkout";

let checkoutRouter = express.Router();

checkoutRouter.post("/", async (req, res) => {
  try {
    let { cartId, userId, discountCode } = req.body;
    let checkoutResponse = await checkoutController.checkout(cartId, userId,discountCode);
    res.status(200).json({ ...checkoutResponse });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default checkoutRouter;
