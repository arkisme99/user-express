import { Request } from "express";
import prisma from "../../utils/db";

interface queryParam {
  page?: number;
  limit?: number;
}

export const getAllProducts = async (req: Request) => {
  const { page = 1, limit = 10 }: queryParam = req.query;
  const skip = (page - 1) * limit;

  const data = await prisma.product.findMany({
    take: parseInt(String(limit)),
    skip: skip,
  });

  const dataCount = await prisma.product.count();
  const totalPage = Math.ceil(dataCount / limit);

  return {
    currentPage: page - 0,
    totalPage: totalPage,
    totalData: dataCount,
    data,
  };
};

export const detailProductById = async (req: Request) => {
  return req.body.product;
};
