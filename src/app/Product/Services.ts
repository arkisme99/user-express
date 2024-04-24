import { Request } from "express";
import prisma from "../../utils/db";
import { Prisma } from "@prisma/client";

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

export const postDataProduct = async (data: Prisma.ProductCreateInput) => {
  const payload = {
    name: data.name,
    description: data.description,
    price: data.price,
    stock: data.stock,
    images: data.images,
  };

  return await prisma.product.create({ data: payload });
};

export const detailProductById = async (req: Request) => {
  return req.body.product;
};
