import { NextFunction, Request, Response } from "express";
import upload from "../../middleware/multerSetup";
import { saveFile } from "../../services/saveFileServices";
import prisma from "../../utils/db";
import { detailProductById, getAllProducts, postDataProduct } from "./Services";

interface bodyType {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string;
}

class Product {
  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { currentPage, totalPage, totalData, data } = await getAllProducts(
        req
      );
      res.status(200).json({
        message: "List data product",
        currentPage,
        totalPage,
        totalData,
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  async post(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      let filePath = null;
      if (req.body.images) {
        //use middleware multer
        upload.single("file")(req, res, async (err: any) => {
          if (err) {
            return next(err);
          }
        });
        //save first the file and get FilePath
        filePath = await saveFile(req);
      }

      const payload = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        images: filePath,
      };

      const data = await postDataProduct(payload);
      res.status(201).json({
        message: "Success Create Product",
        data,
      });
    } catch (err) {
      console.error("Error create product:", err);
      next(err);
    }
  }

  async show(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await detailProductById(req);

      res.status(200).json({
        message: "Detail Product",
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.body.product;
      const body: bodyType = req.body;
      const payload = {
        name: body.name,
        description: body.description,
        price: body.price,
        stock: body.stock,
      };

      const updateData = await prisma.product.update({
        where: { id: id },
        data: payload,
      });

      res.status(200).json({
        status: "success",
        updateData,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default Product;
