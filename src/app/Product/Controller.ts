import { NextFunction, Request, Response } from "express";
import upload from "../../middleware/multerSetup";
import { saveFile } from "../../services/saveFileServices";
import prisma from "../../utils/db";
import { getAllProducts } from "./Services";

interface bodyType {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string;
}

class Product {
  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    return await getAllProducts(req, res, next);
  }

  async post(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body: bodyType = req.body;
      // console.log(body);
      let filePath = null;
      if (body.images) {
        //use middleware multer
        upload.single("file")(req, res, async (err: any) => {
          if (err) {
            return next(err);
          }
        });
        //save the file and get FilePath
        filePath = await saveFile(req);
      }

      const payload = {
        name: body.name,
        description: body.description,
        price: body.price,
        stock: body.stock,
        images: filePath,
      };

      const data = await prisma.product.create({ data: payload });
      res.status(201).json({
        status: "success",
        data,
      });
    } catch (err) {
      console.error("Error creating product:", err);
      next(err);
    }
  }

  async show(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = req.body.product;

      res.status(200).json({
        status: "success",
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
