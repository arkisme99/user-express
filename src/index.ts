import express from "express";
import productRoute from "./app/Product/Route";
import notFound from "./middleware/404";
import errorHandle from "./middleware/error-handle";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use("/api/v1", productRoute);

//middleware
app.use(notFound);
app.use(errorHandle);

app.listen(port, (): void => {
  console.log(`Listening on port ${port}`);
});
