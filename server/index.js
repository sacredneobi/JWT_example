require("dotenv").config();
const app = require("./config/express");
const { Router } = require("express");

const router = Router();

require("./routers")(router);

app.use("/api", router);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server listen on port ${process.env.SERVER_PORT}`);
});
