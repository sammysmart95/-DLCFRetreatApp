import express from "express";
import path from 'path'
import logger from 'morgan'
import morgan from 'morgan'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from "dotenv";

import routes from './routes'

dotenv.config();

const app = express();

app.use(
  logger("dev", {
    skip: () => app.get("env") === "test"
  })
);

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(morgan("dev"));

mongoose.connect(
  process.env.db,
  err => {
    if (err) {
      console.error(err);
      process.exit(1);
      return;
    }
    console.log("Database Connected Successfully!");
  }
);

// Routes
app.use("/", routes);

app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  res.status(err.status || 500).render("error", {
    error: err.status,
    message: err.message
  });
});

export default app;
