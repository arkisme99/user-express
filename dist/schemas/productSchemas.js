"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const zod_1 = require("zod");
exports.productSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.nullable(zod_1.z.string()),
    price: zod_1.z.number().nonnegative(),
    stock: zod_1.z.number(),
});
