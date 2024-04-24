import { Router } from "express";
import productController from "./Controller";
import findProductById from "../../middleware/product/findProductById";
import { validateData } from "../../middleware/validationMiddleware";
import { productSchema } from "../../schemas/productSchemas";

const controller = new productController();
const router = Router();

const FindProductId = new findProductById();

router
  .route("/product")
  .get(controller.get)
  .post(validateData(productSchema), controller.post);
router
  .route("/product/:id")
  .get(FindProductId.handle, controller.show)
  .put([FindProductId.handle, validateData(productSchema)], controller.update)
  .delete(FindProductId.handle, controller.destroy);

export default router;
