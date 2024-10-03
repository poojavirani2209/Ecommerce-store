import express from "express";
import * as adminController from "../controllers/admin";
import { GenerateDiscountSchema } from "../types/discount";
import { validate } from "../common/validation";

let adminRouter = express.Router();

adminRouter.get("/summary", async (req, res) => {
  try {
    const summary = await adminController.getAdminSummary();
    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({
      error: `Error occurred while getting order summary.`,
      details: error,
    });
  }
});

adminRouter.post("/generate-discount", async (req, res) => {
  try {
    validate(GenerateDiscountSchema, req.body);
    const { nthOrder } = req.body;
    const discountCode = await adminController.generateDiscountCode(nthOrder);
    if (!discountCode) {
      res
        .status(204)
        .json({ message: "Discount code not available for this order" });
    } else {
      res.status(200).json({ discountCode });
    }
  } catch (error) {
    res.status(500).json({
      error: `Error occurred while generating discount code.`,
      details: error.message,
    });
  }
});

export default adminRouter;
