import express from "express";
import * as checkoutController from "../controllers/checkout";

let checkoutRouter = express.Router();

checkoutRouter.post("/", async (req, res) => {
  try {
    let { cartId, userId } = req.body;
    await checkoutController.checkout(cartId, userId);
    res.status(200).json({message:'checked out'});
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default checkoutRouter;