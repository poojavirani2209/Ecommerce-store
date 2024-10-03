import express from "express";
import * as adminController from "../controllers/admin";

let adminRouter = express.Router();

adminRouter.get("/summary", async (req, res) => {
  try {
    const summary = await adminController.getAdminSummary();
    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ error });
  }
});

adminRouter.post("/generate-discount", async (req, res) => {
  const { nthOrder } = req.body;
  if (!nthOrder) {
    res.status(400).json({ error: "nthOrder is required" });
  }

  try {
    const discountCode = await adminController.generateDiscountCode(
      nthOrder
    );
    if (!discountCode) {
      res.status(204).json({message:"Discount code not available for this order"});
    } else {
      res.status(200).json({ discountCode });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default adminRouter;
