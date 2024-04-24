import { Router } from "express";
import userController from "./Controller";
import { validateData } from "../../middleware/validationMiddleware";
import userSchema from "../../schemas/userSchemas";

const controller = new userController();
const router = Router();

router
  .route("/user")
  .get(controller.get)
  .post(validateData(userSchema), controller.post);

export default router;
