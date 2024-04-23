"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controller_1 = __importDefault(require("./Controller"));
const findProductById_1 = __importDefault(require("../../middleware/findProductById"));
const validationMiddleware_1 = require("../../middleware/validationMiddleware");
const productSchemas_1 = require("../../schemas/productSchemas");
const controller = new Controller_1.default();
const router = (0, express_1.Router)();
const FindProductId = new findProductById_1.default();
router
    .route("/product")
    .get(controller.get)
    .post((0, validationMiddleware_1.validateData)(productSchemas_1.productSchema), controller.post);
router
    .route("/product/:id")
    .get(FindProductId.handle, controller.show)
    .put([FindProductId.handle, (0, validationMiddleware_1.validateData)(productSchemas_1.productSchema)], controller.update);
exports.default = router;
