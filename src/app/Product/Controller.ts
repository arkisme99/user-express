import { NextFunction, Request, Response } from "express";
import upload from "../../middleware/multerSetup";
import { saveFile } from "../../services/saveFileServices";
import {
  deleteDataProduct,
  detailProductById,
  getAllProducts,
  postDataProduct,
  updateDataProduct,
} from "./Services";

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
        imagees: filePath,
      };

      const data = await updateDataProduct(payload, id);

      res.status(200).json({
        message: "Success Update Product",
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  async destroy(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.body.product;
      const data = await deleteDataProduct(id);

      res.status(200).json({
        message: "Success Delete Product",
        data,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default Product;
