import express from "express";
import path from "path";
import logger from "morgan";
import morgan from "morgan";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";
import fileUpload from 'express-fileupload'

dotenv.config();

const app = express();

app.use(cors({ origin: '*' }))

app.use(
  logger("dev", {
    skip: () => app.get("env") === "test"
  })
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use('/server/public', express.static(path.join(__dirname, 'public')))

app.use(express.static(path.join(__dirname, "../client/build")));


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

app.use(fileUpload());

// Routes
app.use("/", routes);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  res.status(err.status || 500).json({
    err: err.status,
    message: err.message
  });
});

export default app;
