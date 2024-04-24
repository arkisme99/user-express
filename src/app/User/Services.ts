import { Request } from "express";
import prisma from "../../utils/db";

interface queryParam {
  page?: number;
  limit?: number;
}

export const getAllUsers = async (req: Request) => {
  const { page = 1, limit = 10 }: queryParam = req.query;
  const skip = (page - 1) * limit;

  const data = await prisma.user.findMany({
    take: parseInt(String(limit)),
    skip: skip,
  });

  const dataCount = await prisma.user.count();
  const totalPage = Math.ceil(dataCount / limit);

  return {
    currentPage: page - 0,
    totalPage: totalPage,
    totalData: dataCount,
    data,
  };
};
