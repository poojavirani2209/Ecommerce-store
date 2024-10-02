import express from "express";
import * as cartController from "../controllers/cart";

let cartRouter = express.Router();

cartRouter.post("/add", async (req, res) => {
  const { item, userId } = req.body; //TODO need to get current logged in user

  //TODO validate inputs
  try {
    let cartId = await cartController.addItemsToCart([item], userId);
    res.status(200).json({cartId});
  } catch (error) {
    res.status(500).json({ error });
  }
});

cartRouter.get("/:cartId", async (req, res) => {
  const { cartId } = req.params; 

  //TODO validate inputs
  try {
    let items = await cartController.getAllItemsByCartId(cartId);
    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({ error });
  }
});
export default cartRouter;
