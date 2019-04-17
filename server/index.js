import app from "./app";

const { PORT = 5000, NODE_ENV } = process.env;
app.listen(PORT, () =>
  console.log(
    `Reg DLCF Listening on port ${PORT} in ${NODE_ENV ||
      "development"} mode`
  )
);
