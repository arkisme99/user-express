import { Router } from "express";
import userController from "./Controller";

const controller = new userController();
const router = Router();

router.route("/user").get(controller.get);

export default router;
