import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();
class findProductById {
  async handle(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: id },
    });

    if (!product) {
      res.status(404).json({
        status: "notFound",
        message: `Product with id ${id} not found`,
      });
      return;
    }

    req.body.product = product;
    next();
  }
}

export default findProductById;
