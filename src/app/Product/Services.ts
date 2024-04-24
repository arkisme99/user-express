import { NextFunction, Request, Response } from "express";
import prisma from "../../utils/db";

interface queryParam {
  page?: number;
  limit?: number;
}
export async function getAllProducts(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
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

export async function detailProductById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
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
