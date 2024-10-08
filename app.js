import express from "express";
import dotenv from "dotenv";
import createError from "http-errors";
import initDB from "./initDB.js";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize DB
initDB();

import ProductRoute from "./Routes/Product.route.js";
app.use("/products", ProductRoute);

//404 handler and pass to error handler
app.use((req, res, next) => {
  /*
  const err = new Error('Not found');
  err.status = 404;
  next(err);
  */
  // You can use the above code if your not using the http-errors module
  next(createError(404, "Not found"));
});

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 6001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
