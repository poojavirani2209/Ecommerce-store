import express from "express";
import { connectDB } from "./database/db";
import itemRouter from "./routes/items";
import { initialize } from "./controllers/itemController";

/**
 * Create a new express server application listening on the port specified.
 */
let port = 8887;
let app = express();

app.use('/items',itemRouter);

app.listen(port, async() => {
  console.log(`Server has started and listening at port ${port}`);
  try {
    connectDB();
  } catch (error: any) {
    console.log(error);
  }
});
