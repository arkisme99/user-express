import express from "express";
import productRoute from "./app/Product/Route";
import notFound from "./middleware/404";
import errorHandle from "./middleware/error-handle";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3001;

// app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//parse application/json
app.use(bodyParser.json());

//route
app.use("/api/v1", productRoute);

//middleware
app.use(notFound);
app.use(errorHandle);

app.listen(port, (): void => {
  console.log(`Listening on port ${port}`);
});
