import { Router } from "express";
import productController from "./Controller";
import findProductById from "../../middleware/findProductById";

const controller = new productController();
const router = Router();

const FindProductId = new findProductById();

router.route("/product").get(controller.get).post(controller.post);
router
  .route("/product/:id")
  .get(FindProductId.handle, controller.show)
  .put(FindProductId.handle, controller.update);

export default router;
