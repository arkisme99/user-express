"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const multerSetup_1 = __importDefault(require("../../middleware/multerSetup"));
const saveFileServices_1 = require("../../services/saveFileServices");
const prisma = new client_1.PrismaClient();
class Product {
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page = 1, limit = 10 } = req.query;
                const skip = (page - 1) * limit;
                const data = yield prisma.product.findMany({
                    take: parseInt(String(limit)),
                    skip: skip,
                });
                const dataCount = yield prisma.product.count();
                const totalPage = Math.ceil(dataCount / limit);
                // const data = await prisma.product.findMany();
                res.status(200).json({
                    status: "success",
                    currentPage: page - 0,
                    totalPage: totalPage,
                    totalData: dataCount,
                    data,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    post(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //use middleware multer
                multerSetup_1.default.single("file")(req, res, (err) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        return next(err);
                    }
                }));
                const body = req.body;
                let filePath = null;
                if (body.images) {
                    //save the file and get FilePath
                    filePath = yield (0, saveFileServices_1.saveFile)(req);
                }
                const payload = {
                    name: body.name,
                    description: body.description,
                    price: body.price,
                    stock: body.stock,
                    images: filePath,
                };
                const data = yield prisma.product.create({ data: payload });
                res.status(201).json({
                    status: "success",
                    data,
                });
            }
            catch (err) {
                console.error("Error creating product:", err);
                next(err);
            }
        });
    }
    show(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body.product;
                res.status(200).json({
                    status: "success",
                    data,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body.product;
                const body = req.body;
                const payload = {
                    name: body.name,
                    description: body.description,
                    price: body.price,
                    stock: body.stock,
                };
                const updateData = yield prisma.product.update({
                    where: { id: id },
                    data: payload,
                });
                res.status(200).json({
                    status: "success",
                    updateData,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = Product;
