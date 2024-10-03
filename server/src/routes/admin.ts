import express from "express";
import * as adminController from "../controllers/admin";

let adminRouter = express.Router();

adminRouter.get('/summary', async (req, res) => {
    try {
      const summary = await adminController.getAdminSummary();
      res.status(200).json(summary);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

export default adminRouter;
