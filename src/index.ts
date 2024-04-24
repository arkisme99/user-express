import express from "express";
import productRoute from "./app/Product/Route";
import userRoute from "./app/User/Route";
import notFound from "./middleware/404";
import errorHandle from "./middleware/error-handle";

// import cors from "cors";
import fileUpload from "express-fileupload";

const app = express();
const port = process.env.PORT || 3001;
// app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
// parse application/x-www-form-urlencoded
/* app.use(bodyParser.urlencoded({ extended: true }));
//parse application/json
app.use(bodyParser.json()); */

//route
app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);

//middleware
app.use(notFound);
app.use(errorHandle);

app.listen(port, (): void => {
  console.log(`Listening on port ${port}`);
});
