import { NextFunction, Request, Response } from "express";
import { getAllUsers } from "./Services";

class User {
  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { currentPage, totalPage, totalData, data } = await getAllUsers(
        req
      );
      res.status(200).json({
        message: "List data user",
        currentPage,
        totalPage,
        totalData,
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  async post(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(201).json({
        message: "Success Create User",
      });
    } catch (err) {
      next(err);
    }
  }
}

export default User;
