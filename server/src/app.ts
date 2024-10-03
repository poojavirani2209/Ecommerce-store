import express from "express";
import { connectDB } from "./database/db";
import itemRouter from "./routes/items";
import cartRouter from "./routes/cart";
import checkoutRouter from "./routes/checkout";
import adminRouter from "./routes/admin";


/**
 * Create a new express server application listening on the port specified.
 */
let port = 8887;
let app = express();

app.use(express.json());

app.use("/items", itemRouter);
app.use("/cart", cartRouter);
app.use("/checkout", checkoutRouter);
app.use("/admin", adminRouter);

app.listen(port, async () => {
  console.log(`Server has started and listening at port ${port}`);
  try {
    connectDB();
  } catch (error: any) {
    console.log(error);
  }
});
