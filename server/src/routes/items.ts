import express from "express";
import * as itemController from "../controllers/itemController";

let itemRouter = express.Router();

itemRouter.get("/", async (req, res) => {
  try {
    let items = await itemController.getAll();
    res.status(200).json({ items });
  } catch (error: any) {
    res.status(500).json({
      error: `Error occurred while fetching items.`,
      details: error.message,
    });
  }
});

itemRouter.get("/:id", async (req, res) => {
  try {
    let item = await itemController.getById(req.params.id);
    res.status(200).json({ item });
  } catch (error: any) {
    res.status(500).json({
      error: `Error occurred while fetching item by id ${req.params.id}.`,
      details: error.message,
    });
  }
});

export default itemRouter;
