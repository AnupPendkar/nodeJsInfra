import express from "express";
import router from "./routes/mainRoute";
import appMiddleware from "./middlewares/appMiddleware";
import { db } from "./config";
import { users } from "./schema/schema";

const app = express();
const port = 3200;

app.use(appMiddleware);

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on port http://172.16.120.20:${port}/`);
});
