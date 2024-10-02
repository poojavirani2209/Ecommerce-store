import express from "express";

/**
 * Create a new express server application listening on the port specified.
 */
let port = 8887;
let app = express();
app.listen(port, () => {
  console.log(`Server has started and listening at port ${port}`);
});
