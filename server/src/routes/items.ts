import express from "express";
import * as itemController from "../controllers/itemController";

let itemRouter = express.Router();

itemRouter.get("/", async (req, res) => {
  let items = await itemController.getAll();
  res.json(items);
});


itemRouter.get("/:id", async (req, res) => {
  let item = await itemController.getById(req.params.id);
  res.json(item);
});

export default itemRouter;
