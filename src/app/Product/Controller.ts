import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();
interface bodyType {
  name: string;
  description: string;
  price: number;
  stock: number;
}

interface queryParam {
  page?: number;
  limit?: number;
}

class Product {
  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page = 1, limit = 10 }: queryParam = req.query;
      const skip = (page - 1) * limit;

      const data = await prisma.product.findMany({
        take: parseInt(String(limit)),
        skip: skip,
      });

      const dataCount = await prisma.product.count();
      const totalPage = Math.ceil(dataCount / limit);

      // const data = await prisma.product.findMany();
      res.status(200).json({
        status: "success",
        currentPage: page - 0,
        totalPage: totalPage,
        totalData: dataCount,
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  async post(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body: bodyType = req.body;
      const payload = {
        name: body.name,
        description: body.description,
        price: body.price,
        stock: body.stock,
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
